import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import './App.css';

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
