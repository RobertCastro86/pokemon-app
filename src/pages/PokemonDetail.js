import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../styles/GlobalStyles';
import LoadingSpinner from '../components/LoadingSpinner';

const DetailContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

const PokemonHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
  margin: 0 0 10px 0;
  font-size: 2.5em;
  color: ${props => props.theme.colors.text};
`;

const PokemonNumber = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2em;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const InfoSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 15px;
  }
`;

const TypeBadge = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  text-transform: capitalize;
  font-size: 14px;
  margin-right: 10px;
`;

const AbilityCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;

  h4 {
    text-transform: capitalize;
    margin: 0 0 8px 0;
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
    line-height: 1.4;
  }
`;

const MovesContainer = styled.div`
  grid-column: 1 / -1;
  
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 15px;
  }
`;

const MovesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
`;

const MoveItem = styled.span`
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 8px 12px;
  border-radius: 6px;
  text-transform: capitalize;
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

const BackButton = styled(Button)`
  margin-bottom: 20px;
`;

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        
        // Buscar descrições das habilidades
        const abilitiesWithDescriptions = await Promise.all(
          data.abilities.map(async (ability) => {
            try {
              const abilityResponse = await fetch(ability.ability.url);
              const abilityData = await abilityResponse.json();
              const description = abilityData.effect_entries.find(
                entry => entry.language.name === 'en'
              )?.effect || 'Descrição não disponível';
              
              return {
                name: ability.ability.name,
                description: description
              };
            } catch (error) {
              return {
                name: ability.ability.name,
                description: 'Descrição não disponível'
              };
            }
          })
        );

        setPokemonData({
          ...data,
          abilitiesWithDescriptions
        });
      } catch (error) {
        console.error('Error fetching pokemon detail:', error);
      }
      setLoading(false);
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return (
      <div>
        <BackButton variant="secondary" onClick={() => navigate('/')}>
          ← Voltar
        </BackButton>
        <LoadingSpinner />
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div>
        <BackButton variant="secondary" onClick={() => navigate('/')}>
          ← Voltar
        </BackButton>
        <p>Erro ao carregar dados do Pokemon</p>
      </div>
    );
  }

  return (
    <div>
      <BackButton variant="secondary" onClick={() => navigate('/')}>
        ← Voltar
      </BackButton>
      
      <DetailContainer>
        <PokemonHeader>
          <PokemonImage
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
          <PokemonName>{pokemonData.name}</PokemonName>
          <PokemonNumber>#{pokemonData.id.toString().padStart(3, '0')}</PokemonNumber>
        </PokemonHeader>

        <InfoGrid>
          {/* Tipos */}
          <InfoSection>
            <h3>Tipos</h3>
            <div>
              {pokemonData.types.map((type, index) => (
                <TypeBadge key={index}>
                  {type.type.name}
                </TypeBadge>
              ))}
            </div>
          </InfoSection>

          {/* Habilidades */}
          <InfoSection>
            <h3>Habilidades</h3>
            <div>
              {pokemonData.abilitiesWithDescriptions.map((ability, index) => (
                <AbilityCard key={index}>
                  <h4>{ability.name}</h4>
                  <p>{ability.description}</p>
                </AbilityCard>
              ))}
            </div>
          </InfoSection>

          {/* Movimentos */}
          <MovesContainer>
            <h3>Movimentos ({pokemonData.moves.length})</h3>
            <MovesGrid>
              {pokemonData.moves.slice(0, 20).map((move, index) => (
                <MoveItem key={index}>
                  {move.move.name.replace('-', ' ')}
                </MoveItem>
              ))}
              {pokemonData.moves.length > 20 && (
                <MoveItem style={{ fontStyle: 'italic' }}>
                  +{pokemonData.moves.length - 20} mais...
                </MoveItem>
              )}
            </MovesGrid>
          </MovesContainer>
        </InfoGrid>
      </DetailContainer>
    </div>
  );
};

export default PokemonDetail;