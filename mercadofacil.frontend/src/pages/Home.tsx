import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CadastrarProduto from './CadastrarProduto';
import CriarLista from './CriarLista';
import '../styles/Home.css';
import logo from '../assets/images/Logo.png';
import { listaCompraService, type ListaCompraResponse } from '../services/listaCompraService';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showCadastrarProduto, setShowCadastrarProduto] = useState(false);
  const [showCriarLista, setShowCriarLista] = useState(false);
  const [listas, setListas] = useState<ListaCompraResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarListas();
  }, []);

  const buscarListas = async () => {
    setLoading(true);
    try {
      const data = await listaCompraService.buscarListas();
      setListas(data);
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
    } finally {
      setLoading(false);
    }
  };

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
    return <CriarLista onClose={() => {
      setShowCriarLista(false);
      buscarListas();
    }} />;
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

          <div className="listas-container">
            <h3>Minhas Listas de Compras</h3>
            {loading ? (
              <div className="loading-listas">Carregando listas...</div>
            ) : listas.length === 0 ? (
              <div className="empty-listas">
                <p>📋 Nenhuma lista criada ainda</p>
                <p className="hint">Clique no botão + para criar sua primeira lista!</p>
              </div>
            ) : (
              <div className="listas-grid">
                {listas.map((lista) => (
                  <div key={lista.listaCompraId} className="lista-card">
                    <span className="lista-titulo">
                      Lista de Compra: {lista.listaCompraId}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
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
