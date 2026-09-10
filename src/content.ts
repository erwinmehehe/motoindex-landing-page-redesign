import { library, trustPages, type SeoCard } from "./seo";
import { fullEditorial } from "./editorial";
import { gapPages, gapEditorial } from "./gap-content";
import { nextPages, nextEditorial } from "./next-content";

export type ResearchPage = SeoCard & { topic: string };
export type Hub = { title: string; subtitle: string; topic?: string; icon: string };
export const hubs: Record<string, Hub> = {
  "/guides": { title: "Good rides start with good research.", subtitle: "Buying advice, ownership know-how and practical tools. Your next answer is right here.", icon: "doc" },
  "/recommendations": { title: "A better way to find your shortlist.", subtitle: "Explore motorcycles by budget, riding style and fit. Clear criteria, not one-size-fits-all rankings.", topic: "guides", icon: "target" },
  "/ownership": { title: "Everything after the showroom.", subtitle: "Understand the paperwork, plan the running costs and keep your next ride on track.", topic: "ownership", icon: "wallet" },
  "/maintenance": { title: "Know your bike. Care for your ride.", subtitle: "Practical service guides, with the exact owner's manual always the final word.", topic: "maintenance", icon: "wrench" },
  "/ownership/maintenance": { title: "Make maintenance part of the plan.", subtitle: "Build a service checklist, save the guides you need and find manufacturer resources.", topic: "maintenance", icon: "wrench" },
  "/commute": { title: "Make the everyday ride work for you.", subtitle: "From fuel budgets to rainy-season prep. Plan for the roads you ride, not just the bike you want.", topic: "commute", icon: "route" },
  "/tools": { title: "Less guesswork. Better decisions.", subtitle: "Understand financing, monthly running costs, rider fit and electric ownership before committing.", topic: "tools", icon: "calculator" },
};

const extra: ResearchPage[] = [
  { href: "/recommendations/best-underbone-motorcycles-philippines", title: "Underbone motorcycles in the Philippines", desc: "Compare practical and performance underbones by price, transmission, engine and seat height.", topic: "guides", icon: "underbone" },
  { href: "/recommendations/scooters-under-150k-philippines", title: "Scooters under PHP 150,000", desc: "An automatic-scooter shortlist based on published starting prices below PHP 150,000.", topic: "guides", icon: "wallet" },
  { href: "/recommendations/motorcycles-under-400cc-philippines", title: "Motorcycles under 400cc", desc: "Compare smaller-displacement motorcycles without confusing engine size with rider suitability.", topic: "guides", icon: "gauge" },
  { href: "/recommendations/yamaha-mio-motorcycles-philippines", title: "Yamaha Mio motorcycles", desc: "Explore the Mio scooter family, with each model and generation kept distinct.", topic: "guides", icon: "scooter" },
  { href: "/recommendations/kawasaki-ninja-motorcycles-philippines", title: "Kawasaki Ninja motorcycles", desc: "Compare the Ninja family by published price, engine, power and seat height.", topic: "guides", icon: "sport" },
  { href: "/recommendations/125cc-scooters-philippines", title: "125cc scooters in the Philippines", desc: "Compare 125cc-class automatic scooters for everyday riding and ownership.", topic: "guides", icon: "scooter" },
  { href: "/recommendations/150cc-scooters-philippines", title: "150cc scooters in the Philippines", desc: "Compare 150cc-class scooters by price, seat height and equipment.", topic: "guides", icon: "scooter" },
  { href: "/recommendations/160cc-scooters-philippines", title: "160cc scooters in the Philippines", desc: "Explore Honda's 160cc-class alternatives and their everyday trade-offs.", topic: "guides", icon: "scooter" },
  { href: "/recommendations/automatic-motorcycles-philippines", title: "Automatic motorcycles in the Philippines", desc: "Twist-and-go choices for daily commuting, weekend trips and everything between.", topic: "guides", icon: "scooter" },
  { href: "/recommendations/suzuki-burgman-motorcycles-philippines", title: "Suzuki Burgman motorcycles", desc: "Separate Street, Street EX and larger Burgman models before comparing the numbers.", topic: "guides", icon: "scooter" },
  { href: "/recommendations/suzuki-raider-motorcycles-philippines", title: "Suzuki Raider motorcycles", desc: "Research Raider models and make sure the exact FI, PRO or Crossover variant matches.", topic: "guides", icon: "underbone" },
  { href: "/compare/click-160-vs-nmax-v3", title: "Click 160 vs NMAX V3", desc: "A lighter city scooter against a comfort-focused premium scooter.", topic: "compare", icon: "compare" },
  { href: "/fitment", title: "Rider fitment check", desc: "Compare published seat height with your inseam, then verify the fit in person.", topic: "tools", icon: "ruler" },
];

const entries: ResearchPage[] = [...library.flatMap((group) => group.cards.map((card) => ({ ...card, topic: group.id }))), ...trustPages.map((card) => ({ ...card, topic: "about" })), ...extra, ...gapPages, ...nextPages];
export const pages = [...new Map(entries.map((page) => [page.href, page])).values()];
export const pageByPath = new Map(pages.map((page) => [page.href, page]));
export const topicNames: Record<string, string> = { guides: "Buying guides", compare: "Comparisons", ownership: "Ownership & paperwork", maintenance: "Maintenance & gear", commute: "Everyday riding", electric: "Electric ownership", used: "Used bikes & dealers", about: "About MotoIndex", tools: "Planning tools" };
export const isCalculatorPath = (path: string) => path.includes("calculator") || path.includes("charging-cost") || path === "/commute/affordability";

export type ArticleSection = { title: string; text: string[]; checks?: string[] };
export type ArticleBody = { sections: ArticleSection[]; checked?: string; sourced?: boolean; originalSource?: boolean; related?: { label: string; href: string }[]; takeaways?: string[]; faqs?: { q: string; a: string }[]; sources?: { label: string; href: string }[] };
const manualIntro = "Part numbers, fluid grades, torque settings and service intervals must match the exact motorcycle and model year. Use the current owner's manual or a qualified service center rather than a generic interval chart.";

export const articles: Record<string, ArticleBody> = {
  ...fullEditorial,
  ...gapEditorial,
  ...nextEditorial,
  "/ownership/dl-code-b-motorcycle-philippines": {
    sourced: true, checked: "2026-08-26",
    sections: [
      { title: "Code B alone is not a motorcycle code", text: ["The source-dated LTO guide assigns DL Code A to motorcycles and Code B to passenger vehicles. If your license only shows B, do not treat it as permission to operate a motorcycle."] },
      { title: "Look for the correct vehicle authorization", text: ["LTO identifies Code A as Motorcycle and Code A1 as Tricycle. Check the exact vehicle categories printed on the actual license, rather than relying on the older restriction-code system."], checks: ["Motorcycle authorization checked on the actual license.", "The exact vehicle category confirmed.", "Transmission or clutch authorization checked.", "Current licensing requirements confirmed before applying for an added code."] },
      { title: "Transmission authorization still matters", text: ["The reviewed licensing information states that manual-transmission authorization may cover automatic vehicles, while automatic-only authorization does not authorize manual transmission. Check the code that applies to the vehicle you plan to ride."] },
      { title: "Have B but not A? Check the current process", text: ["Use the current LTO procedure for adding the appropriate driver's-license code before riding a motorcycle on public roads. Requirements can change, so confirm the latest checklist with LTO or an authorized licensing center."] },
    ], sources: [{ label: "Land Transportation Office", href: "https://lto.gov.ph/" }],
  },
  "/guides/motorcycle-helmet-size-guide": {
    sourced: true, checked: "2026-09-09",
    sections: [
      { title: "Measure first. Then try it on.", text: ["Helmet size starts with head circumference, but the number is only a starting point. Different models suit different head shapes. Measure first, use the exact model's chart and then check how the helmet sits on your head.", "Use a soft measuring tape around the widest part of your head. SHOEI places the tape about 2 cm above the eyebrows, above the ears and around the most prominent point at the back. Record the result in centimeters."], checks: ["Measure more than once for a consistent result.", "Wear your hair as you normally do when riding.", "Use the size chart for the exact helmet model.", "Try both sizes if you fall between measurements."] },
      { title: "What a good fit feels like", text: ["A new helmet should feel snug around the crown and cheeks without a sharp pressure point. Your skin should move with the helmet, rather than the shell sliding freely around your head.", "Keep it on for several minutes. Padding normally settles with use; a loose helmet is unlikely to become tighter."], checks: ["Cheek pads make contact with your cheeks.", "The crown feels evenly supported.", "The helmet does not rotate easily around your head.", "The retention strap fastens securely without painful pressure."] },
      { title: "Head shape matters, too", text: ["Two riders with the same circumference may need different models. Pressure at the forehead or sides can indicate a shape mismatch, not a reason to simply size up.", "A familiar Small, Medium or Large label does not guarantee the same fit across brands or product families."] },
      { title: "Buying online? Recheck the details", text: ["A chart cannot confirm head shape or cheek-pad fit. Check the seller's exchange policy before removing tags or protective film, and inspect the exact helmet on arrival.", "For a helmet sold in the Philippines, inspect the applicable PS or ICC conformity marking on the actual unit, not only the online listing."] },
    ],
    sources: [{ label: "SHOEI fitting instructions", href: "https://www.shoei-europe.com/wp-content/uploads/2020/11/How-to.pdf" }, { label: "DTI-BPS: PS and ICC marks", href: "https://bps.dti.gov.ph/product-certification/ps-and-icc-marks" }],
  },
  "/maintenance/motorcycle-battery": {
    sourced: true, checked: "2026-08-26",
    sections: [
      { title: "Match the exact battery specification", text: ["A physically similar battery is not automatically a correct replacement. Voltage is only one requirement: dimensions, terminal orientation, capacity and battery chemistry must match the motorcycle specification.", manualIntro], checks: ["Confirm the model and year in your manual.", "Match voltage, capacity and battery type.", "Check case dimensions and terminal orientation.", "Follow the manufacturer charging instructions."] },
      { title: "Symptoms are a starting point, not a diagnosis", text: ["Slow cranking, repeated no-start events, dimming during start or failure to hold a charge can point to a battery or charging-system issue.", "Have the system checked before replacing parts by guesswork. A new battery will not fix an underlying charging problem."] },
      { title: "Storage and charging matter", text: ["Long periods without riding can discharge a battery. Manufacturer guidance commonly recommends periodic charging during storage and clean, corrosion-free terminals.", "Use a charger compatible with the battery chemistry and follow the battery and motorcycle makers' instructions."] },
      { title: "There is no universal lifespan", text: ["Heat, storage, short trips, electrical accessories and charging-system condition all affect battery life. A fixed replacement age is not a substitute for inspection and model-specific guidance."] },
    ],
    sources: [{ label: "Yamaha Philippines After Sales", href: "https://aftersales.yamaha-motor.com.ph/" }, { label: "Suzuki Philippines After Sales", href: "https://mc.suzuki.com.ph/after-sales/" }],
  },
  "/ownership/registration-renewal": {
    sourced: true, checked: "2026-08-25",
    sections: [
      { title: "Prepare your renewal documents", text: ["Have your motorcycle's registration record and current official receipt available. LTO guidance also calls for active compulsory motor-vehicle insurance and the applicable inspection or emissions process.", "Confirm the checklist for your actual transaction before visiting an office or paying."], checks: ["Current registration record and official receipt.", "Active compulsory motor-vehicle insurance.", "Applicable inspection or emissions documentation.", "Renewal timing verified against your registration or LTMS record."] },
      { title: "Check the renewal window", text: ["The reviewed LTO guidance allows renewal up to two months before expiry. Confirm timing using the current registration record or LTMS, rather than a remembered plate schedule."] },
      { title: "Check eligibility for online renewal", text: ["Online plain renewal through LTMS is available for eligible transactions. Inspection requirements and eligibility can vary; consult the current portal and LTO issuances before relying on the online path."] },
      { title: "Budget for the actual assessment", text: ["The source page uses PHP 240 as its core motorcycle MVUC planning reference before variable charges. Inspection, CTPL, sidecar status, fees and late charges can change the amount.", "The calculator is a budget aid, not an official bill. Use the current LTO assessment for payment."] },
    ], sources: [{ label: "LTMS online portal", href: "https://portal.lto.gov.ph/" }, { label: "Land Transportation Office", href: "https://lto.gov.ph/" }],
  },
  "/commute/rainy-season": { sections: [
    { title: "Plan for visibility, not just waterproofing", text: ["Rain reduces visibility for you and other road users. Clean the visor, check lights and indicators, and choose rainwear that does not obstruct controls."], checks: ["Headlight, tail light and indicators working.", "Visor clean and ventilation usable.", "Rain gear fits over riding equipment.", "A safer route and a place to stop identified."] },
    { title: "Give tires and brakes your attention", text: ["Inspect tread, damage and pressures using the exact motorcycle's manual. Allow more following distance and avoid abrupt steering, braking or throttle inputs on wet surfaces."] },
    { title: "Ground clearance is not a wading depth", text: ["A specification cannot tell you whether floodwater is safe to cross. Depth, hidden hazards, current and the position of air intakes and electronics matter. Do not ride into uncertain floodwater."] },
    { title: "Make visibility a two-way check", text: ["You need to see and be seen. Clean the visor without damaging coatings, check the headlight and brake light, and choose rainwear that remains visible without blocking controls or mirrors.", "Keep enough time in the journey to slow down or stop somewhere safe. A wet-weather route with a safe stopping option may be more useful than the shortest route."] },
    { title: "After a wet ride", text: ["Inspect the motorcycle for obvious debris, leaks or damage and follow the manual's cleaning and maintenance guidance. If the motorcycle has been submerged or behaves abnormally, do not assume a quick restart establishes that it is safe to use.", "Water can affect electrical components, lubricants and mechanical systems in ways a visual check cannot resolve. Seek a qualified inspection if flood exposure or a new symptom raises doubt."] },
  ] },
  "/used-motorcycles/buying-checklist": { sections: [
    { title: "Start with the seller and documents", text: ["Confirm the seller's identity and authority to sell. Match the unit, frame and engine identifiers to its documents and clarify any encumbrance before paying."], checks: ["Seller identity and authority verified.", "Original OR/CR and unit identifiers checked.", "Current transfer requirements confirmed with LTO.", "Deed of sale and required clearances arranged."] },
    { title: "Inspect the exact motorcycle", text: ["Bring a qualified independent mechanic when possible. Check cold starting, leaks, tires, brakes, steering and visible crash or flood damage. A clean photograph is not an inspection."], checks: ["Independent mechanical inspection completed.", "Mileage and service history reviewed.", "Repair estimates included in the budget.", "A lawful, safe test ride arranged if available."] },
    { title: "Compare the complete transaction", text: ["Ask for the total cash price, fees, release conditions and transfer process in writing. Repossessed units can have as-is terms and no manufacturer warranty. Verify the exact seller contract."] },
    { title: "Keep generation and price context separate", text: ["An old launch SRP is not today's used asking price. Check the actual year and generation before comparing a used bike against a current new model.", "A cheaper offer can be offset by overdue service, damaged consumables, unpaid or incomplete paperwork and financing charges. Build the budget from the inspected unit, not a generic depreciation percentage."] },
    { title: "Record the agreement and complete the transfer", text: ["Keep the seller's complete written terms, receipts and conveyance documents. Arrange the applicable clearances and formal LTO transfer rather than treating an incomplete open deed as the finished transaction.", "Do not send a deposit solely because a listing looks professional or a seller creates urgency. Resolve identity, ownership and unit mismatches before proceeding, with qualified legal or mechanical advice where needed."] },
  ] },
  "/maintenance/change-oil-motorcycle": { sections: [
    { title: "Read your model's schedule first", text: [manualIntro, "Oil-change timing can depend on distance, elapsed time and use conditions. Do not substitute a universal mileage recommendation for the exact service schedule."] },
    { title: "Match more than the viscosity", text: ["Oil grade, performance standards, wet-clutch suitability and specified capacity all matter. The same viscosity label alone does not make two products interchangeable."], checks: ["Exact model and manual identified.", "Required viscosity and performance standard confirmed.", "Oil capacity and level-check procedure checked.", "Waste oil collected for appropriate disposal."] },
    { title: "Check the result safely", text: ["If you are not equipped or trained to service the motorcycle, use a qualified technician. Check the level using the manual's procedure, inspect for leaks and record the date and odometer reading."] },
    { title: "Make the service record useful", text: ["Keep the oil specification, part numbers, quantity, date and odometer on the receipt or service log. A note saying only 'changed oil' may not tell the next technician which fluid was used.", "If the level drops repeatedly, leaks appear or the engine behaves unusually, investigate the cause. Repeated top-ups or a more expensive oil are not substitutes for diagnosing a mechanical problem."] },
  ] },
  "/guides/electric-motorcycle-vs-gas-motorcycle": { sections: [
    { title: "Compare your actual daily use", text: ["Start with your daily distance, storage location and access to safe charging. A claimed range figure and an engine displacement do not describe equivalent real-world capability."] },
    { title: "Separate purchase cost from running cost", text: ["Electricity and fuel are only part of ownership. Consider battery replacement terms, service access, tires, insurance, registration and financing. Enter your own energy prices in the calculators."], checks: ["Charging access and electrical installation checked.", "Battery warranty and replacement availability confirmed.", "Service support and parts availability checked.", "Registration classification confirmed for the exact unit."] },
    { title: "Read the limits behind the range", text: ["Speed, payload, hills, temperature and battery condition change range. Leave a reserve, and do not treat a claimed test-cycle figure as a guaranteed distance."] },
    { title: "Check the battery agreement", text: ["An electric motorcycle advertised with a battery subscription can have a lower upfront price and an ongoing fee. Compare that contract with owning the battery, and ask about replacement, warranty, swapping availability and what happens if you later sell the vehicle.", "For a fuel-powered bike, include the relevant oil, filter and drivetrain service. For both types, tires, brakes, insurance, registration and financing remain real costs."] },
    { title: "Match the vehicle to your route", text: ["A long daily trip without dependable charging may be a very different decision from a short city route with safe charging at home. Service access and parts availability matter just as much as the cost of one refill or full charge.", "Use the exact local model's registration classification and applicable license requirements. Do not infer exemptions from an electric marketing label."] },
  ] },
};

export function articleFor(page: ResearchPage): ArticleBody {
  const body = articles[page.href];
  if (!body) throw new Error(`No editorial body registered for ${page.href}`);
  return body;
}