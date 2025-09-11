import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Presentation.css';

const beneficios = [
  { titulo: "Controle Total", texto: "Tenha domínio completo sobre suas finanças com uma visão clara dos seus gastos, receitas e metas." },
  { titulo: "Interface Intuitiva", texto: "Nossa plataforma foi desenhada para ser simples e fácil de usar, mesmo para quem não entende de finanças." },
  { titulo: "Planejamento Inteligente", texto: "Defina metas, acompanhe seu progresso e tome decisões mais conscientes para alcançar seus objetivos." },
  { titulo: "Relatórios", texto: "Visualize relatórios personalizados para manter sua saúde financeira sempre em dia." },
  { titulo: "Independência Financeira", texto: "Descubra como é possível viver com mais tranquilidade e segurança, cuidando melhor do seu dinheiro." },
  { titulo: "Comece Agora", texto: "Não espere mais! Dê o primeiro passo rumo à sua liberdade financeira com nossa solução." }
];

const Presentation = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Redireciona sempre para login
  };

  return (
    <div className="pres-body">
      <header className="pres-cabecalho">
        <h1 className="pres-logo">$martFinanceira</h1>
        <button className="pres-btn-cabecalho" onClick={handleClick}>Comece Agora</button>
      </header>

      <div className="pres-apresentacao-container">
        <h2>Transforme sua vida financeira</h2>
        <div className="pres-cards-container">
          {beneficios.map((item, index) => (
            <div key={index} className="pres-card">
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Presentation;




