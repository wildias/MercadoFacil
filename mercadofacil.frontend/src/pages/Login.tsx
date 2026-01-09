import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import '../styles/Login.css';
import logo from '../assets/images/Logo.png';
import Modal, { type ModalType } from '../components/Modal';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('erro');
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authService.login({
        Username: username,
        Password: password,
      });
      
      login(response.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.';
      setModalType('erro');
      setModalMessage(errorMessage);
      setModalOpen(true);
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInstallApp = () => {
    // Lógica para instalar app
    console.log('Instalar App');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="username"
                placeholder="Digite seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? '⏳ Entrando...' : '🔓 Entrar'}
          </button>

          <button type="button" className="btn-install" onClick={handleInstallApp}>
            ⬇ Instalar App
          </button>
        </form>
      </div>

      <Modal
        isOpen={modalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Login;
