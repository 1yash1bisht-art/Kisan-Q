// Web Audio API helper for realistic DTMF telephone touch-tones, ringing, and speech prompt chimes

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function unlockAudio(): void {
  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    // Also unlock speech synthesis if browser requires synchronous gesture
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  } catch (e) {
    console.warn('Audio unlock warning:', e);
  }
}

// DTMF standard frequencies
const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

export function playDtmfTone(key: string, duration = 0.16) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = DTMF_FREQS[key] || [800, 1200];
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freqs[0], now);
    osc2.frequency.setValueAtTime(freqs[1], now);

    gainNode.gain.setValueAtTime(0.14, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (err) {
    console.warn('DTMF audio error:', err);
  }
}

export function playPhoneRing(duration = 0.7) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(400, now);
    osc2.frequency.setValueAtTime(450, now);

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (err) {
    console.warn('Phone ring audio error:', err);
  }
}

export function playNotificationBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (err) {
    console.warn('Beep error:', err);
  }
}

export function playPromptMelody() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 cheerful chime
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    });
  } catch (e) {
    // Ignore audio error
  }
}
