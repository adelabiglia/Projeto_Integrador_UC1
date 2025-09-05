//import logo from './logo.svg';
import { useState, useEffect } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
//import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton'
import Button from 'react-bootstrap/Button';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';

const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Exit() { //Aqui é JavaScript 
  const nav = useNavigate();
  const [categorie, setCategorie] = useState([]);
  const [exit, setExit] = useState ({
    date:"",
    description:"",
    value:"" ,
    category_id: "",
    user_id: "",
  }) 

  const [exits, setExits] = useState ([])

  useEffect(()=>{
    readExits()
    readCategories()
  }, [])

  async function createExit(){
      const{data: dU, error: eU} = await supabase.auth.getUser();

      const uid = dU?.user?.id;
  
      if(!uid) nav('/login', {replace: true})
  
      const { data, error } = await supabase
      .from('exits')
      .insert({... exit, user_id: uid});
      //.select()
      readExits();
  }

  async function readCategories(){

    let { data: dataCategories, error } = await supabase
    .from('categories')
    .select('*');
 
    setCategorie(dataCategories);

  }
  
  async function readExits(filtro) {

    if(filtro && filtro[0] && filtro[1]){
      let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')
      .ilike(filtro[0], filtro[1])
      setExits(dataExits);
    }else{
      let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')

      setExits(dataExits);
    }  
    } 

  async function delExit(id){
    const { error } = await supabase
      .from('exits')
      .delete()
      .eq('id', id)
      readExits();
  }  
  
  return (
    <div className="screen">
      <Form func ={createExit} title="Saídas">
        <Input type='date' placeholder='Data' onChange={setExit} objeto={exit} campo='date' />
        <Input type='text' placeholder='Descrição' onChange={setExit} objeto={exit} campo='description'/>
        <Input type='number' placeholder='Valor' onChange={setExit} objeto={exit} campo='value'/>
        
        <select value={exit.category_id} onChange={(e)=> setExit({...exit, category_id: e.target.value})} >
          {categorie.map(
            c => (
              <option value={c.id}>{c.name}</option>
            )
          )}
        </select>
              
      </Form>

      <div className='pesquisar'> 
      <Input type='date' placeholder='Data' onChange={setExit} objeto={exit} campo='date' />
      <button onClick={()=> readExits(["date",exit.date])} > Buscar Datas </button>
      <br/>
      <Input type='text' placeholder='Descrição' onChange={setExit} objeto={exit} campo='description'/>
      <button onClick={()=> readExits(["description",exit.description])} > Buscar Descrição </button> 
      <br/>
      <button onClick={()=> readExits()} > Atualizar </button>
      </div>

      <div className='exitTable'>
      <table class="exitTable" border ="1" cellpadding="5" cellspacing="0">
        
            
            <tr>
              <th>Data: </th>
              <th>Descrição: </th>
              <th>Valor: </th>
              <th>Excluir </th>
              <th>Editar </th>
            </tr>
            
          
      {exits.map(
        e => (
                      
          <tr key={e.id}   >
              <td>{e.date}</td>
              <td>{e.description}</td>
              <td>R$ {(e.value).toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
              <td><Button variant="danger" onClick={()=> delExit(e.id)}>Excluir</Button></td>
              <td><Button variant="warning" onClick={() => nav( `/exit/${e.id}`, {replace: true})}>Editar</Button></td>
          </tr>
            
          
          //<div className='cardExit' key={e.id}>
          //<br/><br/>
          //Data: {e.date}<br/>
          //Descrição: {e.description}<br/>
          //Valor: R${e.value}<br/>
          //</div>}
          
        )    
      )}
      </table>
      </div>
    </div>
  );
   
}

export default Exit;
