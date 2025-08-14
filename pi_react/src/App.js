<<<<<<< HEAD

=======
import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
>>>>>>> 940c3055941c5120c527d9d0c78ebce1862e45fe
import './App.css';
import {useState} from 'react'

function App() { //Aqui é JavaScript 
<<<<<<< HEAD
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

  function enviar(){
    alert("Email:  " +user.email+ "\nSenha:  " +user.password)
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
=======

    //let email = ""
    //function mudaEmail(valor) {
    //    email = valor
    //}
    const [email, setEmail] = useState(""); //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela
    const [senha, setSenha] = useState(""); //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela
    const [isLogin, setIsLogin] = useState(true); //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela

    //let senha = ""
    //function mudaSenha(valor) {
     //   senha = valor
    //}
    function enviar() {
        alert("Email:  " + email + "\nSenha:  " + senha)
    }

    //let isLogin = false;

    return (/* aqui é html */
       
                    
        <main className="App">
            <button onClick={() => setIsLogin (!isLogin)} >
                {isLogin && ("Cadastrar-se")}
                {!isLogin && ("Voltar para o Login")}
            </button>

            <br/><br/>
        
            {
                !isLogin && (
                    <form className="register" >
                        <label>
                            Nome: <input type="text" name="Nome" placeholder="Digite Seu Nome" onChange={(e) => (e.target.value)} /><br />
                        </label>
                        <label>
                            Endereço: <input type="text" name="Endereço" placeholder="Digite Seu Endereço" onChange={(e) => (e.target.value)} /><br />
                        </label>
                        <label>
                            Documento: <input type="text" name="Documento" placeholder="Digite Seu Documento" onChange={(e) => (e.target.value)} /><br />
                        </label>
                        <label>
                            Cidade: <input type="text" name="Cidade" placeholder="Digite Sua Cidade" onChange={(e) => (e.target.value)} /><br />
                        </label>
                        <label>
                            Pais: <input type="text" name="Pais" placeholder="Digite Seu Pais" onChange={(e) => (e.target.value)} /><br />
                        </label>
>>>>>>> 940c3055941c5120c527d9d0c78ebce1862e45fe



                    </form>
                )
            }

<<<<<<< HEAD
      {isLogin && (
      <form className="login">
        <label>
          Digite Seu Email: <input type="email" name="Email" placeholder="Digite Seu Email" onChange={(e) => setUser({...user, email: e.target.value}) } /><br/>
        </label>
        <label>
          Digite Sua Senha: <input type="password"  name="Senha" placeholder="Digite Sua Senha" onChange={(e) => setUser({...user, password: e.target.value}) } /><br/>
        </label>
        <button className="buttonSucess" type="submit" onClick={() => enviar () }> Salvar </button>
      </form>
      )}     
    </main>
  ); 
}
=======
            {
                isLogin && (
                    <form className="login">
                        <label>
                            Digite Seu Email: <input type="email" name="Email" placeholder="Digite Seu Email" onChange={(e) => setEmail(e.target.value)} /><br />
                        </label>
                        <label>
                            Digite sua Senha: <input type="password" name="Senha" placeholder="Digite sua Senha" onChange={(e) => setSenha(e.target.value)} /><br />
                        </label>
                        <button className="buttonSucess" type="submit" onClick={() => enviar()}> <strong>Salvar</strong> </button>
                    </form>
                )
            }

            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin && ("Cadastre-se")}
                {!isLogin && ("Voltar para Login")}
            </button>

            {
                !isLogin && (
                    <form className="register"></form>
                )
            }

            {
                isLogin && (
                    <form className="login">
                        <label>Login: </label>
                        <input type="email" name="Email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                        <label>Senha: </label>
                        <input type="password" name="Senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} /><br />
                        <button className="buttonLogin" onClick={() => enviar()} >Entrar</button>

                    </form>
                )
            }   
       
    </main >
  );
        }
>>>>>>> 940c3055941c5120c527d9d0c78ebce1862e45fe

export default App;
