
import './App.css';
import User from './User';
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';

function PrivateSessioon(){
  const hasSession = !! localStorage.getItem('supaSession')
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
              <Link to="/administrativePanel">Painel Administrativo</Link>
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
          <Route path='/login' element={<Login/>} />
          
          <Route element={<PrivateSessioon/>}> 
          {/* Route = Rotas Logado*/}
            <Route path='/login' element={<Login/>} />  
            <Route path='/categories' element={<Categories/>} />  
            <Route path='/administrativePanel' element={<AdministrativePanel/>} />  

          </Route>
          <Route path='/' element={<Navigate to='/login' replace/>}/>
          
        </Routes>
      </main>
    </Router>
 
  ); 
}

export default App;
