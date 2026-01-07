import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';
import logo from '../assets/images/Logo.png';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleCreateList = () => {
    console.log('Criar nova lista');
    setShowMenu(false);
    // Implementar navegação para página de criar lista
  };

  const handleRegisterProduct = () => {
    console.log('Cadastrar produto');
    setShowMenu(false);
    // Implementar navegação para página de cadastrar produto
  };

  const isWil = user?.username.toLowerCase() === 'wil';

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <img src={logo} alt="Mercado Fácil" className="home-logo" />
          <button className="logout-button" onClick={logout}>
            Sair
          </button>
        </header>

        <div className="home-content">
          <h2>Bem-vindo(a), {user?.username}!</h2>
          <p>Selecione uma opção abaixo para começar.</p>
        </div>
      </div>

      {/* Botão flutuante com + */}
      <button 
        className="fab-button"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Menu de ações"
      >
        +
      </button>

      {/* Menu de opções */}
      {showMenu && (
        <>
          <div className="menu-overlay" onClick={() => setShowMenu(false)} />
          <div className="fab-menu">
            <button className="menu-item" onClick={handleCreateList}>
              <span className="menu-icon">📋</span>
              <span>Criar Nova Lista</span>
            </button>
            {isWil && (
              <button className="menu-item" onClick={handleRegisterProduct}>
                <span className="menu-icon">📦</span>
                <span>Cadastrar Produto</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
