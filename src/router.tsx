import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

type Location = { pathname: string; search: string; hash: string };
type Navigate = (to: string, options?: { replace?: boolean }) => void;
const RouterContext = createContext<(Location & { navigate: Navigate }) | null>(null);
const currentLocation = (): Location => ({ pathname: window.location.pathname.replace(/\/$/, "") || "/", search: window.location.search, hash: window.location.hash });
const hashId = (hash: string) => { try { return decodeURIComponent(hash.slice(1)); } catch { return hash.slice(1); } };

export function SiteRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(currentLocation);
  const previousPath = useRef(location.pathname);
  const firstRender = useRef(true);
  const navigate = useCallback<Navigate>((to, options) => {
    const next = new URL(to, window.location.href);
    if (next.origin !== window.location.origin) { window.location.assign(next.href); return; }
    const destination = next.pathname + next.search + next.hash;
    if (destination === window.location.pathname + window.location.search + window.location.hash) return;
    window.history[options?.replace ? "replaceState" : "pushState"]({}, "", destination);
    setLocation(currentLocation());
  }, []);

  useEffect(() => {
    const update = () => setLocation(currentLocation());
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => { window.removeEventListener("popstate", update); window.removeEventListener("hashchange", update); };
  }, []);

  useLayoutEffect(() => {
    const changed = previousPath.current !== location.pathname;
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(hashId(location.hash));
        target?.scrollIntoView({ behavior: "instant" });
        target?.focus({ preventScroll: true });
      } else if (changed) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      if (changed && !firstRender.current) document.getElementById("main-content")?.focus({ preventScroll: true });
      firstRender.current = false;
    });
    previousPath.current = location.pathname;
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.search]);

  // Real anchors retain open-in-new-tab behavior; only unmodified local clicks use client navigation.
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin || !["http:", "https:"].includes(destination.protocol)) return;
    event.preventDefault();
    if (destination.href === window.location.href && destination.hash) {
      const target = document.getElementById(hashId(destination.hash));
      target?.scrollIntoView({ behavior: "smooth" });
      target?.focus({ preventScroll: true });
      return;
    }
    navigate(destination.pathname + destination.search + destination.hash);
  };

  return <RouterContext.Provider value={{ ...location, navigate }}><div onClick={onClick}>{children}</div></RouterContext.Provider>;
}

export function useRouter() {
  const value = useContext(RouterContext);
  if (!value) throw new Error("useRouter requires SiteRouter");
  return value;
}

export function useQuery() {
  const { pathname, search, navigate } = useRouter();
  const params = new URLSearchParams(search);
  const setQuery = (changes: Record<string, string | undefined>, replace = true) => {
    const next = new URLSearchParams(window.location.search);
    Object.entries(changes).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key));
    navigate(pathname + (next.size ? `?${next.toString()}` : ""), { replace });
  };
  return { params, setQuery };
}