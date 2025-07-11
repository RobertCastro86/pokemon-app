import React from 'react';
import styled from 'styled-components';
import { Card } from '../styles/GlobalStyles';

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const PokemonName = styled.h3`
  margin: 0;
  text-transform: capitalize;
  color: ${props => props.theme.colors.text};
`;

const PokemonNumber = styled.p`
  margin: 5px 0 0 0;
  color: ${props => props.theme.colors.textSecondary};
`;

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <Card onClick={onClick}>
      <PokemonImage src={pokemon.image} alt={pokemon.name} />
      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonNumber>#{pokemon.id.toString().padStart(3, '0')}</PokemonNumber>
    </Card>
  );
};

export default PokemonCard;