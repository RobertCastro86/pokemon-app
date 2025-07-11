import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../styles/GlobalStyles';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Title>🔥 Pokédex</Title>
      <Button onClick={toggleTheme}>
        {isDark ? '☀️ Tema Claro' : '🌙 Tema Escuro'}
      </Button>
    </HeaderContainer>
  );
};

export default Header;