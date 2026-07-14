import { Image as ImageIcon } from 'lucide-react';
import { characters } from '../data/characters';

// A handful of extra placeholder slots beyond the four characters, so the
// gallery reads as a real evidence board rather than an exact 1:1 mirror
// of the character list.
const EXTRA_SLOTS = ['Місце злочину', 'Бар "Лаунж Люсі"', 'Гараж', 'Штаб-квартира'];

export default function GalleryPage() {
  const slots = [...characters.map((c) => c.name), ...EXTRA_SLOTS];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 pt-8">
      <header className="mb-8 border-b-2 border-crimson pb-4">
        <h1 className="font-display text-5xl sm:text-6xl text-bone tracking-wide">
          Галерея
        </h1>
        <p className="font-body text-crimson-light text-sm sm:text-base mt-1 uppercase tracking-wide">
          Дошка доказів
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {slots.map((label) => (
          <div
            key={label}
            className="aspect-square bg-noir-panel border border-noir-border flex flex-col items-center justify-center gap-2 hover:border-crimson transition-colors group"
          >
            <ImageIcon
              className="w-10 h-10 text-bone/15 group-hover:text-crimson-light/60 transition-colors"
              strokeWidth={1}
            />
            <span className="text-bone/40 text-xs font-body uppercase tracking-widest px-2 text-center">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
