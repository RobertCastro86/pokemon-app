import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Button } from '../styles/GlobalStyles';
import PokemonCard from '../components/PokemonCard';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadMoreContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Home = ({ onSelectPokemon }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemons = async (currentOffset = 0) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${currentOffset}`);
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detail = await detailResponse.json();
          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites.front_default,
            url: pokemon.url
          };
        })
      );

      if (currentOffset === 0) {
        setPokemons(pokemonDetails);
      } else {
        setPokemons(prev => [...prev, ...pokemonDetails]);
      }
      
      setHasMore(data.next !== null);
      setOffset(currentOffset + 10);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchPokemons(offset);
    }
  };

  return (
    <div>
      <Grid>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => onSelectPokemon(pokemon)}
          />
        ))}
      </Grid>

      {loading && <LoadingSpinner />}
      
      {!loading && hasMore && (
        <LoadMoreContainer>
          <Button onClick={loadMore}>
            Carregar mais
          </Button>
        </LoadMoreContainer>
      )}
    </div>
  );
};

export default Home;