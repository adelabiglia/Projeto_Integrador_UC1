import './App.css';
import './Views/Presentation/Presentation.css';
import Auth from './Views/Users/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, useLocation } from 'react-router-dom';
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
import React from 'react';
import Presentation from './Views/Presentation/Presentation';

// Componente de sessão privada
function PrivateSessioon() {
  const hasSession = !!localStorage.getItem('supaSession');
  return hasSession ? <Outlet /> : <Navigate to="/login" replace />;
}

// Componente que contém nav e rotas
function AppContent() {
  const location = useLocation();
  const hasSession = !!localStorage.getItem('supaSession');

  // Rotas onde não queremos mostrar o nav
  const hideNavRoutes = ['/', '/login'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <main className="App">
      {showNav && (
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
              <Link to="/">Inicio</Link>
              <Link to="/login">Entrar</Link>
            </>
          )}
        </nav>
      )}

      <Routes>
        {/* Tela inicial */}
        <Route path="/" element={<Presentation />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<Auth />} />

        {/* Rotas privadas */}
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

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

// Componente principal App, contém o Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;




