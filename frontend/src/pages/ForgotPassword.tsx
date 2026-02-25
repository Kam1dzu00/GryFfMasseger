import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
`;

const Title = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.secondaryText};
  margin-bottom: 30px;
  font-size: 14px;
  text-align: center;
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
  transition: background 0.2s;

  &:hover {
    background: #e67e00;
  }
`;

const BackLink = styled.div`
  margin-top: 20px;
  color: ${props => props.theme.secondaryText};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call
    setTimeout(() => {
        setLoading(false);
        toast.success('Ссылка для сброса пароля отправлена на ваш email!');
        navigate('/login');
    }, 1500);
  };

  return (
    <Container>
      <AuthCard>
        <Title>Сброс пароля</Title>
        <Subtitle>Введите ваш email, и мы отправим вам ссылку для сброса пароля.</Subtitle>

        <Form onSubmit={handleSubmit}>
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

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить ссылку'}
          </SubmitButton>
        </Form>
        
        <BackLink onClick={() => navigate('/login')}>
            <FaArrowLeft /> Вернуться ко входу
        </BackLink>
      </AuthCard>
    </Container>
  );
};

export default ForgotPassword;
