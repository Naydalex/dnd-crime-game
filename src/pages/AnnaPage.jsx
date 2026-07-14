import CharacterPage from '../components/CharacterPage';
import { getCharacterById } from '../data/characters';

export default function AnnaPage() {
  const anna = getCharacterById('anna');
  return <CharacterPage character={anna} />;
}
