
import './App.css';
import Auth from './Views/Users/Auth';
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';
import Home from './Home';
import Panel from './Panel';
import Categories from './Views/Categories/Categories';
import Panel from './Views/Users/Panel';
import Categories from './Categories';
import Exit from './Exit';


function PrivateSessioon(){
  const hasSession = !! localStorage.getItem('supaSession');
  return hasSession ? <Outlet/> : <Navigate to="/login" replace />
}

function App() { //Aqui é JavaScript 
  const hasSession = !! localStorage.getItem('supaSession')
    
  return(/* aqui é html */
    <Router>
      <main className="App">
        <nav>
          {hasSession ? (
            <>
              <Link to="/home">Inicio</Link>
              <Link to="/users">Usuário</Link>
              <Link to="/categories">Categorias</Link>
              <Link to="/Panel">Painel</Link>
              <Link to="/Exit">Sair</Link>
            </>
          ) : (
            <>
              <Link to="/home">Inicio</Link>
              <Link to="/login">Entrar</Link>
            </>
          )}
        </nav>

        <Routes>
        {/* Routes = Rotas Publicas*/}
          <Route path='/login' element={<Auth/>} />
           
          
          <Route element={<PrivateSessioon/>}> 
          {/* Route = Rotas Logado*/}
           
            <Route path='/categories' element={<Categories/>} />  
            <Route path='/Panel' element={<Panel/>} /> 
            <Route path='/home' element={<Home/>} />  
            <Route path='/Exit' element={<Exit/>} />  

          </Route>
          <Route path='/' element={<Navigate to='/login' replace/>}/>

        </Routes>
      </main>
    </Router>
 
  ); 
}

export default App;
