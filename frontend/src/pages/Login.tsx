import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

// --- Styles ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #808080;
  font-family: 'Roboto', 'SF Pro', sans-serif;
`;

const AuthCard = styled.div`
  background: ${props => props.theme.card};
  color: ${props => props.theme.text};
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    padding: 20px;
    max-width: 90%;
    border-radius: 20px; /* More rounded on mobile */
    box-shadow: none; /* Cleaner look on mobile */
  }
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 10px;
  span {
    color: ${props => props.theme.accent};
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.secondaryText};
  margin-bottom: 30px;
  font-size: 14px;
`;

const ToggleContainer = styled.div`
  display: flex;
  background: ${props => props.theme.background};
  border-radius: 25px;
  padding: 4px;
  margin-bottom: 30px;
  width: 100%;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  border: none;
  background: ${props => props.active ? props.theme.card : 'transparent'};
  color: ${props => props.active ? props.theme.accent : props.theme.secondaryText};
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    color: ${props => props.active ? props.theme.accent : props.theme.text};
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #999;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  font-size: 15px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
`;

const SubmitButton = styled.button`
  background: #FF8C00;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #e67e00;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  background: rgba(255, 77, 79, 0.1);
  padding: 10px;
  border-radius: 5px;
`;

const FooterText = styled.div`
  margin-top: 20px;
  color: #999;
  font-size: 12px;
  text-align: center;
`;

const ForgotPasswordLink = styled.div`
  margin-top: 5px;
  color: #FF8C00;
  font-size: 12px;
  text-align: right;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// --- Component ---

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only for register
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic Validation
    if (!email.includes('@')) {
        setError('Пожалуйста, введите корректный email.');
        return;
    }
    if (password.length < 6) {
        setError('Пароль должен содержать не менее 6 символов.');
        return;
    }
    if (!isLogin && !username.trim()) {
        setError('Имя пользователя обязательно.');
        return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await login(email, password);
        localStorage.setItem('token', response.data.token);
        toast.success('С возвращением!');
        navigate('/chat');
      } else {
        // Register
        await register(email, password, username);
        // Auto login after register
        const response = await login(email, password);
        localStorage.setItem('token', response.data.token);
        toast.success('Аккаунт успешно создан!');
        // Mock verify email redirect or notification
        toast.info('Пожалуйста, подтвердите ваш email (Mock).');
        navigate('/chat');
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Ошибка аутентификации. Проверьте введенные данные.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (mode: 'login' | 'register') => {
    setIsLogin(mode === 'login');
    setError('');
  };

  return (
    <Container>
      <AuthCard>
        <Logo>Gry<span>Ff</span></Logo>
        <Subtitle>Гибридная социальная платформа</Subtitle>

        <ToggleContainer>
          <ToggleButton active={isLogin} onClick={() => toggleMode('login')}>
            Вход
          </ToggleButton>
          <ToggleButton active={!isLogin} onClick={() => toggleMode('register')}>
            Регистрация
          </ToggleButton>
        </ToggleContainer>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup>
              <IconWrapper><FaUser /></IconWrapper>
              <Input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
              />
            </InputGroup>
          )}

          <InputGroup>
            <IconWrapper><FaEnvelope /></IconWrapper>
            <Input
              type="email"
              placeholder="Email адрес"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <IconWrapper><FaLock /></IconWrapper>
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          {isLogin && (
            <ForgotPasswordLink onClick={() => navigate('/forgot-password')}>
              Забыли пароль?
            </ForgotPasswordLink>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : (isLogin ? <><FaSignInAlt /> Войти</> : <><FaUserPlus /> Создать аккаунт</>)}
          </SubmitButton>
        </Form>
        
        <FooterText>
          &copy; 2026 GryFf Inc. Все права защищены.
        </FooterText>
      </AuthCard>
    </Container>
  );
};

export default Login;
