// import logo from './logo.svg';
import { useState, useEffect} from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
// import './App.css';
import { createClient } from "@supabase/supabase-js";
import { replace, useNavigate, useParams } from 'react-router-dom';


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() { //Aqui é JavaScript 
  const nav = useNavigate();
  const {id} = useParams();

  const [entry, setEntry] = useState({
    date: "",
    description: "",
    value: "",
    user_id: "",
    category_id: ""

  })

  useEffect(()=>{
    readEntries()
  }, [])

  async function createEntry(){
    const{data: dU, error: eU} = await supabase.auth.getUser();

    console.log(dU)

    const uid = dU?.user?.id

    if(!uid) nav('/login', {replace: true})

    console.log({...entry, user_id: uid})

    const { data, error } = await supabase
    .from('entries')
    .insert({...entry, user_id: uid});
    //.select();
        
  }

  async function readEntries() {
      let { data: dataEntries, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .single()

      setEntry(dataEntries);
    
    }
  
  return(/* aqui é html */

    <div className="screen">
      <form onSubmit={(e) => e.preventDefault()}>
      <input type="date" value={entry.date}  placeholder="Data" onChange={(e) => setEntry ({...entry, date: (e.target.value)})} />
      <input type="text" value={entry.description} placeholder="Descrição" onChange={(e) => setEntry ({...entry, description: (e.target.value)})} />
      <input type="number" value={entry.value} placeholder="Valor" onChange={(e) => setEntry ({...entry, value: (e.target.value)})} />
      <input type="text" value={entry.category_id} placeholder="Essa é uma chave de Categoria" onChange={(e) => setEntry ({...entry, category_id: (e.target.value)})} />


      <button onClick={createEntry} > Salvar </button>
      </form>

      
    </div>
  
  ); 
}

export default Home;
