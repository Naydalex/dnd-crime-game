import { useEffect, useRef, useState } from 'react';
import { Dices, History, Volume2, VolumeX, X } from 'lucide-react';
import { useDice } from '../context/DiceContext';
import { playTick, playResult } from '../utils/sound';

/**
 * Global floating dice roller.
 * Stays fixed in the corner of the viewport, scrolls with nothing (fixed
 * positioning), and is mounted once at the App level so its state
 * (lastRoll / history) is shared across every page except the Gallery.
 *
 * Also drives two small extras, both entirely local to this widget:
 *  - synthesized sound effects (rapid clatter while rolling, a landing
 *    chime once it settles) — mutable, toggle-able, off by a single tap;
 *  - a tappable "Історія" panel listing the last 20 rolls with a rough
 *    colour-coded read on how good each one was (lower is generally
 *    better throughout this system, though true success/fail always
 *    depends on the specific characteristic's threshold).
 */
export default function DiceRoller() {
  const { lastRoll, rolling, history, rollDice } = useDice();

  const [soundOn, setSoundOn] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);

  // While the dice context is "rolling", flash rapid random numbers —
  // a little slot-machine flourish before the real result lands. Purely
  // a display-layer effect; the actual rolled value still comes from
  // DiceContext once and only once.
  const [flash, setFlash] = useState(null);
  useEffect(() => {
    if (!rolling) return undefined;
    const id = setInterval(() => {
      setFlash(Math.floor(Math.random() * 100) + 1);
      if (soundOn) playTick();
    }, 45);
    return () => clearInterval(id);
  }, [rolling, soundOn]);

  // Play a landing chime exactly once, the moment a roll finishes.
  const prevRollingRef = useRef(rolling);
  useEffect(() => {
    if (prevRollingRef.current && !rolling && soundOn && lastRoll !== null) {
      playResult(lastRoll);
    }
    prevRollingRef.current = rolling;
  }, [rolling, lastRoll, soundOn]);

  const displayValue = rolling ? flash ?? '--' : lastRoll === null ? '--' : lastRoll;

  // Rough visual "how good was that roll" banding — lower is better
  // throughout this system, so this is a general read, not a pass/fail
  // against any one characteristic's actual threshold.
  const qualityClass = (val) => {
    if (val <= 20) return 'text-green-400 border-green-800/60 bg-green-950/20';
    if (val <= 50) return 'text-amber-300 border-amber-800/50 bg-amber-950/15';
    return 'text-crimson-light border-crimson/40 bg-crimson-dark/10';
  };

  return (
    <div
      className="fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-2"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
      }}
    >
      {/* Expandable roll history panel */}
      {historyOpen && (
        <div className="w-56 max-h-72 overflow-y-auto bg-noir-panel border-2 border-crimson/70 shadow-[0_0_25px_rgba(185,28,43,0.35)] mb-1">
          <div className="flex items-center justify-between px-3 py-2 border-b border-noir-border sticky top-0 bg-noir-panel">
            <span className="font-display text-sm tracking-wide text-bone/80 uppercase">
              Історія кидків
            </span>
            <button
              type="button"
              onClick={() => setHistoryOpen(false)}
              aria-label="Закрити історію"
              className="text-bone/50 hover:text-bone transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {history.length === 0 ? (
            <p className="px-3 py-3 text-xs text-bone/40 font-body">
              Ще не було жодного кидка.
            </p>
          ) : (
            <ul className="flex flex-col">
              {history.map((val, i) => (
                <li
                  key={`${i}-${val}`}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm font-body border-b border-noir-border/40 last:border-b-0 ${
                    i === 0 ? 'bg-noir-black/30' : ''
                  }`}
                >
                  <span className="text-bone/40 text-xs">
                    {i === 0 ? 'Останній' : `#${history.length - i}`}
                  </span>
                  <span
                    className={`font-display text-base tabular-nums px-2 border ${qualityClass(val)}`}
                  >
                    {val}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 bg-noir-panel border-2 border-crimson shadow-[0_0_25px_rgba(185,28,43,0.35)] px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex flex-col items-center justify-center min-w-[3rem]">
          <span className="text-[9px] uppercase tracking-[0.2em] text-bone/50 font-body">
            Кубик
          </span>
          <span
            className={`font-display text-3xl sm:text-4xl leading-none text-crimson-light tabular-nums ${
              rolling ? 'blur-[0.5px]' : ''
            }`}
          >
            {displayValue}
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

        <div className="flex flex-col gap-1 border-l border-noir-border pl-2 ml-1">
          <button
            type="button"
            onClick={() => setHistoryOpen((o) => !o)}
            aria-label={historyOpen ? 'Закрити історію кидків' : 'Показати історію кидків'}
            aria-pressed={historyOpen}
            className={`p-1 transition-colors ${historyOpen ? 'text-crimson-light' : 'text-bone/50 hover:text-bone'}`}
          >
            <History className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            aria-label={soundOn ? 'Вимкнути звук кубика' : 'Увімкнути звук кубика'}
            aria-pressed={soundOn}
            className={`p-1 transition-colors ${soundOn ? 'text-bone/50 hover:text-bone' : 'text-crimson-light'}`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
