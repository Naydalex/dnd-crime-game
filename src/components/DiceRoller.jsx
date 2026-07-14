import { Dices } from 'lucide-react';
import { useDice } from '../context/DiceContext';

/**
 * Global floating dice roller.
 * Stays fixed in the corner of the viewport, scrolls with nothing (fixed
 * positioning), and is mounted once at the App level so its state
 * (lastRoll / history) is shared across every page except the Gallery.
 */
export default function DiceRoller() {
  const { lastRoll, rolling, history, rollDice } = useDice();

  return (
    <div
      className="fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-2"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
      }}
    >
      {history.length > 1 && (
        <div className="hidden sm:flex gap-1 mb-1">
          {history.slice(1, 6).map((val, i) => (
            <span
              key={i}
              className="text-[10px] font-display tracking-wider text-bone/40 bg-noir-panel/80 border border-noir-border px-1.5 py-0.5"
            >
              {val}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 bg-noir-panel border-2 border-crimson shadow-[0_0_25px_rgba(185,28,43,0.35)] px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex flex-col items-center justify-center min-w-[3rem]">
          <span className="text-[9px] uppercase tracking-[0.2em] text-bone/50 font-body">
            Кубик
          </span>
          <span
            className={`font-display text-3xl sm:text-4xl leading-none text-crimson-light ${
              rolling ? 'animate-dice-spin' : ''
            }`}
          >
            {lastRoll === null ? '--' : lastRoll}
          </span>
        </div>

        <button
          type="button"
          onClick={rollDice}
          disabled={rolling}
          aria-label="Кинути кубик"
          className="group flex items-center gap-2 bg-crimson hover:bg-crimson-light active:bg-crimson-dark disabled:opacity-60 disabled:cursor-not-allowed text-bone font-display tracking-wider text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2.5 transition-colors uppercase"
        >
          <Dices
            className={`w-4 h-4 sm:w-5 sm:h-5 ${rolling ? 'animate-dice-spin' : 'group-hover:rotate-12 transition-transform'}`}
          />
          <span className="hidden sm:inline">Кинути кубик</span>
        </button>
      </div>
    </div>
  );
}
