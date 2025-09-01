
import { useEffect, useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../Components/Input';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Auth() { //Aqui é JavaScript 

  const nav = useNavigate();

  const {id} = useParams();

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


  async function updateProfile(){
        const{data: dU, error: eU} = await supabase.auth.getUser();
  
        const uid = dU?.user?.id;
    
        if(!uid) nav('/login', {replace: true})
    
        const { data, error } = await supabase
        .from('users')
        .update({... user, user_id: uid})
        .eq('id', id);
        //.select()
    }
  

  
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

    async function updateProfile() {
      const { data: dU, error: eU } = await supabase.auth.getUser();
      const uid = dU?.user?.id;
    
      if (!uid) return nav('/login', { replace: true });
    
      const { error } = await supabase
        .from('users')
        .update({ ...user })
        .eq('user_id', uid);
    
      if (error) {
        setMsg(`Erro ao atualizar: ${error.message}`);
      } else {
        setMsg("Perfil atualizado com sucesso!");
      }
    
      setTimeout(() => setMsg(""), 4000);
    }
    

  
  return(/* aqui é html */
    <div className="Screen">
      <div className="card">
     

      <br/><br/>
  
     
      <form className="register" onSubmit={(e) => e.preventDefault()}>
        
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
      
        
        <button className="buttonSucess" onClick={updateProfile} disabled={loading} > {loading ? "Salvando..." : "Salvar"} </button>

      </form>
   
      </div>

      {msg && (<div className='toast'>{msg} </div>)}     
    </div>
  ); 
}

export default Auth;
