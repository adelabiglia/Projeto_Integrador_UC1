import logo from './logo.svg';
import './App.css';

function App() { //Aqui é JavaScript 

    let cesta = ['Pão', 'Suco', 'Chocolate', 'Torrone', 'Torrada'] //Só utilizado para vetor 

    let desenha = [];
  
  //declara o indice; compara se é pra continuar; incrementa o indice

    for(let i=0; i<3; i++){
      //desenha [i] = 
      desenha.push( <p> {cesta[i]} </p> ) //não depende do [i]


    }

    return(
      <main className="App">
    
      {desenha}

      </main>

  ); 

}

export default App;
