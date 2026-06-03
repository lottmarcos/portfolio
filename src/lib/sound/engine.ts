/**
 * Tiny Web Audio sound design. Tones are synthesized at runtime — no audio
 * files, no network payload. Each sound is a short, soft envelope so the
 * interactions feel tactile without being intrusive.
 */
export type SoundName = "enter" | "hover" | "click" | "success" | "toggle";

interface Note {
  freq: number;
  start: number; // seconds, relative to play time
  dur: number; // seconds
}

interface Preset {
  type: OscillatorType;
  gain: number;
  notes: Note[];
}

// Frequencies (Hz) chosen to form a small, pleasant pentatonic palette.
const PRESETS: Record<SoundName, Preset> = {
  hover: {
    type: "triangle",
    gain: 0.05,
    notes: [{ freq: 880, start: 0, dur: 0.06 }],
  },
  click: {
    type: "sine",
    gain: 0.12,
    notes: [
      { freq: 587.33, start: 0, dur: 0.08 },
      { freq: 880, start: 0.045, dur: 0.1 },
    ],
  },
  toggle: {
    type: "triangle",
    gain: 0.09,
    notes: [{ freq: 660, start: 0, dur: 0.08 }],
  },
  success: {
    type: "sine",
    gain: 0.14,
    notes: [
      { freq: 523.25, start: 0, dur: 0.12 },
      { freq: 659.25, start: 0.08, dur: 0.12 },
      { freq: 783.99, start: 0.16, dur: 0.18 },
    ],
  },
  enter: {
    type: "sine",
    gain: 0.08,
    notes: [
      { freq: 220, start: 0, dur: 0.6 },
      { freq: 329.63, start: 0.04, dur: 0.6 },
    ],
  },
};

export function playSound(ctx: AudioContext, name: SoundName): void {
  const preset = PRESETS[name];
  const now = ctx.currentTime;

  // Gentle low-pass keeps the tones from sounding harsh.
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  filter.connect(ctx.destination);

  for (const note of preset.notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = preset.type;
    osc.frequency.value = note.freq;

    const startAt = now + note.start;
    const peak = preset.gain;

    // Fast attack, exponential decay — feels like a soft pluck.
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + note.dur);

    osc.connect(gain);
    gain.connect(filter);

    osc.start(startAt);
    osc.stop(startAt + note.dur + 0.02);
  }
}
