// import logo from './logo.svg';
import { useState, useEffect} from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
// import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';

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
        
    readEntries();
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

      readEntries(); 
  }
  
  return(/* aqui é html */

    <div className="screen">
      <Form func ={createEntry} title="Entradas">
      <Input type="date" placeholder="Data" onChange={setEntry} objeto={entry} campo="date" />
      <Input type="text" placeholder="Descrição" onChange={setEntry} objeto={entry} campo="description"/>
      <Input type="number" placeholder="Valor" onChange={setEntry} objeto={entry} campo="value" />
      <Input type="text" placeholder="Essa é uma chave de Categoria" onChange={setEntry} objeto={entry} campo="category_id" />

      </Form>

      <div className='pesquisar'> 
      <Input type='date' placeholder='Data' onChange={setEntry} objeto={entry} campo="date" />
      <button onClick={()=> readEntries(["date",entry.date])} > Buscar Datas </button>
      <br/>
      <Input type='text' placeholder='Descrição' onChange={setEntry} objeto={entry} campo="description"/>
      <button onClick={()=> readEntries(["description",entry.description])} > Buscar Descrição </button> 
      <br/>
  

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
