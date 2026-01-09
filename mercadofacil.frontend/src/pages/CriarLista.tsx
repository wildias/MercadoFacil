import React, { useState, useEffect } from 'react';
import '../styles/CriarLista.css';
import logo from '../assets/images/Logo.png';
import Modal, { type ModalType } from '../components/Modal';
import { produtoService, type Produto } from '../services/produtoService';
import { formatImageBase64 } from '../utils/imageHelper';
import { listaCompraService } from '../services/listaCompraService';

interface ProdutoSelecionado extends Produto {
  quantidade: number;
}

interface CriarListaProps {
  onClose: () => void;
}

const CriarLista: React.FC<CriarListaProps> = ({ onClose }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('sucesso');
  const [modalMessage, setModalMessage] = useState('');

  const secoes = [
    { value: 'Acougue', label: 'Açougue' },
    { value: 'Hortifruti', label: 'Hortifruti' },
    { value: 'Mercearia', label: 'Mercearia' },
    { value: 'FriosELaticinios', label: 'Frios e Laticínios' },
    { value: 'Bebidas', label: 'Bebidas' },
    { value: 'Limpeza', label: 'Limpeza' },
    { value: 'Higiene', label: 'Higiene' },
    { value: 'PetShop', label: 'Pet Shop' },
    { value: 'Infantil', label: 'Infantil' },
  ];

  const getSecaoLabel = (value: string) => {
    return secoes.find(s => s.value === value)?.label || value;
  };

  useEffect(() => {
    if (showModal) {
      buscarProdutos();
    }
  }, [showModal]);

  const buscarProdutos = async () => {
    setLoadingProdutos(true);
    try {
      const data = await produtoService.buscarProdutos();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setModalType('erro');
      setModalMessage('Erro ao carregar produtos. Tente novamente.');
      setModalOpen(true);
    } finally {
      setLoadingProdutos(false);
    }
  };

  const handleAdicionarProduto = (produto: Produto) => {
    const jaExiste = produtosSelecionados.find(p => p.produtoId === produto.produtoId);
    
    if (jaExiste) {
      setProdutosSelecionados(
        produtosSelecionados.map(p =>
          p.produtoId === produto.produtoId
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        )
      );
    } else {
      setProdutosSelecionados([...produtosSelecionados, { ...produto, quantidade: 1 }]);
    }
  };

  const handleRemoverProduto = (produtoId: number) => {
    setProdutosSelecionados(produtosSelecionados.filter(p => p.produtoId !== produtoId));
  };

  const handleAlterarQuantidade = (produtoId: number, quantidade: number) => {
    if (quantidade <= 0) {
      handleRemoverProduto(produtoId);
      return;
    }

    setProdutosSelecionados(
      produtosSelecionados.map(p =>
        p.produtoId === produtoId ? { ...p, quantidade } : p
      )
    );
  };

  const handleCriarLista = async () => {
    if (produtosSelecionados.length === 0) {
      setModalType('atencao');
      setModalMessage('Adicione pelo menos um produto à lista');
      setModalOpen(true);
      return;
    }

    const listaJson = JSON.stringify(produtosSelecionados);

    setLoading(true);
    try {
      const mensagem = await listaCompraService.cadastrarLista(listaJson);
      setModalType('sucesso');
      setModalMessage(mensagem || 'Lista criada com sucesso!');
      setModalOpen(true);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error('Erro ao criar lista:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar lista. Tente novamente.';
      setModalType('erro');
      setModalMessage(errorMessage);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="criar-lista-container">
      <div className="criar-lista-card">
        <header className="criar-lista-header">
          <img src={logo} alt="Mercado Fácil" className="criar-lista-logo" />
          <h2>Criar Nova Lista</h2>
        </header>

        <div className="criar-lista-content">
          <div className="lista-produtos">
            {produtosSelecionados.length === 0 ? (
              <div className="lista-vazia">
                <span className="lista-vazia-icon">📋</span>
                <p>Nenhum produto adicionado</p>
                <p className="lista-vazia-hint">Clique em "Adicionar Produto" para começar</p>
              </div>
            ) : (
              <div className="produtos-selecionados">
                {produtosSelecionados.map((produto) => (
                  <div key={produto.produtoId} className="produto-selecionado">
                    {produto.imagem && (
                      <img src={formatImageBase64(produto.imagem)} alt={produto.descricao} className="produto-img" />
                    )}
                    <div className="produto-info">
                      <span className="produto-nome">{produto.descricao}</span>
                      <span className="produto-detalhes">
                        {produto.tipo} - {getSecaoLabel(produto.secao)}
                      </span>
                    </div>
                    <div className="produto-quantidade">
                      <button
                        className="btn-qtd"
                        onClick={() => handleAlterarQuantidade(produto.produtoId, produto.quantidade - 1)}
                      >
                        -
                      </button>
                      <span className="qtd-valor">{produto.quantidade}</span>
                      <button
                        className="btn-qtd"
                        onClick={() => handleAlterarQuantidade(produto.produtoId, produto.quantidade + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-remover"
                      onClick={() => handleRemoverProduto(produto.produtoId)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn-adicionar-produto" onClick={() => setShowModal(true)}>
            <span className="btn-icon">➕</span>
            Adicionar Produto
          </button>
        </div>

        <footer className="criar-lista-footer">
          <button className="btn-footer btn-fechar" onClick={onClose}>
            <span className="btn-icon">✖</span>
            Fechar
          </button>

          <button
            className="btn-footer btn-criar"
            onClick={handleCriarLista}
            disabled={loading || produtosSelecionados.length === 0}
          >
            <span className="btn-icon">✅</span>
            {loading ? 'Criando...' : 'Criar Lista'}
          </button>
        </footer>
      </div>

      {/* Modal de seleção de produtos */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Selecionar Produtos</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✖
              </button>
            </div>

            <div className="modal-body">
              {loadingProdutos ? (
                <div className="modal-loading">Carregando produtos...</div>
              ) : produtos.length === 0 ? (
                <div className="modal-empty">
                  <p>Nenhum produto cadastrado</p>
                </div>
              ) : (
                <div className="produtos-grid">
                  {produtos.map((produto) => (
                    <div key={produto.produtoId} className="produto-card">
                      {produto.imagem && (
                        <img src={formatImageBase64(produto.imagem)} alt={produto.descricao} className="produto-card-img" />
                      )}
                      <div className="produto-card-info">
                        <span className="produto-card-nome">{produto.descricao}</span>
                        <span className="produto-card-detalhes">
                          {produto.tipo} - {getSecaoLabel(produto.secao)}
                        </span>
                      </div>
                      <button
                        className="btn-adicionar"
                        onClick={() => {
                          handleAdicionarProduto(produto);
                          setShowModal(false);
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CriarLista;
