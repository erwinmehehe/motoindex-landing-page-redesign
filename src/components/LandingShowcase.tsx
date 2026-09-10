import { catalog } from "../catalog";
import { useApp } from "../state";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";
import Icon from "./icons";
import BikeTile from "./BikeTile";

export default function LandingShowcase() {
  const { filter, setFilter } = useApp();
  const featured = catalog.slice(0, 8).filter((bike) => filter === "All" || (filter === "Automatic" ? bike.transmission === "Automatic" : filter === "Sport" ? bike.category.includes("Sport") || bike.category.includes("Naked") : bike.category.some((c) => c === filter)));
  return <section id="bikes" className="relative scroll-mt-24 bg-paper py-20 sm:py-28"><Container><SectionHeading eyebrow="Featured motorcycles" icon="star" title={<>Current models. Clearer choices. <span className="text-gradient-red">Your next ride.</span></>} copy="Explore the published facts, save a contender, and take the same shortlist into a detailed side-by-side comparison." /><Reveal className="mt-9"><div className="landing-bike-tabs">{["All", "Automatic", "Commuter", "Sport", "Adventure"].map((name) => <button type="button" aria-pressed={name === filter} key={name} onClick={() => setFilter(name)}>{name === "All" ? "All featured bikes" : name === "Sport" ? "Sport & naked" : name}</button>)}</div></Reveal><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((bike, index) => <Reveal key={bike.id} delay={index % 4 * 70}><BikeTile bike={bike} /></Reveal>)}</div><div className="mt-10 flex justify-center"><a href="/motorcycles" className="action-primary">Explore the motorcycle index<Icon name="arrowRight" className="h-4 w-4" /></a></div><p className="mt-4 text-center text-xs text-ink-500">Published price references. Exact variants and source dates are on every redesigned model page.</p></Container></section>;
}