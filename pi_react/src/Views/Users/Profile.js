
import { useEffect, useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 

import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';


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

  useEffect(()=>{
    readProfile()
  }
  , [])

  
  async function readProfile() {

    const{data: dU, error: eU} = await supabase.auth.getUser();

    const uid = dU?.user?.id;

    console.log(uid)

      let { data: dataProfile, error } = await supabase
      .from('users')
      .select('*')
      .eq("user_id",uid)
      .single();

      console.log(dataProfile)

      setUser(dataProfile);
   
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

      
        
    const { data: dU, error: eU } = await supabase
    .from('users')
    .insert({...user, user_id: data.user.uid})
    //.select()
        

      setMsg("Cadastro Realizado!")
    }catch(e){
      setMsg(`Error: ${e.message}`)

    }
    setLoading(false)

    setTimeout(() => setMsg("") , 5000);
  }
  

  
  return(/* aqui é html */
    <div className="Screen">
      <div className="card">
     

      <br/><br/>
  
     
      <form className="register" onSubmit={(e) => e.preventDefault()}>
        <label>
          Nome: <br/><input type="text" name="Nome" value={user.name} placeholder="Digite Seu Nome" onChange={(e) => setUser({...user, name: e.target.value}) } /><br/>
        </label>
        <label>
          Data de Nascimento: <br/><input type="text" name="Data de Nascimento" value={user.birth} placeholder="Digite Sua Data de Nascimento" onChange={(e) => setUser({...user, birth: e.target.value}) } /><br/>
        </label>
        <label>
          Endereço: <br/><input type="text" name="Endereço" placeholder="Digite Seu Endereço" value={user.address} onChange={(e) => setUser({...user, address: e.target.value}) } /><br/>
        </label>
        <label>
          Numero: <br/><input type="text" name="Numero" placeholder="Digite o Número da Sua Residência " value={user.number} onChange={(e) => setUser({...user, number: e.target.value}) } /><br/>
        </label>
        <label>
          Bairro: <br/><input type="text" name="Bairro" placeholder="Digite Seu Bairro" value={user.neighborhood} onChange={(e) => setUser({...user, neighborhood: e.target.value}) } /><br/>
        </label>
        <label>
          Cidade: <br/><input type="text" name="Cidade" placeholder="Digite Sua Cidade" value={user.city} onChange={(e) => setUser({...user, city: e.target.value}) } /><br/>
        </label>
        <label>
          Email: <br/><input type="text" name="Email" placeholder="Digite seu Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value}) } /><br/>
        </label>
       
        
      </form>
   
      </div>

      {msg && (<div className='toast'>{msg} </div>)}     
    </div>
  ); 
}

export default Auth;
