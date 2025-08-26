
import './App.css';
import Auth from './Views/Users/Auth';
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';
import Entry from './Views/Entry/Index';
import Panel from './Views/Users/Panel';
import Profile from './Views/Users/Profile';
import Categories from './Views/Categories/Index';
import Exit from './Views/Exit/Index';



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
              <Link to="/entry">Inicio</Link>
              <Link to="/users">Usuário</Link>
              <Link to="/categories">Categorias</Link>
              <Link to="/Panel">Painel</Link>
              <Link to="/Exit">Sair</Link>
              <Link to="/profile/">Sair</Link>
            </>
          ) : (
            <>
              <Link to="/entry">Inicio</Link>
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
            <Route path='/entry' element={<Entry/>} />  
            <Route path='/Exit' element={<Exit/>} />  
            <Route path='/profile' element={<Profile/>} />  

          </Route>
          <Route path='/' element={<Navigate to='/login' replace/>}/>

        </Routes>
      </main>
    </Router>
 
  ); 
}

export default App;
