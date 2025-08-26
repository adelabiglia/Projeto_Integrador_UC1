
import './App.css';
import Auth from './Views/Users/Auth';
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';
import Entry from './Views/Entry/Index';
import EntryShow from './Views/Entry/Show';
import Panel from './Views/Users/Panel';
import Profile from './Views/Users/Profile';
import Categories from './Views/Categories/Index';
import CategoriesShow from './Views/Categories/Show';
import Exit from './Views/Exit/Index';
import ExitShow from './Views/Exit/Show';


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
              <Link to="/panel">Painel</Link>
              <Link to="/exit">Sair</Link>
              <Link className="imageProfile" to="/profile/">Perfil</Link>
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
            <Route path='/categories/:id' element={<CategoriesShow/>} />
            <Route path='/panel' element={<Panel/>} /> 
            <Route path='/entry' element={<Entry/>} />  
            <Route path='/entry/:id' element={<EntryShow/>} />
            <Route path='/exit' element={<Exit/>} />  
            <Route path='/exit/:id' element={<ExitShow/>} />
            <Route path='/profile' element={<Profile/>} />  

          </Route>
          <Route path='/' element={<Navigate to='/login' replace/>}/>

        </Routes>
      </main>
    </Router>
 
  ); 
}

export default App;
