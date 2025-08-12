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

  /*let cesta = ['pão', 'suco', 'chocolate', 'torrada', 'geléia', 'requeijão']

  let desenha = [];
  // declara o indice; compara se é para continuar; incremementa o indice//
  for(let i=1; i<4 ; i++ ){
    desenha.push(<p> {cesta[i]} </p>)
  }*/
  // faça uma lista com todos os numeros mas exiba apenas os numeros impares//

  let numeros = [1,2,3,4,5,6,7,8,9,10]
  let desenha = [];
  for(let i=0; i<10; i++){
    if(numeros[i] % 2 !=0){
      desenha.push(<p> {numeros[i]} </p> )

    }

  }
    
  return ( /* aqui é html*/
    <main className="App">
      {desenha}
    </main>
  );
}

export default App;
