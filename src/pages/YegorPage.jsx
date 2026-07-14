import CharacterPage from '../components/CharacterPage';
import { getCharacterById } from '../data/characters';

export default function YegorPage() {
  const yegor = getCharacterById('yegor');
  return <CharacterPage character={yegor} />;
}
