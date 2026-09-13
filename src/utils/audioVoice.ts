// Instant-Response Web Speech & Audio Engine for KisanQ IVR Helpline
// Eliminates first-time voice latency and guarantees immediate playback on the first attempt

import { Language } from '../types';
import { unlockAudio, playPromptMelody } from './audio';

// BCP-47 language tags for Web Speech API
export function getSpeechSynthesisLangTag(lang: Language): string {
  switch (lang) {
    case 'en': return 'en-IN';
    case 'hi': return 'hi-IN';
    case 'pa': return 'pa-IN';
    case 'gu': return 'gu-IN';
    case 'mr': return 'mr-IN';
    case 'bn': return 'bn-IN';
    case 'te': return 'te-IN';
    case 'ta': return 'ta-IN';
    case 'kn': return 'kn-IN';
    case 'ne': return 'ne-NP';
    case 'or': return 'hi-IN';
    case 'gar': return 'hi-IN';
    case 'kum': return 'hi-IN';
    default: return 'hi-IN';
  }
}

// Global voice cache & state
let cachedVoices: SpeechSynthesisVoice[] = [];
let activeUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: any = null;
let isSpeakingState = false;

// Preload voices immediately on module load
export function initVoiceEngine(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      try {
        const updated = window.speechSynthesis.getVoices();
        if (updated && updated.length > 0) {
          cachedVoices = updated;
        }
      } catch (e) {
        // ignore
      }
    };
  } catch (e) {
    // ignore
  }
}

// Auto-run on load
if (typeof window !== 'undefined') {
  initVoiceEngine();
}

export function warmupVoiceEngine(): void {
  unlockAudio();
  initVoiceEngine();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
      // A quick empty utterance unpauses Chrome's internal thread without making audible sound
      if (!window.speechSynthesis.speaking) {
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
      }
    } catch (e) {
      // ignore
    }
  }
}

function getBestVoiceForLang(langTag: string, lang: Language): SpeechSynthesisVoice | null {
  if (!cachedVoices || cachedVoices.length === 0) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices();
    }
  }

  if (!cachedVoices || cachedVoices.length === 0) return null;

  // 1. Exact match by langTag (e.g. 'en-IN', 'hi-IN', 'pa-IN')
  const exact = cachedVoices.find(v => v.lang.toLowerCase().replace('_', '-') === langTag.toLowerCase());
  if (exact) return exact;

  // 2. Prefix match (e.g. 'en', 'hi', 'pa')
  const prefix = langTag.split('-')[0].toLowerCase();
  const prefixMatch = cachedVoices.find(v => v.lang.toLowerCase().startsWith(prefix));
  if (prefixMatch) return prefixMatch;

  // 3. Match by regional name heuristics
  if (lang === 'en') {
    const indianEn = cachedVoices.find(v => v.name.toLowerCase().includes('india') && v.lang.startsWith('en'));
    if (indianEn) return indianEn;
    const anyEn = cachedVoices.find(v => v.lang.startsWith('en'));
    if (anyEn) return anyEn;
  } else {
    const hindiVoice = cachedVoices.find(v => v.name.toLowerCase().includes('hindi') || v.lang.startsWith('hi'));
    if (hindiVoice) return hindiVoice;
  }

  return cachedVoices[0] || null;
}

function stopChromeKeepAlive() {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

function startChromeKeepAlive() {
  stopChromeKeepAlive();
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  // Chrome auto-pauses utterances after 10-15s; pulsing pause/resume keeps speech alive
  keepAliveTimer = setInterval(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }
  }, 5000);
}

export function stopAllSpeech(): void {
  stopChromeKeepAlive();
  isSpeakingState = false;

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
  activeUtterance = null;
  if (typeof window !== 'undefined') {
    (window as any).__kisanqUtterance = null;
  }
}

export interface PlaySpeechCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  onAudioEngineUsed?: (engine: 'speech_synthesis') => void;
}

/**
 * High-performance, instant-response IVR voice engine.
 * Fires instantly on the very first user interaction without network latency.
 */
export async function playIvrVoice(
  text: string,
  lang: Language,
  callbacks?: PlaySpeechCallbacks
): Promise<void> {
  // Cancel any currently playing speech
  stopAllSpeech();
  unlockAudio();

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    // Fallback: pleasant chime tone if browser does not support Web Speech
    playPromptMelody();
    callbacks?.onEnd?.();
    return;
  }

  return new Promise((resolve) => {
    // Chromium bug workaround: when cancel() is called, Chromium's internal queue needs a tiny 25ms tick
    // before speak() to avoid discarding the newly queued utterance
    setTimeout(() => {
      try {
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(text);
        activeUtterance = utterance;
        // Keep reference in window to prevent V8 garbage collector from aborting speech
        (window as any).__kisanqUtterance = utterance;

        const langTag = getSpeechSynthesisLangTag(lang);
        utterance.lang = langTag;
        utterance.rate = lang === 'en' ? 1.0 : 0.96;
        utterance.pitch = 1.0;

        const voice = getBestVoiceForLang(langTag, lang);
        if (voice) {
          utterance.voice = voice;
        }

        let ended = false;
        const finish = (success: boolean) => {
          if (ended) return;
          ended = true;
          stopChromeKeepAlive();
          isSpeakingState = false;
          activeUtterance = null;
          if (typeof window !== 'undefined') {
            (window as any).__kisanqUtterance = null;
          }
          if (success) {
            callbacks?.onEnd?.();
          } else {
            callbacks?.onError?.(new Error('Speech cancelled or interrupted'));
          }
          resolve();
        };

        utterance.onstart = () => {
          isSpeakingState = true;
          startChromeKeepAlive();
          callbacks?.onStart?.();
          callbacks?.onAudioEngineUsed?.('speech_synthesis');
        };

        utterance.onend = () => {
          finish(true);
        };

        utterance.onerror = (e) => {
          // 'canceled' or 'interrupted' is normal when user presses another key
          if (e.error === 'canceled' || e.error === 'interrupted') {
            finish(false);
            return;
          }
          console.warn('Speech synthesis error:', e.error);
          playPromptMelody();
          finish(false);
        };

        // Ensure synthesis is not stuck in paused state
        window.speechSynthesis.speak(utterance);
        window.speechSynthesis.resume();

        // Safety fallback watchdog (4s): only triggers if synthesis failed to start completely
        setTimeout(() => {
          if (!isSpeakingState && !ended && window.speechSynthesis.speaking === false) {
            console.warn('SpeechSynthesis did not start, falling back to chime tone');
            playPromptMelody();
            finish(false);
          }
        }, 4000);

      } catch (err) {
        console.warn('Speech synthesis exception:', err);
        playPromptMelody();
        resolve();
      }
    }, 25);
  });
}
