import { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { characters } from '../data/characters';
import { EXTRA_GALLERY_SLOTS } from '../data/gallery';

/**
 * "Evidence board" gallery. Character tiles automatically reuse whatever
 * photo is set on that character in characters.js (photoPlaceholder) — add
 * a photo there once and it shows up both on the character page and here.
 * Extra location tiles come from src/data/gallery.js.
 *
 * A "flashlight" follows the pointer over the board — the rest of the
 * grid dims, like scanning evidence photos in a dark room. Works with a
 * mouse (hover) and, via touchmove, by dragging a finger across the
 * board on phones/tablets too.
 */
export default function GalleryPage() {
  const overlayRef = useRef(null);
  const boardRef = useRef(null);

  const slots = [
    ...characters.map((c) => ({ id: c.id, label: c.name, photo: c.photoPlaceholder })),
    ...EXTRA_GALLERY_SLOTS,
  ];

  const moveFlashlightTo = (clientX, clientY) => {
    if (!boardRef.current || !overlayRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    overlayRef.current.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, transparent 0%, rgba(5,5,8,0.82) 70%)`;
  };

  const handleMouseMove = (e) => moveFlashlightTo(e.clientX, e.clientY);
  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.background = 'transparent';
  };

  // Touch devices: drag a finger across the board to sweep the flashlight.
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) moveFlashlightTo(touch.clientX, touch.clientY);
  };
  const handleTouchEnd = handleMouseLeave;

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

      <div
        ref={boardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="relative aspect-square bg-noir-panel border border-noir-border overflow-hidden group hover:border-crimson transition-colors"
            >
              {slot.photo ? (
                <img
                  src={slot.photo}
                  alt={slot.label}
                  className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <ImageIcon
                    className="w-10 h-10 text-bone/15 group-hover:text-crimson-light/60 transition-colors"
                    strokeWidth={1}
                  />
                </div>
              )}
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2 pt-6 pb-2 text-bone/85 text-xs font-body uppercase tracking-widest text-center">
                {slot.label}
              </span>
            </div>
          ))}
        </div>

        {/* Flashlight overlay — follows mouse hover or a dragged finger */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none transition-[background] duration-75 ease-out"
        />
      </div>
    </div>
  );
}
