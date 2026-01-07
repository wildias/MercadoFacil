import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  username: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se existe token no localStorage ao iniciar
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Decodificar o token JWT (básico, sem validação de assinatura)
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        setUser({ username: payload.username || payload.sub, token: storedToken });
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      // Decodificar o token JWT para extrair informações do usuário
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.username || payload.sub;
      
      setUser({ username, token });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro ao processar token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
