import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "./components/icons";
import { catalogById } from "./catalog";
import { readStored, writeStored } from "./utils/storage";

type Toast = { id: number; message: string; tone: "dark" | "red" };
type AppState = {
  compareIds: string[]; toggleCompare: (id: string) => void; setComparison: (ids: string[]) => void;
  savedIds: string[]; toggleSaved: (id: string) => void;
  bookmarks: string[]; toggleBookmark: (path: string) => void;
  recentIds: string[]; recordView: (id: string) => void;
  clearResearch: () => boolean;
  filter: string; setFilter: (value: string) => void;
  notify: (message: string, tone?: Toast["tone"]) => void;
};
const AppContext = createContext<AppState | null>(null);
export function useApp() { const value = useContext(AppContext); if (!value) throw new Error("AppProvider required"); return value; }
const validBikes = (value: unknown) => Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === "string" && catalogById.has(id)))] : [];

export function AppProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState(() => validBikes(readStored("compare", [])).slice(0, 3));
  const [savedIds, setSavedIds] = useState(() => validBikes(readStored("saved", [])));
  const [recentIds, setRecentIds] = useState(() => validBikes(readStored("recent", [])).slice(0, 4));
  const [bookmarks, setBookmarks] = useState<string[]>(() => { const v = readStored<unknown>("bookmarks", []); return Array.isArray(v) ? v.filter((p): p is string => typeof p === "string" && p.startsWith("/")) : []; });
  const [filter, setFilter] = useState("All");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const storageWarning = useRef(false);
  const compareRef = useRef(compareIds);
  const savedRef = useRef(savedIds);
  const bookmarkRef = useRef(bookmarks);

  const notify = useCallback((message: string, tone: Toast["tone"] = "dark") => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items.slice(-1), { id, message, tone }]);
    timers.current.push(setTimeout(() => setToasts((items) => items.filter((t) => t.id !== id)), 3200));
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const saved = [writeStored("saved", savedIds), writeStored("compare", compareIds), writeStored("bookmarks", bookmarks), writeStored("recent", recentIds)].every(Boolean);
    if (!saved && !storageWarning.current) { storageWarning.current = true; notify("Browser storage is unavailable. Your shortlist lasts for this session only.", "red"); }
  }, [savedIds, compareIds, bookmarks, recentIds, notify]);

  const setComparison = useCallback((ids: string[]) => { const next = validBikes(ids).slice(0, 3); compareRef.current = next; setCompareIds(next); }, []);
  const toggleCompare = useCallback((id: string) => {
    const bike = catalogById.get(id); if (!bike) return;
    const current = compareRef.current;
    if (current.includes(id)) { setComparison(current.filter((x) => x !== id)); notify(`${bike.model} removed from comparison`); }
    else if (current.length >= 3) notify("Compare up to 3 bikes. Remove one to add another.", "red");
    else { setComparison([...current, id]); notify(`${bike.model} added to comparison`); }
  }, [notify, setComparison]);
  const toggleSaved = useCallback((id: string) => {
    const bike = catalogById.get(id); if (!bike) return;
    const exists = savedRef.current.includes(id);
    const next = exists ? savedRef.current.filter((x) => x !== id) : [...savedRef.current, id];
    savedRef.current = next; setSavedIds(next); notify(exists ? `${bike.model} removed from your garage` : `${bike.model} saved to your garage`);
  }, [notify]);
  const toggleBookmark = useCallback((path: string) => {
    const exists = bookmarkRef.current.includes(path);
    const next = exists ? bookmarkRef.current.filter((p) => p !== path) : [...bookmarkRef.current, path];
    bookmarkRef.current = next; setBookmarks(next); notify(exists ? "Removed from your reading list" : "Saved to your reading list");
  }, [notify]);
  const recordView = useCallback((id: string) => setRecentIds((items) => [id, ...items.filter((v) => v !== id)].slice(0, 4)), []);
  const clearResearch = useCallback(() => {
    let success = true;
    try { Object.keys(localStorage).filter((key) => key.startsWith("motoindex:")).forEach((key) => localStorage.removeItem(key)); }
    catch { success = false; }
    compareRef.current = []; savedRef.current = []; bookmarkRef.current = [];
    setCompareIds([]); setSavedIds([]); setBookmarks([]); setRecentIds([]);
    notify(success ? "Your local research data has been cleared" : "Session cleared. Browser storage could not be accessed.", success ? "dark" : "red");
    return success;
  }, [notify]);

  return <AppContext.Provider value={{ compareIds, setComparison, toggleCompare, savedIds, toggleSaved, bookmarks, toggleBookmark, recentIds, recordView, clearResearch, filter, setFilter, notify }}>
    {children}
    <div role="status" aria-live="polite" className="site-toasts pointer-events-none fixed inset-x-0 top-24 z-[120] flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => <div key={toast.id} className="flex max-w-lg items-center gap-3 rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-lift" style={{ animation: "toastIn .3s ease both" }}><Icon name={toast.tone === "red" ? "x" : "check"} className={`h-4 w-4 shrink-0 ${toast.tone === "red" ? "text-racer-400" : "text-emerald-400"}`} />{toast.message}</div>)}
    </div>
  </AppContext.Provider>;
}
