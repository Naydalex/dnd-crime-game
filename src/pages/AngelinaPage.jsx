import CharacterPage from '../components/CharacterPage';
import { getCharacterById } from '../data/characters';

/**
 * Angelina's character sheet.
 * Health starts at 12, Sanity at 60, Ammo at 6; inventory starts with
 * cigarettes, revolver, $1600, daughter's photo, and a knife — all defined
 * in src/data/characters.js and made dynamic (add/remove, +/- counters)
 * by the shared CharacterPage component via useState.
 */
export default function AngelinaPage() {
  const angelina = getCharacterById('angelina');
  return <CharacterPage character={angelina} />;
}
