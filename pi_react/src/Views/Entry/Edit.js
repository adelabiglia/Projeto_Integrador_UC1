//import logo from './logo.svg';
import { useState, useEffect } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
//import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate, useParams } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton'
import Button from 'react-bootstrap/Button';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';

const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Entry() { //Aqui é JavaScript 
  const {id} = useParams();

  const nav = useNavigate();
  const [entry, setEntry] = useState ({
    date:"",
    description:"",
    value:"",
    category_id: "",
    user_id: "",
  })  

  useEffect(()=>{
    showEntries()
  }, [])

  async function updateEntry(){
      const{data: dU, error: eU} = await supabase.auth.getUser();

      const uid = dU?.user?.id;
  
      if(!uid) nav('/login', {replace: true})

        console.log(entry)
  
      const { data, error } = await supabase
      .from('entries')
      .update({...entry, user_id: uid})
      .eq('id', id)
      
      nav('/entry', {replace: true})
  }

  async function showEntries() {

  
      let { data: dataEntries, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .single()

      setEntry(dataEntries);
    
    } 

  
  return (
    <div className="screen">
      <Form func ={updateEntry} title="Salvar">
        <Input type='date' placeholder='Data' onChange={setEntry} objeto={entry} campo='date' />
        <Input type='text' placeholder='Descrição' onChange={setEntry} objeto={entry} campo='description'/>
        <Input type='number' placeholder='Valor' onChange={setEntry} objeto={entry} campo='value'/>
        <Input type='text' placeholder='essa é chave da categoria' onChange={setEntry} objeto={entry} campo='category_id'/>
      </Form>
    </div>
  );
   
}

export default Entry;
