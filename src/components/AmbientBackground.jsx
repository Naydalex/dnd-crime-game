import { useMemo } from 'react';

/**
 * Purely decorative, fixed full-viewport background layer:
 * - a slow "breathing" crimson vignette
 * - a handful of drifting dust/ember particles rising past the camera
 * - a faint scanline sweep, like a single spotlight/interrogation lamp
 *
 * Rendered once at the App root, behind all real content (`-z-10`,
 * `pointer-events-none`), so it never intercepts clicks/taps and never
 * affects layout or scroll size.
 */
export default function AmbientBackground() {
  // Generate the particle set once — re-rolling them on every render would
  // restart their animations and look jittery.
  const embers = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 2 + Math.round(Math.random() * 3),
        duration: 14 + Math.round(Math.random() * 14),
        delay: -Math.round(Math.random() * 20),
        drift: Math.round((Math.random() - 0.5) * 60),
        opacity: 0.15 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Breathing vignette */}
      <div className="absolute inset-0 animate-vignette-breathe bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,28,43,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

      {/* Drifting dust / embers */}
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full bg-crimson-light animate-ember-rise"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            '--drift': `${e.drift}px`,
            '--ember-opacity': e.opacity,
          }}
        />
      ))}

      {/* Faint spotlight sweep */}
      <div className="absolute inset-x-0 -top-1/2 h-[60%] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)] animate-spotlight-sweep" />
    </div>
  );
}
