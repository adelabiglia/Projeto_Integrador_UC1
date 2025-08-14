import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import './App.css';

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
        <button className="buttonSucess" type="submit" onClick={() => enviar () }> Salvar </button>
      </form>
      )}     
    </main>
  ); 
}

export default App;
