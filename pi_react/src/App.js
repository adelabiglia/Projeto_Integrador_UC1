import logo from './logo.svg';
import './App.css';

function App() { //Aqui é JavaScript 

  function calculadora(a, b, op){ //O switch não precisa do BREAK (br) ele pula um pedaço do código
      switch(op){
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case "/":
        return a / b

      }
    
    }

    return(
    <main className="App">
      
    {calculadora(200, 10, "/")}<br/>
    {calculadora(1200, 5, "/")}<br/>
    {calculadora(252, 3, "-")}<br/>
    {calculadora(325, 7, "+")}<br/>
    {calculadora(5,calculadora(8, 7, "*"), "+")}<br/>
    {calculadora(10,calculadora(5, 7, "-"), "+")}<br/>
    


    </main>

  ); 
}

export default App;
