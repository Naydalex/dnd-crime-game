import { useState } from 'react';
import { User } from 'lucide-react';
import ResourceCounter from './ResourceCounter';
import InventoryList from './InventoryList';
import CharacteristicsTable from './CharacteristicsTable';

/**
 * Generic, reusable character sheet.
 * All per-character content (name, description, starting inventory,
 * resources, characteristics) is passed in via the `character` prop —
 * see src/data/characters.js. Each concrete page (AngelinaPage, AnnaPage,
 * OlgaPage, YegorPage) is a thin wrapper around this component.
 *
 * All dynamic bits (health / sanity / ammo counters, inventory add/remove)
 * live in local useState here, seeded from the character's starting data.
 */
export default function CharacterPage({ character }) {
  const [resources, setResources] = useState(character.resources);
  const [inventory, setInventory] = useState(character.inventory);

  const updateResource = (key, value) => {
    setResources((prev) =>
      prev.map((r) => (r.key === key ? { ...r, value } : r))
    );
  };

  const addItem = (item) => setInventory((prev) => [...prev, item]);
  const removeItem = (idx) =>
    setInventory((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-32 pt-8">
      {/* Header */}
      <header className="mb-8 border-b-2 border-crimson pb-4">
        <h1 className="font-display text-5xl sm:text-6xl text-bone tracking-wide">
          {character.name}
        </h1>
        <p className="font-body text-crimson-light text-sm sm:text-base mt-1 uppercase tracking-wide">
          {character.tagline}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mb-8">
        {/* Photo placeholder */}
        <div className="aspect-[3/4] w-full max-w-[280px] bg-noir-panel border border-noir-border flex flex-col items-center justify-center gap-2 mx-auto lg:mx-0">
          {character.photoPlaceholder ? (
            <img
              src={character.photoPlaceholder}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <User className="w-16 h-16 text-bone/20" strokeWidth={1} />
              <span className="text-bone/30 text-xs font-body uppercase tracking-widest">
                Фото відсутнє
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="bg-noir-panel border border-noir-border p-5">
          <h2 className="font-display text-xl text-crimson-light mb-2 tracking-wide">
            Досьє
          </h2>
          <p className="font-body text-sm sm:text-base leading-relaxed text-bone/80">
            {character.description}
          </p>
        </div>
      </div>

      {/* Resources */}
      <section className="mb-8">
        <h2 className="font-display text-2xl text-bone mb-3 tracking-wide border-l-4 border-crimson pl-3">
          Ресурси
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resources.map((r) => (
            <ResourceCounter
              key={r.key}
              resource={r}
              onChange={(v) => updateResource(r.key, v)}
            />
          ))}
        </div>
      </section>

      {/* Inventory */}
      <section className="mb-8">
        <h2 className="font-display text-2xl text-bone mb-3 tracking-wide border-l-4 border-crimson pl-3">
          Інвентар
        </h2>
        <div className="bg-noir-panel border border-noir-border p-5">
          <InventoryList items={inventory} onAdd={addItem} onRemove={removeItem} />
        </div>
      </section>

      {/* Characteristics */}
      <section>
        <h2 className="font-display text-2xl text-bone mb-3 tracking-wide border-l-4 border-crimson pl-3">
          Характеристики
        </h2>
        <div className="bg-noir-panel border border-noir-border p-5">
          <CharacteristicsTable characteristics={character.characteristics} />
        </div>
      </section>
    </div>
  );
}
