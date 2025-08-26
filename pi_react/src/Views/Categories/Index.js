/*import logo from './logo.svg';*/
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
/*import './App.css';*/
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

  const [categories, setCategories] = useState([])

  async function createCategorie(){
    
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    /*if(errorUser) nav('login', {replace: true})
    if(!dataUser) nav ('login', {replace: true})
    if(dataUser && !dataUser.id) nav ('login', {replace: true})*/

    const uid = dataUser?.user?.id

    if(!uid) nav('/login', {replace:true})


    /*categorie = {...categorie, user_id: dataUser}*/

    
    const { data, error } = await supabase
    .from('categories')
    .insert({...categorie, user_id: uid});
    //.select();

  }


  async function readCategories(){

    let { data: dataCategories, error } = await supabase
    .from('categories')
    .select('*')
    
    setCategories(dataCategories);

  }

  return(

    <div className="screen"> 
    
    <form onSubmit={(e) => e.preventDefault()}>

      <input type="text" placeholder='Digite seu nome' onChange={(e) => setCategorie({...categorie, name: e.target.value})}/>     
      <input type="text" placeholder='Digite sua meta' onChange={(e) => setCategorie({...categorie, meta: e.target.value})}/>    
      <input type="text" placeholder='http://exemple.com' onChange={(e) => setCategorie({...categorie, image: e.target.value})}/>  

      <button onClick={createCategorie}> Salvar </button>  

    </form>

    <button onClick={readCategories}>Buscar</button>
    
    <div className='row'>
    {categories.map(
    

        c => ( 
          <div className='cardGame' key={c.id} onClick={() => nav(`/categories/${c.id}`, {replace: true} )}>
           Nome: {c.name}
           <a url={c.url}></a>
           <p>{c.meta}</p>

          </div>
        )

    )}
    </div>
    </div>

  );


}
