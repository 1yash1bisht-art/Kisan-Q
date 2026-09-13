export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = window.localStorage.getItem(key);
    if (!item || item === 'undefined' || item === 'null') return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`[KisanQ Storage] Failed to parse key "${key}", using fallback.`, e);
    return fallback;
  }
}

export function safeGetString(key: string, fallback: string): string {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = window.localStorage.getItem(key);
    return item || fallback;
  } catch (e) {
    return fallback;
  }
}

export function safeSetStorage(key: string, value: any): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`[KisanQ Storage] Failed to write key "${key}":`, e);
  }
}

export function safeRemoveStorage(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (e) {
    console.warn(`[KisanQ Storage] Failed to remove key "${key}":`, e);
  }
}
