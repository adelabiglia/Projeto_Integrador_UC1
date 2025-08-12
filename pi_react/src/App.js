import logo from './logo.svg';
import './App.css';

function App() { // aqui é o componente principal do React, 
// onde você pode definir a estrutura da sua aplicação.
  
function calculadora(a, b, op) {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return a / b

}
  return ( 
    
    <main className="App">

      {calculadora(5, 10, '+')} <br/> 
      {calculadora(6, 3, '-')} <br/> 
      {calculadora(5, 2, '*')} <br/> 
      {(calculadora(14, 3, '/').toFixed(2))} <br/> 
      {calculadora(10, calculadora(2, 3,'+'), '*')} <br/>
      
  
    </main>

  );
}

export default App;
