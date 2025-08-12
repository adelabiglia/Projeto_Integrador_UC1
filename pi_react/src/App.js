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

    /* function calculadora (a, b, op){*/

     /* switch(op){
        case '+':
          return a + b
        case '-':
          return a - b
        case '/':
          return a / b
        case '*':
          return a * b
      } */
      
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

    /*let cesta = ['pão', 'suco', 'fruta', 'feijão']
  
    let desenha = [];
    // Declara o índice; compara se é para continuar; incrementa o índice
    for(let i=0; i<6; i++){
      desenha.push(<p>  { cesta[i] } </p>)

    } */

    // Faça uma lista como todos os números até o 10, mas exiba apenas os número impares

    let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
    let desenha = [];

    for(let i=0; i<10; i++ ){
      if(numeros[i] % 2 !== 0){
        desenha.push(<p> {numeros[i]} </p>)
      }
    } 

    return ( /* Aqui é HTML */
      <main className="App">
      
        {desenha} 

      </main>
  );
}

export default App;
