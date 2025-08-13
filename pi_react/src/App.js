import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() { //Aqui é JavaScript 
  
  
  const [email, setEmail] = useState("");
 
  const [senha, setSenha] = useState("");
  
  const [isLogin, setIslogin] = useState(true);

  function enviar(){
    alert("Email:  " +email+ "\nSenha:  " +senha)
  }

  
  return(/* aqui é html */
    <main className="App">
      <button onClick={() => setIslogin(!isLogin)} >
        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o Login")}
      </button>

      <br/><br/>
  
      {!isLogin && (
      <form className="register" >
        <label>
          Nome: <input type="text" name="Nome" placeholder="Digite Seu Nome" onChange={(e) => (e.target.value) } /><br/>
        </label>
        <label>
          Endereço: <input type="text" name="Endereço" placeholder="Digite Seu Endereço" onChange={(e) => (e.target.value) } /><br/>
        </label>
        <label>
          Documento: <input type="text" name="Documento" placeholder="Digite Seu Documento" onChange={(e) => (e.target.value) } /><br/>
        </label>
        <label>
          Cidade: <input type="text" name="Cidade" placeholder="Digite Sua Cidade" onChange={(e) => (e.target.value) } /><br/>
        </label>
        <label>
          Pais: <input type="text" name="Pais" placeholder="Digite Seu Pais" onChange={(e) => (e.target.value) } /><br/>
        </label>



      </form>
      )}

      {isLogin && (
      <form className="login">
        <label>
          Digite Seu Email: <input type="email" name="Email" placeholder="Digite Seu Email" onChange={(e) => setEmail(e.target.value) } /><br/>
        </label>
        <label>
          Digite sua Senha: <input type="password"  name="Senha" placeholder="Digite sua Senha" onChange={(e) => setSenha(e.target.value) } /><br/>
        </label>
        <button className="buttonSucess" type="submit" onClick={() => enviar () }> <strong>Salvar</strong> </button>
      </form>
      )}     
    </main>
  ); 
}

export default App;
