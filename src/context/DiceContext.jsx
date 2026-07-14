import { createContext, useContext, useState, useCallback } from 'react';

const DiceContext = createContext(null);

export function DiceProvider({ children }) {
  const [lastRoll, setLastRoll] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const rollDice = useCallback(() => {
    setRolling(true);
    // Small delay purely for the spin animation, then commit the result.
    window.setTimeout(() => {
      const result = Math.floor(Math.random() * 100) + 1;
      setLastRoll(result);
      setHistory((h) => [result, ...h].slice(0, 20));
      setRolling(false);
    }, 400);
  }, []);

  return (
    <DiceContext.Provider value={{ lastRoll, rolling, history, rollDice }}>
      {children}
    </DiceContext.Provider>
  );
}

export function useDice() {
  const ctx = useContext(DiceContext);
  if (!ctx) throw new Error('useDice must be used within a DiceProvider');
  return ctx;
}
