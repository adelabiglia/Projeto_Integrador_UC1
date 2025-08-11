import logo from './logo.svg';
import './App.css';

function App() { // Aqui é JavaScript//   

  let oi = "Olá, mundo! ";

  oi += "Hln";

  function soma(a, b){ // Parâmetros 
    return a + b
  }

  function divide(a, b){
    return a/b;
  } 

  return ( /* Aqui é HTML */
    <main className="App">
      
      {soma(oi, "HLN")} <br/>
      {divide(36, 6)}

    </main>
  );
}

export default App;
