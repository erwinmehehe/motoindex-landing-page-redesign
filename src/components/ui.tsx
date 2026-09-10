import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import Icon from "./icons";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
        dark
          ? "border-white/15 bg-white/8 text-white/80"
          : "border-ink-200 bg-white text-ink-500"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-racer-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  dark = false,
  align = "center",
  icon,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
  icon?: string;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-5 ${alignment}`}>
      <Eyebrow dark={dark}>
        {icon && <Icon name={icon} className="h-3.5 w-3.5 text-racer-400" />}
        {eyebrow}
      </Eyebrow>
      <h2
        className={`max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p className={`max-w-2xl text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink-500"}`}>
          {copy}
        </p>
      )}
    </Reveal>
  );
}
