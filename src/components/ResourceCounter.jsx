import { Plus, Minus } from 'lucide-react';
import Icon from './IconMap';

export default function ResourceCounter({ resource, onChange }) {
  const { label, icon, value, min = 0, max = 999 } = resource;

  const clamp = (v) => Math.min(max, Math.max(min, v));

  return (
    <div className="flex items-center justify-between gap-3 bg-noir-panel-2 border border-noir-border px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <Icon name={icon} className="w-5 h-5 text-crimson-light shrink-0" />
        <span className="font-body text-sm uppercase tracking-wide text-bone/80 truncate">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          aria-label={`Зменшити ${label}`}
          onClick={() => onChange(clamp(value - 1))}
          className="w-7 h-7 flex items-center justify-center bg-noir-black border border-noir-border hover:border-crimson hover:text-crimson-light text-bone/70 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-display text-2xl w-10 text-center text-bone tabular-nums">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Збільшити ${label}`}
          onClick={() => onChange(clamp(value + 1))}
          className="w-7 h-7 flex items-center justify-center bg-noir-black border border-noir-border hover:border-crimson hover:text-crimson-light text-bone/70 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
