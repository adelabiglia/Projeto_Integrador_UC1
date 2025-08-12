import logo from './logo.svg';
import './App.css';

function App() { 

  let cesta = ['pao', 'leite', 'manteiga', 'queijo']

  let desenha = [];

  // for(declara o indece; compara o indece; incrementa o indece)
  for(let i=0; i<3; i++){
    desenha.push (<p> {cesta[i]} </p>) 
  }

  return ( 
                    
    <main className="App">
      {
        [desenha]
      }

    </main>

  );
}

export default App;
