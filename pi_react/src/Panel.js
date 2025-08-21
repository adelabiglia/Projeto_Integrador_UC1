import logo from './logo.svg';
import { useState } from 'react'; //useState ele retorna para gente um par variavel e funçao que quando alterado o dom mostra na tela 
import './App.css';
import { createClient } from "@supabase/supabase-js";


const supabaseUrl="https://kvuxqtwfmqnookboncos.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g"
const supabase = createClient(supabaseUrl, supabaseKey);


export default function Panel(){

  const [] = useState()



  return(

    <div className="screen"> 
    
    <form>

      <input type="text" placeholder='Digite seu nome'/>     
      <input type="text" placeholder='Digite sua meta'/>     
      <input type="text" placeholder='http://exemple.com'/>     

    </form>
    
    </div>

  );


}