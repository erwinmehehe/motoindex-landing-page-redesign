import type { Helmet } from "./helmet-catalog";

export type HelmetCollectionDef = {
  path: string;
  title: string;
  description: string;
  filter: (h: Helmet) => boolean;
  note: string;
};

export const helmetCollections: HelmetCollectionDef[] = [
  { path: "/gear/helmets/under-3000", title: "Motorcycle helmets under PHP 3,000", description: "Entry-price helmet records with a published starting reference at or below PHP 3,000. Fit and certification still belong to the exact unit.", filter: (h) => h.price !== null && h.price <= 3000, note: "A budget ceiling excludes pending-price models. It is not a safety ranking." },
  { path: "/gear/helmets/under-5000", title: "Motorcycle helmets under PHP 5,000", description: "Road helmets with published starting prices at or below PHP 5,000. Compare format and sizes, then inspect the live listing.", filter: (h) => h.price !== null && h.price <= 5000, note: "Graphics and visor bundles can push a live seller price above this band." },
  { path: "/gear/helmets/under-10000", title: "Motorcycle helmets under PHP 10,000", description: "A wider commuter and touring budget using recorded starting prices at or below PHP 10,000.", filter: (h) => h.price !== null && h.price <= 10000, note: "Premium names in this band still need unit-level authenticity and fit checks." },
  { path: "/gear/helmets/full-face", title: "Full-face motorcycle helmets in the Philippines", description: "Full-face format records from the local catalog. Coverage of the chin area is a format fact, not a certification or fit guarantee.", filter: (h) => h.type === "Full face", note: "Open the exact model for sizes and shop links." },
  { path: "/gear/helmets/modular", title: "Modular motorcycle helmets in the Philippines", description: "Flip-up / modular format records. Confirm the maker's riding-position rules for the chin bar.", filter: (h) => h.type === "Modular", note: "A modular mechanism is not permission to assume the same certification in every configuration." },
];
