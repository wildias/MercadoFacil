import React, { useState, useRef } from 'react';
import '../styles/CadastrarProduto.css';
import logo from '../assets/images/Logo.png';
import Modal, { type ModalType } from '../components/Modal';
import { produtoService, type ProdutoCadastro } from '../services/produtoService';

interface Produto extends ProdutoCadastro {}

interface CadastrarProdutoProps {
  onClose: () => void;
}

const CadastrarProduto: React.FC<CadastrarProdutoProps> = ({ onClose }) => {
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [imagemPreview, setImagemPreview] = useState('');
  const [secao, setSecao] = useState('');
  const [tipo, setTipo] = useState('UN');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('sucesso');
  const [modalMessage, setModalMessage] = useState('');
  const [produtoParaRemover, setProdutoParaRemover] = useState<number | null>(null);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagem(base64String);
        setImagemPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNovoProduto = () => {
    if (!descricao.trim() || !secao) {
      setModalType('atencao');
      setModalMessage('Por favor, preencha a descrição e selecione a seção');
      setModalOpen(true);
      return;
    }

    const novoProduto: Produto = {
      Descricao: descricao,
      Imagem: imagem,
      Secao: secao,
      Tipo: tipo,
    };

    setProdutos([...produtos, novoProduto]);
    
    // Limpar formulário
    setDescricao('');
    setImagem('');
    setImagemPreview('');
    setSecao('');
    setTipo('UN');
  };

  const handleSolicitarRemocao = (index: number) => {
    setProdutoParaRemover(index);
    setModalType('pergunta');
    setModalMessage('Deseja realmente excluir este produto da lista?');
    setModalOpen(true);
  };

  const handleConfirmarRemocao = () => {
    if (produtoParaRemover !== null) {
      setProdutos(produtos.filter((_, index) => index !== produtoParaRemover));
      setProdutoParaRemover(null);
    }
  };

  const handleEnviarProdutos = async () => {
    if (produtos.length === 0) {
      setModalType('atencao');
      setModalMessage('Adicione pelo menos um produto antes de enviar');
      setModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const data = await produtoService.cadastrarProdutos(produtos);
      setModalType('sucesso');
      setModalMessage(data.message || `${produtos.length} produto(s) cadastrado(s) com sucesso!`);
      setModalOpen(true);
      setProdutos([]);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error('Erro ao enviar produtos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar produtos. Tente novamente.';
      setModalType('erro');
      setModalMessage(errorMessage);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <header className="cadastro-header">
          <img src={logo} alt="Mercado Fácil" className="cadastro-logo" />
          <h2>Cadastrar Produtos</h2>
        </header>

        <div className="cadastro-content">
          <div className="form-produto">
            <div className="image-upload" onClick={handleImageClick}>
              {imagemPreview ? (
                <img src={imagemPreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <span className="camera-icon">📷</span>
                  <span>Adicionar Imagem</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Nome do produto"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="UN">UN</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="secao">Seção</label>
                <select id="secao" value={secao} onChange={(e) => setSecao(e.target.value)}>
                  <option value="">Selecione...</option>
                  {secoes.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {produtos.length > 0 && (
              <div className="produtos-lista">
                <h3>Produtos adicionados ({produtos.length})</h3>
                <div className="produtos-items">
                  {produtos.map((prod, index) => (
                    <div key={index} className="produto-item">
                      <span className="produto-texto">
                        {prod.Descricao} - {prod.Tipo} - {secoes.find(s => s.value === prod.Secao)?.label}
                      </span>
                      <button
                        className="btn-remover-produto"
                        onClick={() => handleSolicitarRemocao(index)}
                        title="Remover produto"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="cadastro-footer">
          <button className="btn-footer btn-fechar" onClick={onClose}>
            <span className="btn-icon">✖</span>
            Fechar
          </button>

          <div className="footer-right">
            <button className="btn-footer btn-novo" onClick={handleNovoProduto}>
              <span className="btn-icon">➕</span>
              Novo Produto
            </button>
            <button
              className="btn-footer btn-enviar"
              onClick={handleEnviarProdutos}
              disabled={loading || produtos.length === 0}
            >
              <span className="btn-icon">📤</span>
              {loading ? 'Enviando...' : 'Enviar Produtos'}
            </button>
          </div>
        </footer>
      </div>

      <Modal
        isOpen={modalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
          setProdutoParaRemover(null);
        }}
        onConfirm={modalType === 'pergunta' ? handleConfirmarRemocao : undefined}
      />
    </div>
  );
};

export default CadastrarProduto;
