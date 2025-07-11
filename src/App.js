import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { GlobalStyles, Container } from './styles/GlobalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';

const AppContent = () => {
  const theme = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </Container>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;