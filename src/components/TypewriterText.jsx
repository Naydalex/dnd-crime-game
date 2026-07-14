import { useEffect, useState } from 'react';

/**
 * Types `text` out one character at a time, like a detective's case-file
 * report clacking out on a typewriter, with a blinking cursor at the end.
 * Restarts whenever `text` changes (e.g. switching characters, since the
 * parent page is remounted with a fresh `key` per character in App.jsx).
 */
export default function TypewriterText({ text, speed = 28, className = '' }) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  const done = shown.length >= text.length;

  return (
    <span className={className}>
      {shown}
      <span className={`inline-block w-[0.5em] -mb-[0.1em] ${done ? 'animate-pulse' : ''}`}>
        ▍
      </span>
    </span>
  );
}
