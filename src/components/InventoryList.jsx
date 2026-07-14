import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Icon from './IconMap';
import { guessInventoryIcon } from '../data/characters';

export default function InventoryList({ items, onAdd, onRemove }) {
  const [draft, setDraft] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft('');
  };

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {items.length === 0 && (
          <li className="text-bone/40 text-sm italic font-body py-2">
            Інвентар порожній.
          </li>
        )}
        {items.map((item, idx) => (
          <li
            key={`${item}-${idx}`}
            className="flex items-center justify-between gap-3 bg-noir-panel-2 border border-noir-border px-3 py-2 group"
          >
            <span className="flex items-center gap-2 min-w-0">
              <Icon
                name={guessInventoryIcon(item)}
                className="w-4 h-4 text-crimson-light shrink-0"
              />
              <span className="font-body text-sm text-bone/90 truncate">
                {item}
              </span>
            </span>
            <button
              type="button"
              aria-label={`Видалити ${item}`}
              onClick={() => onRemove(idx)}
              className="text-bone/30 hover:text-crimson-light transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="flex gap-2 pt-1">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Новий предмет..."
          className="flex-1 min-w-0 bg-noir-black border border-noir-border focus:border-crimson outline-none px-3 py-2 text-sm font-body text-bone placeholder:text-bone/30"
        />
        <button
          type="submit"
          className="flex items-center gap-1 bg-crimson hover:bg-crimson-light text-bone px-3 py-2 text-sm font-display tracking-wide uppercase transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Додати</span>
        </button>
      </form>
    </div>
  );
}
