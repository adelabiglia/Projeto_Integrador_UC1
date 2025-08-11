import logo from './logo.svg';
import './App.css';

function App() { // aqui é javascript
  
  let oi = "Olá Mundo!";

  oi += " André"; // soma suprimida = é a mesma coisa que oi = oi + " André"

  function soma (a, b){ //parâmetros a e b
    return a + b;
  }

  function divide (a, b){
    return a /b;
  }

  return ( /* aqui é html*/
    <main className="App">
      {soma(oi, " André") }<br/>
      {divide(36, 6)}
    </main>
  );
}

export default App;
