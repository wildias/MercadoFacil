import React, { useState, useEffect } from 'react';
import '../styles/DetalheListaCompra.css';
import logo from '../assets/images/Logo.png';
import icone from '../assets/images/Icone.png';

interface Produto {
  produtoId: number;
  descricao: string;
  imagem: string;
  secao: string;
  tipo: string;
  quantidade: number;
  comprado?: boolean;
}

interface ProdutosPorSecao {
  [key: string]: Produto[];
}

interface DetalheListaCompraProps {
  listaCompraId: number;
  listaJson: string;
  onClose: () => void;
}

const DetalheListaCompra: React.FC<DetalheListaCompraProps> = ({ listaCompraId, listaJson, onClose }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [valorTotal, setValorTotal] = useState('');

  const secoes = [
    { value: 'Acougue', label: 'Açougue', icon: '🥩', color: '#ffebee' },
    { value: 'Hortifruti', label: 'Hortifruti', icon: '🥬', color: '#e8f5e9' },
    { value: 'Mercearia', label: 'Mercearia', icon: '🛒', color: '#fff3e0' },
    { value: 'FriosELaticinios', label: 'Frios e Laticínios', icon: '🧀', color: '#e3f2fd' },
    { value: 'Bebidas', label: 'Bebidas', icon: '🥤', color: '#f3e5f5' },
    { value: 'Limpeza', label: 'Limpeza', icon: '🧹', color: '#e0f7fa' },
    { value: 'Higiene', label: 'Higiene', icon: '🚿', color: '#fce4ec' },
    { value: 'PetShop', label: 'Pet Shop', icon: '🐾', color: '#fff9c4' },
    { value: 'Infantil', label: 'Infantil', icon: '👶', color: '#f1f8e9' },
  ];

  useEffect(() => {
    try {
      const produtosParseados = JSON.parse(listaJson);
      setProdutos(produtosParseados.map((p: Produto) => ({ ...p, comprado: false })));
    } catch (error) {
      console.error('Erro ao parsear lista:', error);
    }
  }, [listaJson]);

  const getSecaoInfo = (value: string) => {
    return secoes.find(s => s.value === value) || { label: value, icon: '📦', color: '#f5f5f5' };
  };

  const agruparPorSecao = (): ProdutosPorSecao => {
    return produtos.reduce((acc, produto) => {
      if (!acc[produto.secao]) {
        acc[produto.secao] = [];
      }
      acc[produto.secao].push(produto);
      return acc;
    }, {} as ProdutosPorSecao);
  };

  const handleCheckProduto = (produtoId: number) => {
    setProdutos(produtos.map(p => 
      p.produtoId === produtoId ? { ...p, comprado: !p.comprado } : p
    ));
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      const numberValue = parseInt(value) / 100;
      setValorTotal(numberValue.toFixed(2));
    } else {
      setValorTotal('');
    }
  };

  const formatarValor = (valor: string) => {
    if (!valor) return 'R$ 0,00';
    return `R$ ${valor.replace('.', ',')}`;
  };

  const produtosPorSecao = agruparPorSecao();

  return (
    <div className="detalhe-lista-overlay">
      <div className="detalhe-lista-container">
        <header className="detalhe-lista-header">
          <img src={icone} alt="Ícone" className="detalhe-lista-icone" />
          <img src={logo} alt="Mercado Fácil" className="detalhe-lista-logo" />
          <h2>Lista de Compra: {listaCompraId}</h2>
          <button className="btn-fechar-detalhe" onClick={onClose}>✖</button>
        </header>

        <div className="detalhe-lista-content">
          {Object.keys(produtosPorSecao).length === 0 ? (
            <div className="lista-vazia">Lista vazia</div>
          ) : (
            Object.entries(produtosPorSecao).map(([secao, prods]) => {
              const secaoInfo = getSecaoInfo(secao);
              return (
                <div key={secao} className="secao-grupo">
                  <div className="secao-header" style={{ backgroundColor: secaoInfo.color }}>
                    <span className="secao-icon">{secaoInfo.icon}</span>
                    <span className="secao-nome">{secaoInfo.label}</span>
                  </div>
                  <div className="secao-produtos">
                    {prods.map((produto) => (
                      <div key={produto.produtoId} className="produto-linha">
                        <label className="produto-checkbox-label">
                          <input
                            type="checkbox"
                            checked={produto.comprado || false}
                            onChange={() => handleCheckProduto(produto.produtoId)}
                            className="produto-checkbox"
                          />
                          <span className={produto.comprado ? 'produto-texto-riscado' : ''}>
                            {produto.descricao} - {produto.quantidade} {produto.tipo}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}

          <div className="total-container">
            <label htmlFor="valorTotal" className="total-label">Total da Compra:</label>
            <input
              type="text"
              id="valorTotal"
              className="total-input"
              value={formatarValor(valorTotal)}
              onChange={handleValorChange}
              placeholder="R$ 0,00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalheListaCompra;
