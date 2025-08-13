import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
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
function App() { 
    let email 

    let senha 

function mudarEmail(valor){
email = valor
}

function mudarSenha(valor){
senha = valor
}

function enviar(){
    alert("Email: " + email + " Senha: " + senha);
}

//function mudarTela(){
  //  isLogin = !isLogin
   // alert(isLogin)
//}

//const[] = useState() forma basica de usar o useState

//let isLogin = true;

const [isLogin, setIsLogin] = useState(true)
  
  return ( 
                    
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

        <button onClick= {() => setIsLogin(!isLogin)}>
            {isLogin && ("Cadastre-se")}
            {!isLogin && ("Voltar para Login")}
        </button>

        {!isLogin && (
        <form className="register"></form>
        )}

        {isLogin && (
        <form className="login">
            <label>Login: </label>
            <input type="email" name="Email"  placeholder="Digite seu email" value={email} onChange={(e) => mudarEmail(e.target.value)} /><br/>
            <label>Senha: </label>
            <input type="password" name="Senha" placeholder="Digite sua senha" value={senha} onChange={(e) => mudarSenha(e.target.value)} /><br/>
            <button className= "buttonLogin"  onClick={() => enviar()} >Entrar</button>

        </form>
        )}   
       
    </main>
  ); 
}

export default App;
