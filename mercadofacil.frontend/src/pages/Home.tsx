import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CadastrarProduto from './CadastrarProduto';
import CriarLista from './CriarLista';
import DetalheListaCompra from './DetalheListaCompra';
import Modal, { type ModalType } from '../components/Modal';
import '../styles/Home.css';
import logo from '../assets/images/Logo.png';
import icone from '../assets/images/Icone.png';
import { listaCompraService, type ListaCompraResponse } from '../services/listaCompraService';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showCadastrarProduto, setShowCadastrarProduto] = useState(false);
  const [showCriarLista, setShowCriarLista] = useState(false);
  const [listas, setListas] = useState<ListaCompraResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [listaSelecionada, setListaSelecionada] = useState<ListaCompraResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('pergunta');
  const [modalMessage, setModalMessage] = useState('');
  const [listaParaDeletar, setListaParaDeletar] = useState<ListaCompraResponse | null>(null);

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

  const handleAbrirLista = (lista: ListaCompraResponse) => {
    setListaSelecionada(lista);
  };

  const handleSolicitarExclusao = (e: React.MouseEvent, lista: ListaCompraResponse) => {
    e.stopPropagation();
    setListaParaDeletar(lista);
    setModalType('pergunta');
    setModalMessage(`Deseja realmente excluir a Lista de Compra ${lista.listaCompraId}?`);
    setModalOpen(true);
  };

  const handleConfirmarExclusao = async () => {
    if (!listaParaDeletar) return;

    try {
      await listaCompraService.deletarLista(listaParaDeletar.listaCompraId, listaParaDeletar.lista);
      setModalType('sucesso');
      setModalMessage('Lista excluída com sucesso!');
      setModalOpen(true);
      await buscarListas();
      setListaParaDeletar(null);
    } catch (error) {
      console.error('Erro ao deletar lista:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar lista.';
      setModalType('erro');
      setModalMessage(errorMessage);
      setModalOpen(true);
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
                  <div 
                    key={lista.listaCompraId} 
                    className="lista-card"
                    onClick={() => handleAbrirLista(lista)}
                  >
                    <img src={icone} alt="Ícone" className="lista-icone" />
                    <span className="lista-titulo">
                      Lista de Compra: {lista.listaCompraId}
                    </span>
                    <button
                      className="btn-deletar-lista"
                      onClick={(e) => handleSolicitarExclusao(e, lista)}
                      title="Excluir lista"
                    >
                      🗑️
                    </button>
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

      {listaSelecionada && (
        <DetalheListaCompra
          listaCompraId={listaSelecionada.listaCompraId}
          listaJson={listaSelecionada.lista}
          onClose={() => setListaSelecionada(null)}
        />
      )}

      <Modal
        isOpen={modalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
          setListaParaDeletar(null);
        }}
        onConfirm={modalType === 'pergunta' ? handleConfirmarExclusao : undefined}
      />
    </div>
  );
};

export default Home;
