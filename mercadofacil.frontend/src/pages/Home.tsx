import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CadastrarProduto from './CadastrarProduto';
import CriarLista from './CriarLista';
import '../styles/Home.css';
import logo from '../assets/images/Logo.png';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showCadastrarProduto, setShowCadastrarProduto] = useState(false);
  const [showCriarLista, setShowCriarLista] = useState(false);

  const handleCreateList = () => {
    setShowMenu(false);
    setShowCriarLista(true);
  };

  const handleRegisterProduct = () => {
    console.log('Clicou em Cadastrar Produto');
    setShowMenu(false);
    setShowCadastrarProduto(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
  };

  const isWil = user?.username === 'Wil';
  console.log('Username:', user?.username, 'isWil:', isWil);

  if (showCadastrarProduto) {
    return <CadastrarProduto onClose={() => setShowCadastrarProduto(false)} />;
  }

  if (showCriarLista) {
    return <CriarLista onClose={() => setShowCriarLista(false)} />;
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <img src={logo} alt="Mercado Fácil" className="home-logo" />
          <button className="logout-button" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Sair
          </button>
        </header>

        <div className="home-content">
          <h2>Bem-vindo(a), {user?.username}!</h2>
          <p>Selecione uma opção abaixo para começar.</p>
        </div>

        {/* Botão flutuante com + */}
        <button 
          className="fab-button"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Menu de ações"
        >
          <span className="fab-plus">+</span>
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
              <button className="menu-item" onClick={handleRegisterProduct}>
                <span className="menu-icon">📦</span>
                <span>Cadastrar Produto</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
