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

  async function create(){
    const{data: dU, error: eU} = await supabase.auth.getUser();

    console.log(dU)

    const uid = dU?.user?.id;

    if(!uid) nav('/login', {replace: true})

    console.log({...entry, user_id: uid})

    let tableName = entry.category_id == "32" ? "entries": "exits"

    const { data, error } = await supabase
    .from(tableName)
    .insert({...entry, user_id: uid});
    //.select();
        
    readTransactions();
    
  }

  async function readTransactions(filtro = null) {
    let query = supabase.from('combined_transactions').select('*').order('date', { ascending: false });
  
    if (filtro && filtro[0] && filtro[1]) {
      // Filtro por Data
      if (filtro[0] === "date") {
        const dataFiltrada = filtro[1]; // data fornecida pelo usuário
        query = query.eq('date', dataFiltrada); // Comparação exata de data
      }
      
      // Filtro por Descrição
      if (filtro[0] === "description") {
        const descricaoFiltrada = removerAcentos(filtro[1]); // Removendo acentos da descrição
        query = query.ilike('description', `%${descricaoFiltrada}%`); // Uso do ILIKE para pesquisa insensível a maiúsculas/minúsculas
      }
    }
  
    const { data, error } = await query;
  
    // Verificação de erro ou dados não encontrados
    if (error) {
      console.error("Erro ao buscar transações:", error);
      setEntries([]); // Garantir que o estado seja sempre um array
    } else {
      setEntries(data || []); // Garantir que data seja um array vazio, caso seja null ou undefined
    }
  }
  
  

  function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  

  async function delEntry(transaction){

    let tableName = transaction.category_entry == true ? "entries" : "exits";

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', transaction.id)  

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

    

      <Form func ={create} title="Lançamentos">
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
        <button onClick={() => readTransactions(["date", entry.date])}>Buscar por Data</button>
        <br />
        <Input type='text' placeholder='Descrição' onChange={setEntry} objeto={entry} campo="description" />
        <button onClick={() => readTransactions(["description", entry.description])}>Buscar por Descrição</button>
        <br />
      </div>


      <div className='exitTable'>
  <table className="exitTable" border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr style={{ fontSize: 22 }}>
        <th><i className="fa-solid fa-calendar-days"></i></th>
        <th style={{ width: 100 }}><i className="fa-solid fa-money-bill-trend-up"></i></th>
        <th><i className="fa-solid fa-align-right"></i></th>
        <th><i className="fa-solid fa-dollar-sign"></i></th>
        <th>Excluir</th>
        <th>Editar</th>
      </tr>
    </thead>
    <tbody>
      {(entries || []).map(e => (
        <tr key={e.id}>
          <td>{e.date.split("-").reverse().join("/")}</td>
          <td style={{ color: e.category_entry === true ? "green" : "red" }}>
            {e.category_entry === true ? <p><i className="fa-solid fa-caret-up"></i> Entrada</p> : <p><i className="fa-solid fa-caret-down"></i> Saída</p>}
          </td>
          <td>{e.description}</td>
          <td>
            <span style={{ color: "GREY", fontSize: 12 }}>R$</span>
            <strong>{Number(e.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
          </td>
          <td>
            <Button onClick={() => delEntry(e)} style={{ color: "#dc3545", border: "1px solid #dc3545", backgroundColor: "transparent", fontSize: 22 }}>
              <i className="fa-solid fa-circle-xmark"></i>
            </Button>
          </td>
          <td>
            <Button onClick={() => nav(e.category_entry === true ? `/entry/${e.id}` : `/exit/${e.id}`, { replace: true })} style={{ color: "#ffc107", border: "1px solid #ffc107", backgroundColor: "transparent", fontSize: 22 }}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  
  ); 
}

export default Transactions;
