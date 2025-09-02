
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

  function Auth() { //Aqui é JavaScript 

  const nav = useNavigate();

  const [isLogin, setIslogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState("");

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


  async function logar() {
    setLoading(true)

    try{

    let { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password
    })

    if(error) throw error;

    setMsg('Logou');

    localStorage.setItem('supaSession', data.session)


    setTimeout(

      nav('/home', {replace: true}),
      5002

    );

    

    }catch(err){

      setMsg('Error:' +err);

    }


    setLoading(false)

    setTimeout(() => setMsg("") , 5000);
    
  }

  async function register (){
    setLoading(true);

    try{
      let { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password
      })

      if(error) throw error
      
      if(data.status == 400) throw data.message

    const uid = data?.user?.id  

    if (!uid) nav("/login", {replace:true})

    let sendU =   {...user, user_id: uid}
        
    const { data: dU, error: eU } = await supabase
    .from('users')
    .insert(sendU)
    //.select()
        

      setMsg("Cadastro Realizado!")
    }catch(e){
      setMsg(`Error: ${e.message}`)

    }
    setLoading(false)

    setTimeout(() => setMsg("") , 5000);
  }
  
  /*const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
  });*/
  
  
  function enviar(){
    alert("Email:  " +user.email+ "\nSenha:  " +user.password)
  }
  
  return(/* aqui é html */
    <div className="Screen">
      <div className="card">
      <button className='buttonSucess' onClick={() => setIslogin(!isLogin)} >
        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o Login")}
      </button>

      <br/><br/>
  
      {!isLogin && (
      <Form func="register" >
        
        <Input 
        label= "Nome"
        type="text" 
        placeholder="Digite Seu Nome"
        onChange={setUser} 
        objeto={user}
        campo="name"
        /><br/>
        
        
         <Input
         label= "Data de Nascimento"
         type="text"
         placeholder="Digite Sua Data de Nascimento" 
         onChange={setUser}
         objeto={user}
         campo="birth"
         /><br/>
        
        
        <Input 
        label= "Endereço"
        type="text" 
        placeholder="Digite Seu Endereço" 
        onChange={ setUser } 
        objeto={user}
        campo="address"
        /><br/>
       
        
        <Input 
        label= "Número"
        type="text"  
        placeholder="Digite o Número da Sua Residência " 
        onChange={ setUser } 
        objeto={user}
        campo="number"
        /><br/>
       
        
        <Input 
        label= "Bairro"
        type="text" 
        placeholder="Digite Seu Bairro"
        onChange={setUser} 
        objeto={user}
        campo="neighborhood"
        /><br/>
      
       
        <Input 
        label= "Cidade"
        type="text"  
        placeholder="Digite Sua Cidade" 
        onChange={ setUser } 
        objeto={user}
        campo="city"
        /><br/>
        
        
        <Input 
        label= "Email"
        type="text"  
        placeholder="Digite seu Email" 
        onChange={setUser}
        objeto={user}
        campo="email"  
        /><br/>
      
      
        <Input 
        label= "Senha"
        type="password" 
        placeholder="Digite Sua Senha" 
        onChange={setUser} 
        objeto={user}
        campo="password"
        /><br/>
      
      </Form>
      )
      }

      {isLogin && (
      <Form func="login">
        
      <Input 
      label= "Digite seu Email"
      type="email" 
      placeholder="Digite Seu Email" 
      onChange={setUser} 
      objeto={user}
      campo="email"
      /><br/>
       
     
      <Input
      label= "Digite Sua Senha"
      type="password" 
      placeholder="Digite Sua Senha" 
      onChange={setUser} 
      objeto={user}
      campo="password"
      /><br/>
        
      </Form>
      )}
      
      </div>

      {msg && (<div className='toast'>{msg} </div>)}     
    </div>
  ); 
}

export default Auth;
