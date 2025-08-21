import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate } from 'react-router-dom';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Exit() { //Aqui é JavaScript 
  const nav = useNavigate();
  const [exit, setExit] = useState ({
    date:"",
    description:"",
    value:"",
    category_id: "",
    user_id: "",
  })  

  async function createExit(){
      const{data: dU, error: eU} = await supabase.auth.getUser();
  
      if(eU) nav('/login', {replace: true})
  
      if(!dU) nav('/login', {replace: true})
  
      if(dU && !dU.id) nav('/login', {replace: true})
  
      exit = {... exit, user_id: dU.id}
  
      const { data, error } = await supabase
      .from('exits')
      .insert([
        exit
      ])
      .select()
          
    }
  
  return (
    <div className="screen">
      <form>
        <input type='date' placeholder='Data' onChange={(e) => setExit ({...exit, date: e.target.value})} />
        <input type='text' placeholder='Descrição' onChange={(e) => setExit ({...exit, description: e.target.value})}/>
        <input type='number' placeholder='Valor' onChange={(e) => setExit ({...exit, value: e.target.value})}/>
        <input type='text' placeholder='essa é chave da categoria' onChange={(e) => setExit ({...exit, category_id: e.target.value})}/>

        <button onClick={createExit} > Salvar </button>
      </form>
    </div>



  );
   
}

export default Exit;
