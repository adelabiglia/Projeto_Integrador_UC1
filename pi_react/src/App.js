import logo from './logo.svg';
import './App.css';

function App() { //aqui é javascript
 // var oi1  // var é igual variavel global, let é local

  //const oi2 // const é uma variavel que não pode ser alterada constante

  let oi = "Hello, World!"; // let é uma variavel local


  //oi = oi + " Jefferson"; //soma de string
  //oi += " Jefferson"; //soma suprimida

  function soma(a, b) {// a e b são parâmetros da função 
    return a + b; //função que retorna a soma de dois números
  }

  function divide (a, b) {
    return a / b; //função que retorna a divisão de dois números
  }

  return ( /*aqui é html*/
    
    <main className="App">
      {soma (oi, "Jefferson")} <br/>
      {divide(36, 6)} <br/>
    </main>

  );
}

export default App;
