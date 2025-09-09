/*import logo from './logo.svg';*/
import { useEffect, useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
/*import './App.css';*/
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Input} from '../../Components/Input';  
import {Form} from '../../Components/Form';



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

  useEffect( () => {
    readCategories()
  }, [])

  async function createCategorie(){
    
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    /*if(errorUser) nav('login', {replace: true})
    if(!dataUser) nav ('login', {replace: true})
    if(dataUser && !dataUser.id) nav ('login', {replace: true})*/

    const uid = dataUser?.user?.id

    if(!uid) nav('/categories', {replace:true})


    /*categorie = {...categorie, user_id: dataUser}*/

    
    const { data, error } = await supabase
    .from('categories')
    .insert({...categorie, user_id: uid});
    //.select();

  }




  async function delCategorie(id) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
  
    if (userError || !userData?.user?.id) {
      alert("Você precisa estar logado para deletar.");
      nav('/login', { replace: true });
      return;
    }
  
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userData.user.id); // Garante que só deleta se for dono
  
    if (error) {
      console.error("Erro ao deletar:", error.message);
      alert("Erro ao deletar: " + error.message);
    } else {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  }
  

  async function readCategories(){

    let { data: dataCategories, error } = await supabase
    .from('categories')
    .select('*')
    
    setCategories(dataCategories);

  }

  return(

    <div className="screen"> 
    
    <Form func ={createCategorie} title="Cadastrar Categoria">

      <Input type="text" placeholder='Digite a categoria' onChange={setCategorie} objeto={categorie} campo='name'/>     
      <Input type="text" placeholder='Digite sua meta' onChange={setCategorie} objeto={categorie} campo='meta'/> 
      <Input type="text" placeholder='http://exemple.com' onChange={setCategorie} objeto={categorie} campo='image'/> 
 
      
 

    </Form>
    
    
    <div className='row'>
    {categories.map(
    

        c => ( 
          <div className='cardGame' key={c.id} >
           Nome: {c.name}
           <a url={c.url}></a>
           <p>{Number(c.meta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          

           <td><Button variant="danger"onClick={() => delCategorie(c.id)}>Excluir</Button></td>
           <td><Button variant="warning" onClick={() => nav(`/categories/${c.id}`, {replace: true} )}>Editar</Button></td>

          </div>
        )

    )}

    
    
    </div>
    </div>

  );


}
