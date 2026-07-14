import { useDice } from '../context/DiceContext';

/**
 * Renders the 8 characteristics with their three success thresholds.
 * Rule: roll a d100 (1-100), lower is better. A tier succeeds when the
 * character's threshold for that tier is >= the rolled number.
 * Hard = narrowest window (best success), Easy = widest window.
 *
 * When a dice result exists (from the global DiceRoller), the table
 * highlights the best tier that roll would achieve for each row.
 *
 * Two layouts are shipped: a stacked card list for narrow (phone) screens
 * where a 4-column table simply doesn't fit, and the full table from the
 * `sm` breakpoint up.
 */
export default function CharacteristicsTable({ characteristics }) {
  const { lastRoll } = useDice();

  const tierFor = (row) => {
    if (lastRoll === null) return null;
    if (lastRoll <= row.hard) return 'hard';
    if (lastRoll <= row.medium) return 'medium';
    if (lastRoll <= row.easy) return 'easy';
    return 'fail';
  };

  const cellClass = (tierKey, achieved) => {
    const base =
      'text-center font-display text-lg py-2 border border-noir-border transition-colors';
    if (achieved === tierKey) {
      return `${base} bg-crimson text-bone border-crimson`;
    }
    return `${base} text-bone/70 bg-noir-black/40`;
  };

  const badgeClass = (tierKey, achieved) => {
    const base =
      'flex-1 flex flex-col items-center py-2 border transition-colors';
    if (achieved === tierKey) {
      return `${base} bg-crimson text-bone border-crimson`;
    }
    return `${base} text-bone/70 bg-noir-black/40 border-noir-border`;
  };

  return (
    <div>
      {/* Phone layout: stacked cards, one per characteristic */}
      <div className="flex flex-col gap-3 sm:hidden">
        {characteristics.map((row) => {
          const achieved = tierFor(row);
          return (
            <div key={row.name} className="bg-noir-black/30 border border-noir-border p-2">
              <p className="font-body text-sm text-bone mb-2 px-1">{row.name}</p>
              <div className="flex gap-2">
                <div className={badgeClass('hard', achieved)}>
                  <span className="text-[9px] uppercase tracking-wider text-crimson-light/80 font-body">
                    Складний
                  </span>
                  <span className="font-display text-lg leading-tight">{row.hard}</span>
                </div>
                <div className={badgeClass('medium', achieved)}>
                  <span className="text-[9px] uppercase tracking-wider text-bone/50 font-body">
                    Середній
                  </span>
                  <span className="font-display text-lg leading-tight">{row.medium}</span>
                </div>
                <div className={badgeClass('easy', achieved)}>
                  <span className="text-[9px] uppercase tracking-wider text-bone/40 font-body">
                    Легкий
                  </span>
                  <span className="font-display text-lg leading-tight">{row.easy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet/desktop layout: full table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse min-w-[480px]">
          <thead>
            <tr>
              <th className="text-left font-body text-xs uppercase tracking-[0.15em] text-bone/50 pb-2 pr-2">
                Характеристика
              </th>
              <th className="font-body text-xs uppercase tracking-[0.15em] text-crimson-light pb-2 px-1">
                Складний
              </th>
              <th className="font-body text-xs uppercase tracking-[0.15em] text-bone/60 pb-2 px-1">
                Середній
              </th>
              <th className="font-body text-xs uppercase tracking-[0.15em] text-bone/40 pb-2 px-1">
                Легкий
              </th>
            </tr>
          </thead>
          <tbody>
            {characteristics.map((row) => {
              const achieved = tierFor(row);
              return (
                <tr key={row.name}>
                  <td className="font-body text-sm text-bone py-2 pr-2 border-t border-noir-border/60 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className={cellClass('hard', achieved)}>{row.hard}</td>
                  <td className={cellClass('medium', achieved)}>{row.medium}</td>
                  <td className={cellClass('easy', achieved)}>{row.easy}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {lastRoll !== null && (
        <p className="text-xs text-bone/40 font-body mt-3">
          Останній кидок: <span className="text-crimson-light font-semibold">{lastRoll}</span>.
          Підсвічена клітинка/бейдж — найкращий рівень успіху, якого досягнуто для кожної характеристики.
        </p>
      )}
    </div>
  );
}
