import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.1);
    background-color: #e67e00;
  }

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    bottom: 80px; /* Move up on mobile to avoid covering bottom navs/inputs */
    width: 40px;
    height: 40px;
  }
`;

const GlobalThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} title={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}>
      {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
    </ToggleButton>
  );
};

export default GlobalThemeToggle;
