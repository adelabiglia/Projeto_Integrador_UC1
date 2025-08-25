//import logo from './logo.svg';
import { useState, useEffect } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
//import './App.css';
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

  const [exits, setExits] = useState ([])

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

  async function readExits(filtro) {

    if(filtro && filtro[0] && filtro[1]){
      let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')
      .eq(filtro[0], filtro[1])
      setExits(dataExits);
    }else{
      let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')

      setExits(dataExits);
    }  
    }
    
  
  
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <input type='date' placeholder='Data' onChange={(e) => setExit ({...exit, date: e.target.value})} />
        <input type='text' placeholder='Descrição' onChange={(e) => setExit ({...exit, description: e.target.value})}/>
        <input type='number' placeholder='Valor' onChange={(e) => setExit ({...exit, value: e.target.value})}/>
        <input type='text' placeholder='essa é chave da categoria' onChange={(e) => setExit ({...exit, category_id: e.target.value})}/>

        <button onClick={createExit} > Salvar </button>
      </form>

      <div className='pesquisar'> 
      <input type='date' placeholder='Data' onChange={(e) => setExit ({...exit, date: e.target.value})} />
      <button onClick={()=> readExits(["date",exit.date])} > Buscar Datas </button>
      <br/>
      <input type='text' placeholder='Descrição' onChange={(e) => setExit ({...exit, description: e.target.value})}/>
      <button onClick={()=> readExits(["description",exit.description])} > Buscar Descrição </button> 
      <br/>
      <button onClick={()=> readExits()} > Limpar </button>

      </div>

      <div className='exitTable'>
      <table class="exitTable" border ="1" cellpadding="5" cellspacing="0">
            
            <tr>
              <th>Data: </th>
              <th>Descrição: </th>
              <th>Valor: </th>
            </tr>
            
          
      {exits.map(
        e => (
                      
            <tr>
              <td>{e.date}</td>
              <td>{e.description}</td>
              <td>R$ {e.value}</td>
            </tr>
            
          
          //<div className='cardExit' key={e.id}>
          //<br/><br/>
          //Data: {e.date}<br/>
          //Descrição: {e.description}<br/>
          //Valor: R${e.value}<br/>
          //</div>
        )    
      )}
      </table>
      </div>
    </div>



  );
   
}

export default Exit;
