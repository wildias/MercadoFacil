import { API_BASE_URL } from '../config/api';

export interface ListaCompraRequest {
  Lista: string;
}

export interface ListaCompraResponse {
  listaCompraId: number;
  lista: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
}

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const listaCompraService = {
  async buscarListas(): Promise<ListaCompraResponse[]> {
    const response = await fetch(`${API_BASE_URL}/ListaCompra/buscar`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar listas');
    }

    return await response.json();
  },

  async cadastrarLista(lista: string): Promise<string> {
    const request: ListaCompraRequest = {
      Lista: lista,
    };

    const response = await fetch(`${API_BASE_URL}/ListaCompra/cadastrar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro ao criar lista');
      throw new Error(errorText || 'Erro ao criar lista');
    }

    const result = await response.text();
    return result;
  },

  async atualizarLista(id: number, lista: string): Promise<string> {
    const request: ListaCompraRequest = {
      Lista: lista,
    };

    const response = await fetch(`${API_BASE_URL}/ListaCompra/${id}/atualizar`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro ao atualizar lista');
      throw new Error(errorText || 'Erro ao atualizar lista');
    }

    const result = await response.text();
    return result;
  },

  async deletarLista(id: number, lista: string): Promise<string> {
    const request: ListaCompraRequest = {
      Lista: lista,
    };

    const response = await fetch(`${API_BASE_URL}/ListaCompra/${id}/deletar`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro ao deletar lista');
      throw new Error(errorText || 'Erro ao deletar lista');
    }

    const result = await response.text();
    return result;
  },
};
