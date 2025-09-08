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

function Transactions() { //Aqui é JavaScript 
  const [categorie, setCategorie] = useState([]);
  const nav = useNavigate();
  const [entry, setEntry] = useState({
    date: "",
    description: "",
    value: "",
    user_id: "",
    user_id: "",

  })

  const [entries, setEntries] = useState([])

  useEffect(()=>{
    readTransactions()
    readCategories();
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
        
    readTransactions();
    
  }

  async function readTransactions(filtro) {

    if(filtro && filtro[0] && filtro[1]){
      let { data: dataEntries, error } = await supabase
      .from('combined_transactions')
      .select('*')
      .ilike(filtro[0], "%"+ removerAcentos(filtro[1]) +"%")
      .order('date', { ascending: false });
      setEntries(dataEntries);
    }else{
      let { data: dataEntries, error } = await supabase
      .from('combined_transactions')
      .select('*')
      .order('date', { ascending: false });

      setEntries(dataEntries);
    }  
    
  }

  function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  

  async function delEntry(id){
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id)  

      readTransactions(); 
  }

  async function readCategories(){

    let { data: dataCategories, error } = await supabase
    .from('categories')
    .select('*');
    
    setCategorie(dataCategories);

  }
  
  return(/* aqui é html */

    <div className="screen">

    <p>asudhiuashdahih</p>

      <Form func ={createEntry} title="Entradas">
      <Input type="date" placeholder="Data" onChange={setEntry} objeto={entry} campo="date" />
      <Input type="text" placeholder="Descrição" onChange={setEntry} objeto={entry} campo="description"/>
      <Input type="number" placeholder="Valor" onChange={setEntry} objeto={entry} campo="value" />

      <select value={entry.category_id} onChange={(e) => setEntry({
        ...entry, category_id: e.target.value
       })} >
        {categorie.map(
          c => (< option value={c.id}> {c.name}</option>))
          
        } </select>

      </Form>

      <div className='pesquisar'> 
      <Input type='date' placeholder='Data' onChange={setEntry} objeto={entry} campo="date" />
      <button onClick={()=> readTransactions(["date",entry.date])} > Buscar Datas </button>
      <br/>
      <Input type='text' placeholder='Descrição' onChange={setEntry} objeto={entry} campo="description"/>
      <button onClick={()=> readTransactions(["description",entry.description])} > Buscar Descrição </button> 
      <br/>
  

      </div>

      <div className='exitTable'> 
      <table class="exitTable" border ="1" cellpadding="5" cellspacing="0">

         <tr>
            <th>Data: </th>
            <th style={{width: 100}} >Tipo: </th>
            <th>Descrição: </th>
            <th>Valor: </th>
            <th> Ações </th>
            <th> Ações </th>
          </tr>

      {entries.map(
        e => (
        <tr key={e.id} >
          <td>{e.date}</td>
          <td style={{ color: e.category_entry == true ? "green":"red"}} >{ e.category_entry == true ? "Entrada" : "Saída"}</td>
          <td>{e.description}</td>
          <td>R$ {Number(e.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
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

export default Transactions;
