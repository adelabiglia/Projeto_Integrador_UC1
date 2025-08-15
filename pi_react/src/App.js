import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import './App.css';
import { createClient } from "@supabase/supabase-js";



const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"

const supabase = createClient(supabaseUrl, supabaseKey);

function App() { //Aqui é JavaScript 
  const [isLogin, setIslogin] = useState(true);
  
  /*const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
  });*/
  
  const [user, setUser] = useState({
    name: "",
    birth:"",
    address:"",
    number:"",
    neighborhood: "",
    city:"",
    email:"",
    password:"",
  })

  const [isSendRegister, SetIsSendRegister] = useState(false);

  const [msg, setMsg] = useState("");

  async function register(){ //a função fica esperando, não é sincrona! 

    SetIsSendRegister(true);
    
    try{

        let { data, error } = await supabase.auth.signUp({
          
          email: user.email,
          password: user.password

        })

        if(error) throw error

        if(data.status == 400) throw data.message

        setMsg("Cadastro realizado!");
      }catch(e){
        setMsg(`Error: ${e.message}`)
      }

    SetIsSendRegister(false);

    setTimeout(() => setMsg(""), 5000);

  }
  
  return(/* aqui é html */
    <main className="App">
      <button className='buttonSucess' onClick={() => setIslogin(!isLogin)} >
        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o Login")}
      </button>

      <br/><br/>
  
      {!isLogin && (
      <form className="register" >
        <label>
          Nome: <input type="text" name="Nome" placeholder="Digite Seu Nome" onChange={(e) => setUser({...user, name: e.target.value}) } /><br/>
        </label>
        <label>
          Data de Nascimento: <input type="text" name="Data de Nascimento" placeholder="Digite Sua Data de Nascimento" onChange={(e) => setUser({...user, birth: e.target.value}) } /><br/>
        </label>
        <label>
          Endereço: <input type="text" name="Endereço" placeholder="Digite Seu Endereço" onChange={(e) => setUser({...user, address: e.target.value}) } /><br/>
        </label>
        <label>
          Numero: <input type="text" name="Numero" placeholder="Digite o Número da Sua Residência " onChange={(e) => setUser({...user, number: e.target.value}) } /><br/>
        </label>
        <label>
          Bairro: <input type="text" name="Bairro" placeholder="Digite Seu Bairro" onChange={(e) => setUser({...user, neighborhood: e.target.value}) } /><br/>
        </label>
        <label>
          Cidade: <input type="text" name="Cidade" placeholder="Digite Sua Cidade" onChange={(e) => setUser({...user, city: e.target.value}) } /><br/>
        </label>
        <label>
          Email: <input type="text" name="Email" placeholder="Digite seu Email" onChange={(e) => setUser({...user, email: e.target.value}) } /><br/>
        </label>
        <label>
          Senha: <input type="password" name="Senha" placeholder="Digite Sua Senha" onChange={(e) => setUser({...user, password: e.target.value}) } /><br/>
        </label>

        <button
          type="button" 
          className="buttonSucess" 
          onClick= {register} 
          disabled={isSendRegister}> Salvar 
          
        </button>

          {isSendRegister ? "Cadastrando...": "Cadastrar"}

                    </form>
                )
            }

      {isLogin && (
      <form className="login">
        <label>
          Digite Seu Email: <input type="email" name="Email" placeholder="Digite Seu Email" onChange={(e) => setUser({...user, email: e.target.value}) } /><br/>
        </label>
        <label>
          Digite Sua Senha: <input type="password"  name="Senha" placeholder="Digite Sua Senha" onChange={(e) => setUser({...user, password: e.target.value}) } /><br/>
        </label>
        <button type="button" className="buttonSucess" onClick= {register} > Salvar </button>
      </form>
      )} 

    
    
      {msg && (<div className='toast' >{msg}</div>)}

    </main>
  ); 
}

export default App;
