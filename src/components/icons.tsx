import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { name: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const wheels = (
  <>
    <circle cx="6" cy="17.5" r="2.7" />
    <circle cx="18" cy="17.5" r="2.7" />
  </>
);

const categoryPaths: Record<string, ReactElement> = {
  scooter: (
    <>
      {wheels}
      <path d="M18 17.5V9.4" />
      <path d="M16.1 7.2h3.8" />
      <path d="M16.2 7.2 15.2 4.6" />
      <path d="M6 17.5 8.2 11.2q2-1.8 5.2-1.3l2.9.6" />
      <path d="M8.4 11.3h3.6" />
      <path d="M15.6 14.9a2.9 2.9 0 0 1 4.7-.2" />
    </>
  ),
  underbone: (
    <>
      {wheels}
      <path d="M6 17.5 9 11h7l2 6.5" />
      <path d="M15.6 11V8" />
      <path d="M14.1 7.3h3.4" />
      <path d="M9 11h4.4" />
      <path d="M11.2 11v3.2h2.4" />
    </>
  ),
  naked: (
    <>
      {wheels}
      <path d="M18 17.5 16.9 8.6" />
      <path d="M15.3 6.8h3.4" />
      <path d="M6 17.5 8.4 12.2q3-1.4 6.4-.6l2 .8" />
      <circle cx="11.4" cy="14.6" r="2.1" />
      <path d="M8.4 12.2 7.2 9.2h3.2l1.4 2.4" />
    </>
  ),
  sport: (
    <>
      {wheels}
      <path d="M6 17.5 8.6 11.4q3.8-2.6 7.4-.4L18 17.5" />
      <path d="M16 10.6h2.6" />
      <path d="M15.2 9.4q1.8-.4 3 .8" />
      <path d="M8.6 11.4 7.4 14.2h5.2l-1-2.8" />
    </>
  ),
  adventure: (
    <>
      {wheels}
      <path d="M18 17.5 16.6 7.8" />
      <path d="M15.2 6.4h3" />
      <path d="M16.6 7.8 13.8 10" />
      <path d="M6 17.5 8 10.8q3.2-1.8 6.4-.2" />
      <rect x="6.6" y="10.4" width="3.4" height="3.6" rx="0.6" />
      <path d="M15.4 14.6a2.9 2.9 0 0 1 4.8 0" />
    </>
  ),
  cruiser: (
    <>
      {wheels}
      <path d="M6 17.5 8.6 12.6h7l2.4 4.9" />
      <path d="M18 17.5q1.8-7.5-.8-9.4" />
      <path d="M15.8 6.6h2.8" />
      <path d="M8.6 12.6 8 10.2h4.4l1.2 2.4" />
      <path d="M6.8 15.2h3" />
    </>
  ),
  offroad: (
    <>
      {wheels}
      <path d="M18 17.5 16.8 9.2" />
      <path d="M15.2 7.4h3.4" />
      <path d="M6 17.5 8.8 11.8q3.4-1.8 6.8-.6" />
      <path d="M14.7 13.4a3.4 3.4 0 0 1 5.9.2" />
      <path d="M8.4 11.4 6.8 8.6h3.6" />
    </>
  ),
  electric: (
    <>
      {wheels}
      <path d="M18 17.5V9.4" />
      <path d="M16.1 7.2h3.8" />
      <path d="M6 17.5 8.2 11.2q2-1.8 5.2-1.3l2.9.6" />
      <path d="m11.9 10.4-1.5 2.8h2l-1.3 3 2.5-3.6h-2l1.2-2.2z" fill="currentColor" stroke="none" />
    </>
  ),
};

const uiPaths: Record<string, ReactElement> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.2-4.2" />
    </>
  ),
  heart: (
    <path d="M19.5 8.6c0 4.8-7.5 9.4-7.5 9.4S4.5 13.4 4.5 8.6A3.7 3.7 0 0 1 12 6.7a3.7 3.7 0 0 1 7.5 1.9Z" />
  ),
  heartFill: (
    <path
      d="M19.5 8.6c0 4.8-7.5 9.4-7.5 9.4S4.5 13.4 4.5 8.6A3.7 3.7 0 0 1 12 6.7a3.7 3.7 0 0 1 7.5 1.9Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  compare: (
    <>
      <path d="M12 3.5v17" />
      <path d="M5 7h14" />
      <path d="M5 7 2.4 13.2a3 3 0 0 0 5.2 0L5 7Z" />
      <path d="M19 7 16.4 13.2a3 3 0 0 0 5.2 0L19 7Z" />
      <path d="M8 20.5h8" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  x: (
    <>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h15" />
      <path d="m12.5 5 7 7-7 7" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  sparkles: (
    <>
      <path d="M12 3.5l1.8 4.7 4.7 1.8-4.7 1.8L12 16.5l-1.8-4.7L5.5 10l4.7-1.8L12 3.5Z" />
      <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
      <path d="M5.5 15l.6 1.6 1.6.6-1.6.6L5.5 20l-.6-1.8-1.6-.6 1.6-.6L5.5 15Z" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="2.2" />
      <path d="M8.2 6.5h7.6" />
      <path d="M8.2 10.5h.01M12 10.5h.01M15.8 10.5h.01M8.2 14h.01M12 14h.01M15.8 14h.01M8.2 17.5h.01M12 17.5h.01M15.8 17.5h.01" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v1" />
      <rect x="3" y="7" width="18" height="12.5" rx="2.5" />
      <path d="M15.5 12.4h3.5v3.2h-3.5a1.6 1.6 0 0 1 0-3.2Z" />
    </>
  ),
  ruler: (
    <>
      <path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0L2.7 16.7a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z" />
      <path d="m8.5 9.5 1.5 1.5M11.5 6.5l1.5 1.5M14.5 12.5l1.5 1.5M5.5 12.5l1.5 1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 5 5.5v6c0 4.5 3 7.7 7 9.2 4-1.5 7-4.7 7-9.2v-6L12 2.8Z" />
      <path d="m9 11.8 2.2 2.2L15.5 9.6" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="5.5" r="2.5" />
      <path d="M8.5 18.5H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.5" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.3l-5.3 2.8 1.1-5.8L3.5 9.2l5.9-.8L12 3Z" />
  ),
  quote: (
    <path
      d="M9.5 6C6.5 7.4 5 9.8 5 13.4V18h5.4v-5.4H7.6c.1-2 1-3.3 2.9-4.2L9.5 6Zm9 0c-3 1.4-4.5 3.8-4.5 7.4V18h5.4v-5.4h-2.8c.1-2 1-3.3 2.9-4.2L18.5 6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  fuel: (
    <>
      <rect x="4" y="3.5" width="9" height="17" rx="1.5" />
      <path d="M4 14h9" />
      <path d="M13 8.5h2.5a2 2 0 0 1 2 2V17a1.5 1.5 0 0 0 3 0v-5l-2.5-2.5" />
      <path d="M7 3.5h3" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 18l4.5-4.5" />
      <circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.5-1.8 7L12 18.2l5.3 2.3-1.8-7" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  send: <path d="M21.5 3.5 11 14M21.5 3.5 15 21l-4-7-7-4 17.5-6.5Z" />,
  facebook: (
    <path d="M14.5 8.5h2V5.2h-2.4c-2.3 0-3.6 1.5-3.6 3.7v1.9H8v3.3h2.5V21h3.4v-6.9h2.6l.5-3.3h-3.1V9.3c0-.6.3-.8 1.1-.8Z" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="3.2" />
      <path d="m10.5 9.8 4.5 2.2-4.5 2.2V9.8Z" fill="currentColor" stroke="none" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  bell: (
    <>
      <path d="M6 9.5a6 6 0 1 1 12 0c0 5 2 5.5 2 6.5H4c0-1 2-1.5 2-6.5Z" />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  wrench: (
    <path d="M14.7 3.6a4.2 4.2 0 0 0-5.4 5.2L4 14.1 9.9 20l5.3-5.3a4.2 4.2 0 0 0 5.2-5.4l-2.9 2.9-2.7-2.7 2.9-2.9a4.2 4.2 0 0 0-3-1Z" />
  ),
  helmet: (
    <>
      <path d="M4.5 15.5v-2.2a7.5 7.5 0 0 1 15 0v2.2" />
      <path d="M3.5 15.5h17v2.2a1.3 1.3 0 0 1-1.3 1.3H4.8a1.3 1.3 0 0 1-1.3-1.3v-2.2Z" />
      <path d="M16 8.5a4.5 4.5 0 0 1 2.4 3.7" />
      <path d="M7.8 19v1.6" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.2V4.5h7.7l9.3 9.3-7.7 7.7-9.3-9.3Z" />
      <circle cx="7.8" cy="8.8" r="1.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M9 14h.01M12 14h.01M15 14h.01" />
    </>
  ),
  external: (
    <>
      <path d="M14 4.5h5.5V10" />
      <path d="M19.5 4.5 11 13" />
      <path d="M18.5 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h4.5" />
    </>
  ),
  feather: (
    <>
      <path d="M20 4c-7 0-13.5 3.5-16 10.5C2.5 18 4.5 20.5 7.5 20 14 19 20 12.5 20 4Z" />
      <path d="M4 20 13.5 10.5" />
      <path d="M8 14h6" />
    </>
  ),
  ad: (
    <>
      <path d="M12 3 4 7v6c0 4.5 3.2 7 8 8 4.8-1 8-3.5 8-8V7l-8-4Z" />
      <path d="m8.5 12 2.4 2.4 4.6-5" />
    </>
  ),
};

export default function Icon({ name, ...props }: IconProps) {
  const content = categoryPaths[name] ?? uiPaths[name] ?? null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      {content}
    </svg>
  );
}
