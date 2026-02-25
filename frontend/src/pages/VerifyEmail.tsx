import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
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
  text-align: center;
`;

const Title = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: ${props => props.theme.secondaryText};
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const VerifyButton = styled.button`
  background: #FF8C00;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #e67e00;
  }
`;

const VerifyEmail: React.FC = () => {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    setVerifying(true);
    // Mock Verification
    setTimeout(() => {
        setVerifying(false);
        setVerified(true);
        toast.success('Email успешно подтвержден!');
    }, 2000);
  };

  const handleContinue = () => {
      navigate('/chat');
  };

  return (
    <Container>
      <AuthCard>
        {verified ? (
            <>
                <FaCheckCircle size={60} color="#4CAF50" style={{ marginBottom: 20 }} />
                <Title>Email Подтвержден!</Title>
                <Message>Ваш email был успешно подтвержден. Теперь вы можете использовать все функции GryFf.</Message>
                <VerifyButton onClick={handleContinue}>Продолжить</VerifyButton>
            </>
        ) : (
            <>
                <Title>Подтвердите ваш Email</Title>
                <Message>Мы отправили код подтверждения на ваш email. Пожалуйста, нажмите кнопку ниже, чтобы завершить подтверждение.</Message>
                <VerifyButton onClick={handleVerify} disabled={verifying}>
                    {verifying ? <><FaSpinner className="spin" /> Подтверждение...</> : 'Подтвердить сейчас'}
                </VerifyButton>
            </>
        )}
      </AuthCard>
    </Container>
  );
};

export default VerifyEmail;
