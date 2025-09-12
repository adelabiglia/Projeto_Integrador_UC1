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
  const [exit, setExit] = useState({
    date: "",
    description: "",
    value: "",
    category_id: "",
    user_id: "",
  });

  // Resumo das transações
  const [summary, setSummary] = useState([]);

  // Pegar a data de inicio e fim
  const [startDate, setStartDate] = useState({  dateStart: formatarData(new Date(new Date().setDate(new Date().getDate() - 30)))});
  const [endDate, setEndDate] = useState({dateEnd: formatarData(new Date())}); 
 
  useEffect(() => {
    readDates();
    //fetchFinancialSummary(); // Busca as somas de entradas e saídas
  }, []);
 
  async function readDates() {

    console.log(startDate);

    const { data: dataResult, error } = await supabase
      .from('combined_transactions')
      .select('*')
      .gte('date', startDate.dateStart)   // data maior ou igual a startDate
      .lte('date', endDate.dateEnd)
      .order('date', {ascending: false})    // data menor ou igual a endDate

    if (error) {
      console.error('Erro ao buscar dados:', error);
      return;
    }

    // Junta os dados dos dias iguais
    const processedData = dataResult.reduce((acc, item) => {
      const { date, value, category_entry } = item;
      
      // Verifica se a data já existe no acumulador
      const existing = acc.find((entry) => entry.date === date);
  
      if (existing) {
        // Se a data já existir, somamos o valor de entrada ou saída
        if (category_entry) {
          existing.entries += value;  // Soma as entradas
        } else {
          existing.exits += value;    // Soma as saídas
        }
      } else {
        // Caso contrário, cria uma nova entrada para a data
        acc.push({
          date,
          entries: category_entry ? value : 0,
          exits: category_entry ? 0 : value,
        });
      }
  
      return acc;
    }, []);

    setSummary(processedData);

  }

  // Função para formatar a data no formato ano-mês-dia
  function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam de 0
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
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
 
    //setEntriesTotal(totalEntries);
 
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
 
    //setExitsTotal(totalExits);

  }
 
  return (
    <div className="screen">

      <h2>Inicio</h2>
 
      <div className="pesquisar">
        <Input type="date" placeholder="Data inicial" onChange={setStartDate} objeto={startDate} campo="dateStart" />
        <Input type="date" placeholder="Data final" onChange={setEndDate} objeto={endDate} campo="dateEnd" />
        <button onClick={() => readDates()}>Pesquisar</button>
      </div>
 
      <div className="exitTable">
        <table className="exitTable" border="1" cellpadding="5" cellspacing="0">
          <thead>
            <tr>
              <th>Data</th>
              <th>Entradas</th>
              <th>Saídas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
          {
            summary.map(
              s =>
                <tr>
                  <td> {s.date.split("-").reverse().join("/")} </td>
                  <td>R$ {(s.entries).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
                  <td>R$ {(s.exits).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
                  <td>R$ {(s.entries - s.exits).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td> {/* Calculando o saldo */}
                </tr>
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default Screen;
 
 
 