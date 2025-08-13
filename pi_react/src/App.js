import logo from './logo.svg';
import './App.css';

function App() { //Aqui é JavaScript 
  
  let email = ""
  function mudaEmail(valor){
    email = valor
  }

  let senha = ""
  function mudaSenha(valor){
    senha = valor
  }
  function enviar(){
    alert("Email:  " +email+ "\nSenha:  " +senha)
  }

  let isLogin = false;
  
  return(/* aqui é html */
    <main className="App">
      <button onClick={() => {isLogin = !isLogin}} >
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
          Digite Seu Email: <input type="email" name="Email" placeholder="Digite Seu Email" onChange={(e) => mudaEmail(e.target.value) } /><br/>
        </label>
        <label>
          Digite sua Senha: <input type="password"  name="Senha" placeholder="Digite sua Senha" onChange={(e) => mudaSenha(e.target.value) } /><br/>
        </label>
        <button className="buttonSucess" type="submit" onClick={() => enviar () }> <strong>Salvar</strong> </button>
      </form>
      )}     
    </main>
  ); 
}

export default App;
