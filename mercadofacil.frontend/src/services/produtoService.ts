import { API_BASE_URL } from '../config/api';

export interface Produto {
  produtoId: number;
  descricao: string;
  imagem: string;
  secao: string;
  tipo: string;
}

export interface ProdutoCadastro {
  Descricao: string;
  Imagem: string;
  Secao: string;
  Tipo: string;
}

export interface CadastroResponse {
  success: boolean;
  message: string;
}

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const produtoService = {
  async buscarProdutos(): Promise<Produto[]> {
    const response = await fetch(`${API_BASE_URL}/Produto/buscar`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    return await response.json();
  },

  async cadastrarProdutos(produtos: ProdutoCadastro[]): Promise<CadastroResponse> {
    const response = await fetch(`${API_BASE_URL}/Produto/cadastrar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(produtos),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || 'Não foi possível salvar os produtos.';
      throw new Error(errorMessage);
    }

    return await response.json();
  },
};
