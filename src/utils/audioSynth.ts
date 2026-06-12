// Web Audio API Synthesizer to procedurally play beautiful romantic backing melodies/chimes
// Safely handled for modern browser autoplay policies.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  return audioCtx;
}

// Play a celestial chime chime chord
export function playHeartChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major / A minor sweet notes

  frequencies.forEach((freq, index) => {
    const playTime = now + index * 0.12;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, playTime);

    // Warm, acoustic-guitar like decay
    gain.gain.setValueAtTime(0, playTime);
    gain.gain.linearRampToValueAtTime(0.15, playTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, playTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(playTime);
    osc.stop(playTime + 3);
  });
}

// Loop an ambient peaceful chime flow in background (as romantic lullaby)
let schedulerId: number | null = null;
let currentChordIndex = 0;

const chords = [
  [146.83, 220.00, 329.63, 440.00], // Dsus2 - peaceful
  [130.81, 196.00, 329.63, 392.00], // Cmaj7 - loving
  [164.81, 246.94, 329.63, 440.00], // Em7 - deep
  [130.81, 196.00, 349.23, 523.25], // Fadd9 - heartwarming
];

export function startAmbientLullaby(isPlaying: boolean, volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (!isPlaying) {
    stopAmbientLullaby();
    return;
  }

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const loop = () => {
    const now = ctx.currentTime;
    const chord = chords[currentChordIndex];
    currentChordIndex = (currentChordIndex + 1) % chords.length;

    // Play chordnotes staggered
    chord.forEach((freq, index) => {
      const playTime = now + index * 0.4;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle"; // Soft, reed-like
      osc.frequency.setValueAtTime(freq, playTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 2, playTime); // Sparkle overtone

      gain.gain.setValueAtTime(0, playTime);
      gain.gain.linearRampToValueAtTime(volume * 0.08, playTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, playTime + 4.5);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(playTime);
      osc2.start(playTime);

      osc.stop(playTime + 5);
      osc2.stop(playTime + 5);
    });

    schedulerId = window.setTimeout(loop, 4000);
  };

  loop();
}

export function stopAmbientLullaby() {
  if (schedulerId !== null) {
    clearTimeout(schedulerId);
    schedulerId = null;
  }
}
