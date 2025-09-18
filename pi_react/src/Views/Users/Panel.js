import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import './painel_administrativo.css';

const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Panel() {
  const [filterType, setFilterType] = useState("all");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    readUsers();
  }, []);

  async function readUsers() {
    let { data: dataUsers, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error("Erro ao buscar usuários:", error);
      return;
    }

    setUsers(dataUsers);
    setFilteredUsers(dataUsers); // Mostra todos ao carregar
  }

  const handleFilter = (e) => {
    e.preventDefault();

    if (filterType === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.plan === filterType);
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="screen">
      <br /><br />
      <h1>Painel Administrativo</h1>
      <br /><br />
      <hr />

      <div className="titulo">
        <h2>Usuários</h2>
        <p>Gerenciamento de usuários do sistema</p>
      </div>

      <br />

      <form onSubmit={handleFilter}>
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
          <option value="Gold">Gold</option>
        </select>
        <button type="submit">Filtrar</button>
      </form>

      <br />

      <table className="tabela" border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cidade</th>
            <th>Data de nascimento</th>
            <th>Tipo de plano</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            filteredUsers.map((u, index) => (
              <tr key={index}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.city}</td>
                <td>{u.birth}</td>
                <td>{u.plan}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
