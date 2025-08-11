import logo from './logo.svg';
import './App.css';

function App() { //Aqui é JavaScript 
let oi = "Olá mundo! ";

//oi += "Milena!"; //Soma suprimida (+=)


function soma(a, b){ //Paramêtros, eles não tem um tipo, irão receber o que colocam. 
  return a + b

function divide(a, b){

  return a/b; 

}

}

  return ( /*Aqui é HTML */

    // VAR é global - LET - CONST

    <main className="App">
      
    {soma(oi, "Milena!")}<br/>
    {divide(36, 6)}
    </main>

  ); 
}

export default App;
