import logo from './logo.svg';
import './App.css';

function App() { // Aqui é JavaScript//   

  /*let oi = "Olá, mundo! ";

  oi += "Hln";

  function soma(a, b){ // Parâmetros 
    return a + b
  }

  function divide(a, b){
    return a/b;
  } */

    function calculadora (a, b, op){

      switch(op){
        case '+':
          return a + b
        case '-':
          return a - b
        case '/':
          return a / b
        case '*':
          return a * b
      }
      
      /* if(op == '+'){
        return a + b
    }
    else if(op == '-'){
      return a - b;
    }
    else if(op == '/'){
      return a / b;
    }
    else if(op == '*'){
      return a * b;
    } */ 
  }
  

  return ( /* Aqui é HTML */
    <main className="App">
      
      {calculadora(5, calculadora(5, 7, '*') , '+')} <br/>
      {calculadora(3, 1, '-')} <br/>
      {calculadora(3, 1, '/')} <br/>
      {calculadora(3, 1, '*')} 

    </main>
  );
}

export default App;
