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

  const [total, setTotal] = useState([]); // Para somar as saídas
 
 
  useEffect(() => {
    buscaData();
  }, []);

  async function buscaData(){

    let dataDeBusca = total;
    console.log(dataDeBusca)
    if(dataDeBusca == 0){
      dataDeBusca = pegaDataAtual()
      console.log("pegou data atual")
    }else{
      dataDeBusca = dataDeBusca.date
      console.log("pegou data vigente")

    }
    console.log(dataDeBusca)


    const todosDias = pegaPrimeiroEUltimoDiaDoMes(dataDeBusca)
    const inicioMes = todosDias.firstDay
    const fimMes = todosDias.lastDay

    const { data: entryData, error: entryError } = await supabase
    .from("combined_transactions")
    .select("*")
    .gte('date', inicioMes)
    .lte('date', fimMes)

    if(entryData.length == 0){
      console.log("Mes sem nada pra pegar")
      setTotal([])
      return;
    }
    let totalContas = calculaBalanco(entryData)
    console.log(totalContas)
    setTotal(totalContas)

  }

  function pegaPrimeiroEUltimoDiaDoMes(monthYear) {
    const [year, month] = monthYear.split("-").map(Number);

    // Primeiro dia do mês
    const firstDay = new Date(year, month - 1, 1);

    // Último dia do mês
    const lastDay = new Date(year, month, 0);

    return {
        firstDay: firstDay.toISOString().split("T")[0],  // Formato "YYYY-MM-DD"
        lastDay: lastDay.toISOString().split("T")[0],    // Formato "YYYY-MM-DD"
    };
  }
  
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  function calculaBalanco(entradasSaidas) {
    // Inicializando as variáveis de entradas, saídas e saldo
    let entradas = 0;
    let saidas = 0;

    // Iterando sobre o array de transações
    entradasSaidas.forEach(item => {
        // Verificando se a transação é uma entrada
        if (item.category_entry) {
            entradas += item.value;  // Somando valor das entradas
        } else {
            saidas += item.value;    // Somando valor das saídas
        }
    });

    // Calculando o saldo
    const saldo = entradas - saidas;

    // Pegando o mês atual
    
    
    // Retornando o objeto com as informações
    return {
        entradas,
        saidas,
        saldo,
        date: total.date? total.date :  pegaDataAtual()  // Incluindo o nome do mês
    };
}
const mesPorExtenso = (mes) => {
      
  return months[mes - 1]; // Meses no input começam em 1, então ajustamos aqui
};

const formatarData = () => {
  
  let dataDeBusca = total.date 
  if(!dataDeBusca)
    dataDeBusca = pegaDataAtual(); // Usa `pegaDataAtual` caso `total.date` esteja indefinido

  if (!dataDeBusca || typeof dataDeBusca !== 'string' || !dataDeBusca.includes('-')) {
    // Se dataDeBusca não for uma string válida no formato "YYYY-MM", retorna vazio
    return '';
  }

  const [year, month] = dataDeBusca.split("-").map(Number);
  const mesNome = mesPorExtenso(month); // Converte para o nome do mês
  return `${mesNome} de ${year}`;
};


function pegaDataAtual() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()+ 1).toString().padStart(2, '0'); // Adiciona o 0 à frente se o mês for um dígito único
  return `${year}-${month}`;
}

  return (
    <div className="screen">
      <h2>Inicio</h2>
 
      <div className="pesquisar">
        <Input 
          type="month" 
          placeholder="Mês/Ano" 
          onChange={setTotal} 
          objeto={total} 
          campo="date" 
        />
        <button onClick={()=>buscaData()} >Pesquisar</button>
      </div>

        {
          total != 0 ?
            <div className='screenContent'>

              <h2>{formatarData()}</h2>

              <div className="screenDeck">

                <div className="screenCard cardEntrada">
                  <p><i class="fa-solid fa-square-plus"></i></p>
                  <h2>Entradas</h2>
                  <p><small style={{color: "#777"}}>R$</small> <span>{total?.entradas?.toFixed(2)}</span></p>
                </div>

                <div className="screenCard cardSaida">
                  <p><i class="fa-solid fa-square-minus"></i></p>
                  <h2>Saídas</h2>
                  <p><small style={{color: "#777"}}>R$</small> <span>{total?.saidas?.toFixed(2)}</span></p>
                </div>

              </div>

              <div className="screenDeck">
                <div className="screenCard cardSaldo">
                    <p><i class="fa-solid fa-coins"></i></p>
                    <h2>Saldo</h2>
                    <p><small style={{color: "#777"}}>R$</small> <span>{total?.saldo?.toFixed(2)}</span></p>
                </div>
              </div>

            </div>
          :
            <p>Nenhuma transação foi realizada neste mês.</p>
        }
        



      {/* <div className="exitTable">
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
              <td>R$ {(entriesTotal - exitsTotal).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td> 
            </tr>
          </tbody>
        </table>
      </div> */}

    </div>
  );
}
 
export default Screen;