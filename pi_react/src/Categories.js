import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import './App.css';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Categories(){

  const nav = useNavigate()
  const [categorie, setCategorie] = useState({
  
      name: "",
      meta: "",
      image: "",
      user_id: "",

  })


  async function createCategorie(){
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    if(errorUser) nav('login', {replace: true})
    if(!dataUser) nav ('login', {replace: true})
    if(dataUser && !dataUser.id) nav ('login', {replace: true})


    categorie = {...categorie, user_id: dataUser}

    
    const { data, error } = await supabase

    .from('categories')
    .insert([categorie])
    .select()

  }


  return(

    <div className="screen"> 
    
    <form>

      <input type="text" placeholder='Digite seu nome' onChange={(e) => setCategorie({...categorie, name: e.target.value})}/>     
      <input type="text" placeholder='Digite sua meta' onChange={(e) => setCategorie({...categorie, meta: e.target.value})}/>    
      <input type="text" placeholder='http://exemple.com' onChange={(e) => setCategorie({...categorie, image: e.target.value})}/>  

      <button onClick={createCategorie}> Salvar </button>  

    </form>
    
    </div>

  );


}
