// import logo from './logo.svg';
import { useState, useEffect} from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
// import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() { //Aqui é JavaScript 
  const nav = useNavigate();
  const [entry, setEntry] = useState({
    date: "",
    description: "",
    value: "",
    user_id: "",
    category_id: ""

  })

  const [entries, setEntries] = useState([])

  useEffect(()=>{
    readEntries()
  }, [])

  async function createEntry(){
    const{data: dU, error: eU} = await supabase.auth.getUser();

    console.log(dU)

    const uid = dU?.user?.id;

    if(!uid) nav('/login', {replace: true})

    console.log({...entry, user_id: uid})

    const { data, error } = await supabase
    .from('entries')
    .insert({...entry, user_id: uid});
    //.select();
        
  }

  async function readEntries(filtro) {

    if(filtro && filtro[0] && filtro[1]){
      let { data: dataEntries, error } = await supabase
      .from('entries')
      .select('*')
      .eq(filtro[0], filtro[1])
      setEntries(dataEntries);
    }else{
      let { data: dataEntries, error } = await supabase
      .from('entries')
      .select('*')

      setEntries(dataEntries);
    }  
    
  }

  async function delEntry(id){
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id)  
  }
  
  return(/* aqui é html */

    <div className="screen">
      <form onSubmit={(e) => e.preventDefault()}>
      <input type="date" placeholder="Data" onChange={(e) => setEntry ({...entry, date: (e.target.value)})} />
      <input type="text" placeholder="Descrição" onChange={(e) => setEntry ({...entry, description: (e.target.value)})} />
      <input type="number" placeholder="Valor" onChange={(e) => setEntry ({...entry, value: (e.target.value)})} />
      <input type="text" placeholder="Essa é uma chave de Categoria" onChange={(e) => setEntry ({...entry, category_id: (e.target.value)})} />


      <button onClick={createEntry} > Salvar </button>
      </form>

      <div className='pesquisar'> 
      <input type='date' placeholder='Data' onChange={(e) => setEntry ({...entry, date: e.target.value})} />
      <button onClick={()=> readEntries(["date",entry.date])} > Buscar Datas </button>
      <br/>
      <input type='text' placeholder='Descrição' onChange={(e) => setEntry ({...entry, description: e.target.value})}/>
      <button onClick={()=> readEntries(["description",entry.description])} > Buscar Descrição </button> 
      <br/>
      <button onClick={()=> readEntries()} > Limpar </button>

      </div>

      <div className='exitTable'> 
      <table class="exitTable" border ="1" cellpadding="5" cellspacing="0">

         <tr>
            <th>Data: </th>
            <th>Descrição: </th>
            <th>Valor: </th>
            <th> Ações </th>
            <th> Ações </th>
          </tr>

      {entries.map(
        e => (
        <tr key={e.id} >
          <td>{e.date}</td>
          <td>{e.description}</td>
          <td>R$ {e.value}</td>
          <td> <Button variant="danger" onClick={() => delEntry(e.id)}>Excluir</Button> </td>
          <td> <Button variant="warning" onClick={() => nav( `/entry/${e.id}` , {replace: true })} >Editar</Button> </td>
        </tr>
        )
      )}

      
      </table>
      </div>
    </div>
  
  ); 
}

export default Home;
