import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import logo from '../assets/images/Logo.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Aqui você faria a chamada real para sua API
      // const response = await fetch('http://sua-api.com/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      // const data = await response.json();
      // if (data.token) {
      //   login(data.token);
      // }
      
      // Simulação temporária - remova quando conectar com a API real
      // Criando um token JWT fake para teste
      const fakeToken = btoa(JSON.stringify({ 
        header: { alg: 'HS256', typ: 'JWT' }
      })) + '.' + btoa(JSON.stringify({ 
        username: username,
        sub: username,
        exp: Date.now() + 3600000 
      })) + '.' + btoa('signature');
      
      login(fakeToken);
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', err);
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
                placeholder="Digite seu usuário"
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

          <button type="submit" className="btn-login">
            🔓 Entrar
          </button>

          <button type="button" className="btn-install" onClick={handleInstallApp}>
            ⬇ Instalar App
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
