import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../Components/Input';

const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);

function Auth() {
  const nav = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    name: "",
    birth: "",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    email: "",
    password: "",
    plan: ""  // Campo para armazenar o plano do usuário
  });

  useEffect(() => {
    readProfile();
  }, []);

  async function readProfile() {
    const { data: dU } = await supabase.auth.getUser();
    const uid = dU?.user?.id;
    let { data: dataProfile } = await supabase
      .from('users')
      .select('*')
      .eq("user_id", uid)
      .single();
    setUser(dataProfile);  // Agora, o campo "plan" será recuperado junto com os outros dados
  }

  async function updateProfile() {
    setLoading(true);
    const { data: dU } = await supabase.auth.getUser();
    const uid = dU?.user?.id;
    if (!uid) return nav('/login', { replace: true });

    const { error } = await supabase
      .from('users')
      .update({ ...user })
      .eq('user_id', uid);

    if (error) {
      setMsg(`Erro ao atualizar: ${error.message}`);
    } else {
      setMsg("Perfil atualizado com sucesso!");
    }
    setLoading(false);
    setTimeout(() => setMsg(""), 4000);
  }

  return (
    <div className="profile-bg">
      <div className="profile-container">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Usuário')}&background=869dcc&color=fff&size=128`}
          alt="Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-title">Meu Perfil</h2>
        <form className="profile-form" onSubmit={e => e.preventDefault()}>
          <Input 
            label="Nome"
            type="text"
            placeholder="Digite Seu Nome"
            onChange={setUser}
            objeto={user}
            campo="name"
          />
          <Input
            label="Data de Nascimento"
            type="text"
            placeholder="Digite Sua Data de Nascimento"
            onChange={setUser}
            objeto={user}
            campo="birth"
          />
          <Input
            label="Endereço"
            type="text"
            placeholder="Digite Seu Endereço"
            onChange={setUser}
            objeto={user}
            campo="address"
          />
          <Input
            label="Número"
            type="text"
            placeholder="Digite o Número da Sua Residência"
            onChange={setUser}
            objeto={user}
            campo="number"
          />
          <Input
            label="Bairro"
            type="text"
            placeholder="Digite Seu Bairro"
            onChange={setUser}
            objeto={user}
            campo="neighborhood"
          />
          <Input
            label="Cidade"
            type="text"
            placeholder="Digite Sua Cidade"
            onChange={setUser}
            objeto={user}
            campo="city"
          />
          <Input
            label="Email"
            type="text"
            placeholder="Digite seu Email"
            onChange={setUser}
            objeto={user}
            campo="email"
          />

          {/* Exibindo o plano do usuário */}
          <div className="profile-plan">
            <label>Plano: </label>
            <span>{user.plan === "Premium" ? "Plano Premium" : "Plano Free"}</span>
          </div>

          {/* Alterar o plano do usuário */}
          <div className="profile-plan-update">
            <label>Alterar Plano:</label>
            <select
              value={user.plan}
              onChange={(e) => setUser({ ...user, plan: e.target.value })}
            >
              <option value="free">Plano Free</option>
              <option value="premium">Plano Premium</option>
              <option value="gold">Plano Gold</option>
            </select>
          </div>

          <button
            className="profile-save-btn"
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
        {msg && (<div className='toast'>{msg}</div>)}
      </div>
    </div>
  );
}

export default Auth;
