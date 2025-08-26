//import logo from './logo.svg';
import { useState, useEffect } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
//import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate, useParams } from 'react-router-dom';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Exit() { //Aqui é JavaScript 
  const nav = useNavigate();
  const {id} = useParams();

  console.log()

  const [exit, setExit] = useState ({
    date:"",
    description:"",
    value:"",
    category_id: "",
    user_id: "",
  })  

 
  useEffect(()=>{
    readExits()
  }, [])

  async function createExit(){
      const{data: dU, error: eU} = await supabase.auth.getUser();

      const uid = dU?.user?.id;
  
      if(!uid) nav('/login', {replace: true})
  
      const { data, error } = await supabase
      .from('exits')
      .insert({... exit, user_id: uid});
      //.select()
  }

  async function readExits() {

    
      let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')
      .eq('id', id)
      .single();
    
      setExit(dataExits);
      
    }
   
    
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <input type='date' value={exit.date} placeholder='Data' onChange={(e) => setExit ({...exit, date: e.target.value})} />
        <input type='text' value={exit.description} placeholder='Descrição' onChange={(e) => setExit ({...exit, description: e.target.value})}/>
        <input type='number' value={exit.value} placeholder='Valor' onChange={(e) => setExit ({...exit, value: e.target.value})}/>
        <input type='text' value={exit.category_id} placeholder='essa é chave da categoria' onChange={(e) => setExit ({...exit, category_id: e.target.value})}/>

        <button onClick={createExit} > Salvar </button>
      </form>
      
      
    </div>
  );
   
}

export default Exit;
