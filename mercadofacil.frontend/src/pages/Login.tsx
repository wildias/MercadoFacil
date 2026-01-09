import React, { useState, useEffect } from 'react';
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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    console.log('Verificando suporte para PWA...');
    console.log('Tem beforeinstallprompt?', 'onbeforeinstallprompt' in window);
    
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('Evento beforeinstallprompt disparado!');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Registrar service worker
    if ('serviceWorker' in navigator) {
      console.log('Registrando service worker...');
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    } else {
      console.log('Service Worker não suportado');
    }

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App já está instalado');
    } else {
      console.log('App NÃO está instalado');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      setModalType('atencao');
      setModalMessage('App já está instalado ou não é possível instalar neste navegador.');
      setModalOpen(true);
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setModalType('sucesso');
      setModalMessage('App instalado com sucesso!');
      setModalOpen(true);
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
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

          {isInstallable && (
            <button type="button" className="btn-install" onClick={handleInstallApp}>
              ⬇ Instalar App
            </button>
          )}
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
