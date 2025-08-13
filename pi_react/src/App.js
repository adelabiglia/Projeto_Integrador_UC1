import logo from './logo.svg';
import './App.css';

function App() { //Aqui é JavaScript 

  //Faça uma lista com todos os numeros até 10 mas exiba apenas os numeros impares

  let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let mostrar = [];

  for(let i=0; i < numeros.length ; i++){
    if (numeros[i] % 2 !== 0){
      mostrar.push( <p> {numeros[i]} </p> )
    }
  }
  
  return(
    <main className="App">
      {mostrar}
    </main>
  ); 
}

export default App;
