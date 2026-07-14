/**
 * Tiny self-contained sound effects for the dice roller — synthesized on
 * the fly with the Web Audio API (no external audio files to fetch/ship).
 * Every call is wrapped in try/catch and fails silently: some browsers
 * block audio until a user gesture, and the very first click that starts
 * a roll IS that gesture, so in practice this works everywhere that matters.
 */

let audioCtx = null;

function getCtx() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

/** Short dry click — played on every rapid "slot machine" flash while rolling. */
export function playTick() {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 170 + Math.random() * 70;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Audio unavailable/blocked — ignore, the roll still works fine silently.
  }
}

/**
 * Landing chime once the dice settles. Since "success" only has meaning
 * relative to a specific characteristic's threshold (not the raw roll
 * alone), this maps tone purely off the roll value itself: lower rolls
 * (generally better throughout this system) land brighter and higher,
 * higher rolls land lower and duller.
 */
export function playResult(value) {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const brightness = 1 - Math.min(Math.max(value, 1), 100) / 100; // 0..1, higher = better roll
    const startFreq = 220 + brightness * 340;
    const endFreq = startFreq * (1.35 + brightness * 0.4);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.16);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // Audio unavailable/blocked — ignore.
  }
}
