import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      {data && data.characters.results.map((character: any) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <img src={character.image} alt={character.name} style={{ width: '100px', height: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default Home;