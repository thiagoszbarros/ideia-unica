import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Por favor, preencha todos os campos');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      response.ok ?
        handleSuccessLogin(data) :
        handleErrorLogin(data);
    } catch (error) {
      setMessage('Houve um erro. Tente novamente mais tarde.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessLogin = async (data) => {
    setMessage(data.message);
    setMessageType('success');
  }

  const handleErrorLogin = async (data) => {
    setMessage(data.message);
    setMessageType('error');
  }

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Login</h1>
            <p>Acesse sua conta</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="form-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="form-input"
                disabled={isLoading}
              />
            </div>

            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <p>Esqueceu sua senha? <a href="#forgot">Clique aqui</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
