
import { useEffect, useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import { createClient } from "@supabase/supabase-js";
import './painel_administrativo.css';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);


export default function Panel(){
  

  const [filterType, setFilterType] = useState("all");

  const [users, setUsers] = useState([]);
  
  useEffect( () => {
    readUsers()
  }, [])


  async function readUsers(){

    let { data: dataUsers, error } = await supabase
    .from('users')
    .select('*')
    
    setUsers (dataUsers);

  }


  return (


    

    <div className="screen">

      <br/><br/> 
      <h1>Painel Administrativo</h1>
      <br/><br/> 
      <hr/>

      <div className="titulo">
        <h2>Usuários</h2>
        <p>Gerenciamento de usuários do sistema</p>
      </div>

      <br/> 
      
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="filterType">Filtrar por tipo:</label>
        <select
          id="filterType"
          name="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
        <input type="submit" value="Filtrar" />
      </form>

      <br />

      <table className="tabela" border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cidade</th>
            <th>Data de nascimento</th>
          </tr>
        </thead>
        <tbody>
         { users.map(
          u => (
          <tr>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.city}</td>
            <td>{u.birth}</td>
          </tr>
          ))
        }
        </tbody>
      </table>
    </div>


  );
}