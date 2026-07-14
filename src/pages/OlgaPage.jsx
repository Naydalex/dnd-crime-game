import CharacterPage from '../components/CharacterPage';
import { getCharacterById } from '../data/characters';

export default function OlgaPage() {
  const olga = getCharacterById('olga');
  return <CharacterPage character={olga} />;
}
