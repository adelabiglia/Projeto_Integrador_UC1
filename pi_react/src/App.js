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
    alert("E-mail:" + " " +email + " " + "\nSenha:" + " " +senha)
  }

  let isLogin = true;

  function mudaTela(){
    isLogin = !isLogin
  }


  return( /* Aqui é HTML */
    <main className="App">

      <button onClick={() => {isLogin = !isLogin}} >

        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o login")}

      </button>

      <br/>
      <br/>

      {!isLogin && (
        <form className="register" > </form>
      )}


      {isLogin && (

        <form className="login">
          <label className="login">

            Digite seu email: 
            <input type="email" name="Email" placeholder="email@exemplo.com" onChange={(e) => mudaEmail (e.target.value) } />

          </label>

          <br/>
          
          <label className="login" >

            Digite sua senha:
            <input type="password" name="Senha" placeholder="Digite seu senha" onChange={(e) => mudaSenha (e.target.value)} />
            <br/>

            <button onClick={() => enviar ()} className="button-login" > Login </button>

          </label>
        </form>    
      )}

    </main>

  ); 



}



export default App;
