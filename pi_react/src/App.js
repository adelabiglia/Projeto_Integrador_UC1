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

  let cesta = ['pão', 'suco', 'chocolate', 'torrada', 'geléia', 'requeijão']

  let desenha = [];
  // declara o indice; compara se é para continuar; incremementa o indice//
  for(let i=1; i<4 ; i++ ){
    desenha.push(<p> {cesta[i]} </p>)
  }

  return ( /* aqui é html*/
    <main className="App">
      {
        desenha
      }
    </main>
  );
}

export default App;
