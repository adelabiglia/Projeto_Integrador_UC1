import './App.css';
import Auth from './Views/Users/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import Presentation from './Views/Presentation/Presentation';
import { useState } from 'react';

function PrivateSessioon() {
  const hasSession = !!localStorage.getItem('supaSession');
  return hasSession ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const hasSession = !!localStorage.getItem('supaSession');
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('supaSession');
    navigate('/'); // volta para Presentation
  }

  const hideNav = location.pathname === "/" || location.pathname === "/login";

  return (
    <main className="App">
      {!hideNav && (
        <nav>
        {hasSession ? (
          <>
            <div className="nav-links">
              <Link to="/screen">Inicio</Link>
              <Link to="/home">Lançamentos</Link>
              <Link to="/entry">Entradas</Link>
              <Link to="/categories">Categorias</Link>
              <Link to="/panel">Painel</Link>
              <Link to="/exit">Saídas</Link>
            </div>
      
            {/* Avatar com dropdown */}
            <div className="profile-menu">
              <img
                src="https://i.pravatar.cc/40"
                alt="Perfil"
                className="profile-avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="dropdown">
                  <button onClick={() => navigate('/profile')}>Perfil</button>
                  <button onClick={handleLogout}>Sair</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="nav-links">
            <Link to="/entry">Inicio</Link>
            <Link to="/login">Entrar</Link>
          </div>
        )}
      </nav>
      )}

      <Routes>
        {/* Página inicial Presentation */}
        <Route path="/" element={<Presentation />} />

        {/* Routes públicas */}
        <Route path="/login" element={<Auth />} />

        {/* Routes privadas */}
        <Route element={<PrivateSessioon />}>
          <Route path="/screen" element={<Screen />} />
          <Route path="/home" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoriesShow />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/entry/:id" element={<EntryShow />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/exit/:id" element={<ExitShow />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;





