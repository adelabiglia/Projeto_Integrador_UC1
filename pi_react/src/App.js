import logo from './logo.svg';
import './App.css';

function App() { // aqui é javascript
    
  /*let oi = "Olá Mundo!";

  oi += " André"; // soma suprimida = é a mesma coisa que oi = oi + " André"

  function soma (a, b){ //parâmetros a e b
    return a + b;
  }

  function divide (a, b){
    return a /b;
  }*/


  function calculadora (a, b, op){
  /*if (op == '+'){
    return a + b
  }
  else if (op == '-'){
    return a - b
  }
  else if (op == '/'){
    return a / b
  }
  else if (op == '*'){
    return a * b
  }*/
    switch(op){
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
    }
  }
   
  return ( /* aqui é html*/
    <main className="App">
      {calculadora (5, calculadora(8, 7, '*'), '+')}<br/>
      {calculadora (5, 5, '-')}<br/>
      {calculadora (5, 5, '/')}<br/>
      {calculadora (5, 5, '*')}<br/>
    </main>
  );
}

export default App;
