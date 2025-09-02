//import logo from './logo.svg';
import { useState, useEffect } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
//import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate, useParams } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton'
import Button from 'react-bootstrap/Button';
import { Input } from '../../Components/Input';

const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Exit() { //Aqui é JavaScript 
  const {id} = useParams();

  const nav = useNavigate();
  const [exit, setExit] = useState ({
    date:"",
    description:"",
    value:"",
    category_id: "",
    user_id: "",
  })  

  useEffect(()=>{
    showExits()
  }, [])

  async function updateExit(){
      const{data: dU, error: eU} = await supabase.auth.getUser();

      const uid = dU?.user?.id;
  
      if(!uid) nav('/login', {replace: true})

        console.log(exit)
  
      const { data, error } = await supabase
      .from('exits')
      .update({...exit, user_id: uid})
      .eq('id', id)
      
      nav('/exit', {replace: true})
  }

  async function showExits() {

  
      let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')
      .eq('id', id)
      .single()

      setExit(dataExits);
    
    } 

  
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <Input type='date' placeholder='Data' onChange={setExit} objeto={exit} campo='date' />
        <Input type='text' placeholder='Descrição' onChange={setExit} objeto={exit} campo='description'/>
        <Input type='number' placeholder='Valor' onChange={setExit} objeto={exit} campo='value'/>
        <Input type='text' placeholder='essa é chave da categoria' onChange={setExit} objeto={exit} campo='category_id'/>

        <button onClick={updateExit} > Salvar </button>
      </form>
    </div>
  );
   
}

export default Exit;
