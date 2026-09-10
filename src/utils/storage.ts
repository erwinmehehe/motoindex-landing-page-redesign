export function readStored<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(`motoindex:${key}`); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
}

export function writeStored(key: string, value: unknown): boolean {
  try { localStorage.setItem(`motoindex:${key}`, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function downloadText(filename: string, text: string, type = "text/plain") {
  const href = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(href), 1000);
}