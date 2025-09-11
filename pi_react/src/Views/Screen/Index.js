import { useState, useEffect } from 'react'; //useState ele retorna para gente um par variavel e função que quando alterado o dom mostra na tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';
 
const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);
 
 
function Screen() {
  const nav = useNavigate();
  const [categorie, setCategorie] = useState([]);
  const [exit, setExit] = useState({
    date: "",
    description: "",
    value: "",
    category_id: "",
    user_id: "",
  });
  const [exits, setExits] = useState([]);
  const [entriesTotal, setEntriesTotal] = useState(0); // Para somar as entradas
  const [exitsTotal, setExitsTotal] = useState(0); // Para somar as saídas

  // pegar a data de inicio e fim
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 
 
  useEffect(() => {
    //readExits();
    readCategories();
    fetchFinancialSummary(); // Busca as somas de entradas e saídas
  }, []);
 
  async function createExit() {
    const { data: dU, error: eU } = await supabase.auth.getUser();
    const uid = dU?.user?.id;
    if (!uid) nav('/login', { replace: true });
 
    const { data, error } = await supabase
      .from('exits')
      .insert({ ...exit, user_id: uid });
    //readExits();
    fetchFinancialSummary(); // Atualiza os totais após a inserção
  }
 
  async function readCategories() {
    let { data: dataCategories, error } = await supabase
      .from('categories')
      .select('*');
    setCategorie(dataCategories);
  }
 
  async function readDates(filtro) {
    console.log(startDate.dateStart, endDate.dateEnd)
    const { data: dataResult, error } = await supabase
      .from('combined_transactions')
      .select('*')
      .gte('date', startDate.dateStart)   // data maior ou igual a startDate
      .lte('date', endDate.dateEnd);    // data menor ou igual a endDate

    console.log(dataResult)

  }
 
  // Função para buscar as somas das entradas e saídas
  async function fetchFinancialSummary() {
    // Somar entradas
    const { data: entryData, error: entryError } = await supabase
      .from('entries')
      .select('value');
 
    if (entryError) {
      console.error('Erro ao buscar entradas:', entryError);
      return;
    }
 
    const totalEntries = entryData.reduce((acc, entry) => {
      return acc + parseFloat(entry.value || 0);
    }, 0);
 
    setEntriesTotal(totalEntries);
 
    // Somar saídas
    const { data: exitData, error: exitError } = await supabase
      .from('exits')
      .select('value');
 
    if (exitError) {
      console.error('Erro ao buscar saídas:', exitError);
      return;
    }
 
    const totalExits = exitData.reduce((acc, exit) => {
      return acc + parseFloat(exit.value || 0);
    }, 0);
 
    setExitsTotal(totalExits);
  }
 
  return (
    <div className="screen">
      <h2>Inicio</h2>
 
      <div className="pesquisar">
        <Input type="date" placeholder="Data inicial" onChange={setStartDate} objeto={exit} campo="dateStart" />
        <Input type="date" placeholder="Data final" onChange={setEndDate} objeto={exit} campo="dateEnd" />
        <button onClick={() => readDates()}>Pesquisar</button>
      </div>
 
      <div className="exitTable">
        <table className="exitTable" border="1" cellpadding="5" cellspacing="0">
          <thead>
            <tr>
              <th>Entradas</th>
              <th>Saídas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R$ {(entriesTotal).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
              <td>R$ {(exitsTotal).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
              <td>R$ {(entriesTotal - exitsTotal).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td> {/* Calculando o saldo */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default Screen;
 
 
 