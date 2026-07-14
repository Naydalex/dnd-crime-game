import { useState, useRef } from 'react';
import { User } from 'lucide-react';
import ResourceCounter from './ResourceCounter';
import InventoryList from './InventoryList';
import CharacteristicsTable from './CharacteristicsTable';
import TypewriterText from './TypewriterText';

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
  const photoRef = useRef(null);

  const updateResource = (key, value) => {
    setResources((prev) =>
      prev.map((r) => (r.key === key ? { ...r, value } : r))
    );
  };

  const addItem = (item) => setInventory((prev) => [...prev, item]);
  const removeItem = (idx) =>
    setInventory((prev) => prev.filter((_, i) => i !== idx));

  // Subtle "pinned evidence photo" tilt that follows the cursor — applied
  // via direct style mutation (not React state) so it stays smooth and
  // never triggers a re-render on every mouse pixel.
  const handlePhotoMove = (e) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) scale(1.03)`;
  };
  const resetPhotoTilt = () => {
    const el = photoRef.current;
    if (el) el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-32 pt-8">
      {/* Header */}
      <header className="mb-8 border-b-2 border-crimson pb-4">
        <h1 className="font-display text-5xl sm:text-6xl text-bone tracking-wide">
          {character.name}
        </h1>
        <p className="font-body text-crimson-light text-sm sm:text-base mt-1 uppercase tracking-wide min-h-[1.5em]">
          <TypewriterText text={character.tagline} />
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mb-8">
        {/* Photo placeholder — tilts gently toward the cursor, like a pinned evidence photo */}
        <div
          ref={photoRef}
          onMouseMove={handlePhotoMove}
          onMouseLeave={resetPhotoTilt}
          style={{ transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 0.15s ease-out' }}
          className="aspect-[3/4] w-full max-w-[280px] bg-noir-panel border border-noir-border flex flex-col items-center justify-center gap-2 mx-auto lg:mx-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          {character.photoPlaceholder ? (
            <img
              src={character.photoPlaceholder}
              alt={character.name}
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <>
              <User className="w-16 h-16 text-bone/20 pointer-events-none" strokeWidth={1} />
              <span className="text-bone/30 text-xs font-body uppercase tracking-widest pointer-events-none">
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
