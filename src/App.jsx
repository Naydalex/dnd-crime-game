import { useState } from 'react';
import { Menu, X, Skull } from 'lucide-react';
import { DiceProvider } from './context/DiceContext';
import DiceRoller from './components/DiceRoller';
import AmbientBackground from './components/AmbientBackground';
import AngelinaPage from './pages/AngelinaPage';
import AnnaPage from './pages/AnnaPage';
import OlgaPage from './pages/OlgaPage';
import YegorPage from './pages/YegorPage';
import GalleryPage from './pages/GalleryPage';

const NAV_ITEMS = [
  { id: 'angelina', label: 'Ангеліна', Component: AngelinaPage },
  { id: 'anna', label: 'Анна', Component: AnnaPage },
  { id: 'olga', label: 'Ольга', Component: OlgaPage },
  { id: 'yegor', label: 'Єгор', Component: YegorPage },
  { id: 'gallery', label: 'Галерея', Component: GalleryPage },
];

export default function App() {
  const [activeId, setActiveId] = useState('angelina');
  const [menuOpen, setMenuOpen] = useState(false);

  const active = NAV_ITEMS.find((n) => n.id === activeId) ?? NAV_ITEMS[0];
  const ActiveComponent = active.Component;
  const isGallery = active.id === 'gallery';

  const selectPage = (id) => {
    setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <DiceProvider>
      <AmbientBackground />
      <div className="min-h-screen flex flex-col">
        {/* Top navigation */}
        <nav className="sticky top-0 z-40 bg-noir-black/95 backdrop-blur border-b border-noir-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 shrink-0">
              <Skull className="w-6 h-6 text-crimson" strokeWidth={1.5} />
              <span className="font-display text-xl sm:text-2xl tracking-wider text-bone neon-flicker">
                CRIMSON <span className="text-crimson">FILES</span>
              </span>
            </div>

            {/* Desktop menu */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectPage(item.id)}
                    className={`font-display tracking-wide text-lg px-4 py-2 uppercase transition-colors border-b-2 ${
                      activeId === item.id
                        ? 'text-crimson-light border-crimson'
                        : 'text-bone/60 border-transparent hover:text-bone hover:border-noir-border'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden text-bone"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Меню"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu panel */}
          {menuOpen && (
            <ul className="md:hidden flex flex-col border-t border-noir-border">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectPage(item.id)}
                    className={`w-full text-left font-display tracking-wide text-lg px-4 py-3 uppercase transition-colors ${
                      activeId === item.id
                        ? 'text-crimson-light bg-noir-panel'
                        : 'text-bone/60'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Active page */}
        <main className="flex-1">
          <ActiveComponent key={active.id} />
        </main>

        {/* Global dice roller — visible on every page except the Gallery */}
        {!isGallery && <DiceRoller />}
      </div>
    </DiceProvider>
  );
}
