
import './App.css';
import Auth from './Views/Users/Auth';
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';
import Entry from './Views/Entry/Index';
import EntryShow from './Views/Entry/Edit';
import Panel from './Views/Users/Panel';
import Transactions from './Views/Transactions/Index';
import Categories from './Views/Categories/Index';
import CategoriesShow from './Views/Categories/Show';
import Exit from './Views/Exit/Index';
import ExitShow from './Views/Exit/Edit';
import Profile from './Views/Users/Profile';
import Screen from './Views/Screen/Index';


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
              <Link to="/screen">Inicio</Link>            
              <Link to="/home">Lançamentos</Link>
              <Link to="/entry">Entradas</Link>
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
           
            <Route path='/screen' element={<Screen/>} />
            <Route path='/home' element={<Transactions/>} />
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
