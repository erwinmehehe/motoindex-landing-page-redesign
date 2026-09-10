import { catalog, type CatalogBike } from "./catalog";

export type Collection = {
  criteria: string[];
  filter: (bike: CatalogBike) => boolean;
  order?: "price" | "seat" | "weight" | "economy" | "tank";
  paragraphs: { title: string; text: string }[];
  next: string;
  sources?: { label: string; href: string }[];
};

const budgetNotes = [
  { title: "Keep room for the rest of ownership", text: "A motorcycle's published starting price is only the entry point. Reserve money for a correctly fitted helmet, other riding gear, registration, insurance, servicing and an emergency buffer. A price range may include a higher variant that exceeds your limit." },
  { title: "Compare the actual transaction", text: "Ask each dealer for the same model, generation and variant, with the cash price and every added charge in writing. A smaller monthly payment may involve a larger down payment or longer term. Use the loan planner to see the total payable." },
  { title: "Make the shortlist physical", text: "A low price does not tell you whether the controls, seat and weight suit you. Sit on the exact motorcycle, check low-speed handling and consider the service support available near your daily route." },
];
const everydayNotes = [
  { title: "Research the ride you do most", text: "City traffic places different demands on a bike than a long provincial trip. Transmission, weight, posture, storage needs and passenger use matter alongside displacement. These published facts do not measure crash risk or promise a faster commute." },
  { title: "Put your own numbers into the budget", text: "Use your round-trip distance, workdays, fuel price, parking and maintenance reserve. A manufacturer fuel-economy test is not a guarantee in your traffic. Keep finance, insurance and registration separate from fuel-only savings." },
  { title: "Check comfort with your actual load", text: "Seat height does not establish foot reach, and engine size does not establish passenger comfort. Check the load limit and try the riding position with the equipment and passenger needs you actually have." },
];
const categoryNotes = [
  { title: "One category can contain very different motorcycles", text: "The body style is a starting point, not a promise of comfort, performance or ease of use. Compare the exact price, transmission, weight, seat position and intended roads before narrowing the choice." },
  { title: "Keep the generation and local variant fixed", text: "A model family may span several engines and equipment packages. Do not copy a specification from an overseas version or a previous generation just because the model name is similar." },
  { title: "Plan the years after the showroom", text: "Servicing, tires, insurance, parts lead times and the local dealer network can change the ownership experience. The right choice fits both your purchase budget and your ability to maintain the motorcycle." },
];
const make = (criteria: string[], filter: Collection["filter"], notes = categoryNotes, order: Collection["order"] = "price", next = "/compare"): Collection => ({ criteria, filter, paragraphs: notes, order, next });
const scooter = (bike: CatalogBike) => bike.transmission === "Automatic" && bike.category.includes("Scooter");
const category = (name: string) => (bike: CatalogBike) => bike.category[0] === name;
const brand = (name: string) => (bike: CatalogBike) => bike.brand === name;
const rec = "/recommendations/";

export const collections: Record<string, Collection> = {
  [rec + "manual-motorcycles-philippines"]: { ...make(["Recorded transmission is manual", "All recorded road and utility body styles", "Clutch operation and gear layout must be checked for the exact model"], (b) => b.transmission === "Manual", [
    { title: "Manual describes the controls, not the rider", text: "Geared motorcycles range from compact utility underbones to heavy sport and touring machines. Engine size, weight, posture and your training matter more than assuming every manual motorcycle suits the same person." },
    { title: "Check the actual clutch arrangement", text: "Underbone, semi-automatic and conventional hand-clutch layouts can differ. The database transmission label is a starting point; confirm the controls and manufacturer instructions for the exact unit." },
    { title: "Use the right license and service plan", text: "Check the driving authorization that applies to the motorcycle and transmission. Learn the clutch and drivetrain maintenance requirements from the exact manual and include them in the ownership budget." },
  ], "price", "/guides/types-of-motorcycles"), sources: [{ label: "MotoIndex source model records", href: "https://motoindexph.com/motorcycles" }] },
  [rec + "cruiser-motorcycles-philippines"]: { ...make(["Cruiser primary category in local model records", "Actual recorded displacement, not the name alone", "A lower seat is not a fit or safety guarantee"], (b) => b.category[0] === "Cruiser", [
    { title: "Test the whole riding position", text: "A low seat can come with a long reach to the handlebars, forward foot controls or substantial motorcycle mass. Test stopping, reversing and parking, not just how the seat feels in a stationary showroom." },
    { title: "Match the engine and transmission to the exact unit", text: "A model family can include different engines and transmission packages. Keep the trim, generation and local market fixed before comparing price, equipment or maintenance requirements." },
    { title: "Consider the days after purchase", text: "Insurance, tires, service access and parts lead times can change the ownership budget. Add those costs to a complete quote instead of choosing from the monthly installment alone." },
  ], "price", "/fitment"), sources: [{ label: "MotoIndex Philippine model reference catalog", href: "https://motoindexph.com/motorcycles" }] },
  [rec + "suzuki-scooters-philippines"]: { ...make(["Suzuki brand", "Automatic transmission and scooter category", "Burgman Street, Street EX and Burgman 400 remain separate"], (b) => b.brand === "Suzuki" && scooter(b), everydayNotes, "price", "/motorcycles/suzuki"), sources: [{ label: "Existing Suzuki brand records", href: "https://motoindexph.com/motorcycles/suzuki" }] },
  [rec + "scrambler-motorcycles-philippines"]: { ...make(["Named style-led research set: PG-1, XSR155 and Svartpilen 200", "Not a claim that all three are equivalent off-road motorcycles", "Factory specifications remain attached to each model"], (b) => ["yamaha-pg-1", "yamaha-xsr155", "husqvarna-svartpilen-200"].includes(b.id), [
    { title: "Separate style and capability", text: "Scrambler-style cues can appear on utility motorcycles and roadsters with very different equipment. The selection is a design-led starting point, not an off-road capability test or a manufacturer category ranking." },
    { title: "Check the terrain and hardware", text: "Tires, wheel sizes, suspension, clearance, weight and rider technique all matter. A rugged-looking tire or high fender does not guarantee that a bike suits a difficult trail or water crossing." },
    { title: "Know what a custom build changes", text: "If buying a modified motorcycle, check installation quality, compatibility and documentary status. A factory model record cannot automatically describe a custom frame, wheel, exhaust or electrical change." },
  ], "price", "/guides/scrambler-vs-cafe-racer"), sources: [{ label: "Model reference catalog", href: "https://motoindexph.com/motorcycles" }] },
  [rec + "motorcycles-under-100k"]: make(["Published starting price below PHP 100,000", "Current-generation reference records", "Lowest starting price first"], (b) => b.priceFrom < 100000, budgetNotes, "price", "/tools/motorcycle-loan-calculator"),
  [rec + "automatic-motorcycles-under-100k"]: make(["Published starting price below PHP 100,000", "Automatic transmission", "Variant price ranges stay visible"], (b) => b.priceFrom < 100000 && b.transmission === "Automatic", budgetNotes),
  [rec + "motorcycles-under-80k"]: make(["Published starting price below PHP 80,000", "Manual and automatic choices included", "Does not include fees or gear"], (b) => b.priceFrom < 80000, budgetNotes),
  [rec + "motorcycles-100k-to-150k"]: make(["Starting price from PHP 100,000 to PHP 150,000", "All body styles", "Prices are dated references, not quotations"], (b) => b.priceFrom >= 100000 && b.priceFrom <= 150000, budgetNotes),
  [rec + "motorcycles-150k-to-250k"]: make(["Starting price from PHP 150,000 to PHP 250,000", "All body styles", "Higher variants can exceed the range"], (b) => b.priceFrom >= 150000 && b.priceFrom <= 250000, budgetNotes),
  [rec + "scooters-under-150k-philippines"]: make(["Automatic scooters", "Starting price below PHP 150,000", "Lowest starting price first"], (b) => scooter(b) && b.priceFrom < 150000, budgetNotes),
  [rec + "best-scooters-philippines"]: make(["Scooter records with automatic transmission", "Objective price order, not a universal best ranking", "Confirm the exact local trim"], scooter, everydayNotes),
  [rec + "automatic-motorcycles-philippines"]: make(["Automatic transmission", "All recorded body styles", "Includes more than city scooters"], (b) => b.transmission === "Automatic", everydayNotes),
  [rec + "best-underbone-motorcycles-philippines"]: make(["Underbone body type", "Current reference records", "Price, output and seat height compared together"], category("Underbone"), everydayNotes),
  [rec + "naked-motorcycles-philippines"]: make(["Naked / roadster primary category", "Published prices and engine specifications", "No assumed experience suitability"], category("Naked")),
  [rec + "sport-motorcycles-philippines"]: make(["Sport-bike primary category", "Sport scooters are not mixed into this list", "Current generation and variant context retained"], category("Sport")),
  [rec + "dual-sport-motorcycles-philippines"]: make(["Off-road / dual-sport primary category", "Seat height stays visible", "Ground clearance alone does not determine terrain suitability"], category("Off-road")),
  [rec + "adventure-touring-motorcycles-philippines"]: make(["Adventure primary category", "Scooters and geared bikes labeled separately", "A category, not a terrain guarantee"], category("Adventure")),
  [rec + "motorcycles-400cc-plus-philippines"]: make(["Recorded displacement at least 400 cc", "Actual cc used, not model-name numbers", "Confirm current toll-road rules separately"], (b) => b.cc >= 400),
  [rec + "motorcycles-under-400cc-philippines"]: make(["Recorded displacement below 400 cc", "Do not infer toll-road eligibility from the name", "Lowest starting price first"], (b) => b.cc < 400),
  [rec + "125cc-scooters-philippines"]: make(["Automatic scooters", "Recorded engine class from 120 to 125 cc", "Published starting-price order"], (b) => scooter(b) && b.cc >= 120 && b.cc <= 125, everydayNotes),
  [rec + "150cc-scooters-philippines"]: make(["Automatic scooters", "Recorded engine class from 145 to 155 cc", "160-class records kept separate"], (b) => scooter(b) && b.cc >= 145 && b.cc <= 155, everydayNotes),
  [rec + "160cc-scooters-philippines"]: make(["Automatic scooters", "Recorded displacement above 155 and up to 165 cc", "Model naming and actual cc can differ"], (b) => scooter(b) && b.cc > 155 && b.cc <= 165, everydayNotes),
  [rec + "maxi-scooters-philippines"]: make(["Named maxi / maxi-style model set", "Includes Burgman, NMAX, PCX, XMAX, Lexi and Cruisym records", "No assumption that every model has the same comfort or equipment"], (b) => scooter(b) && /Burgman|NMAX|PCX|XMAX|Lexi|Cruisym|C 400 GT/i.test(b.model), everydayNotes),
  [rec + "cafe-racer-motorcycles-philippines"]: make(["Named modern-classic and cafe-style records", "Cafe Racer 152, Cafe 400, XSR155 and Classic 350", "Style does not determine fit or ease of use"], (b) => /Cafe Racer|Cafe 400|XSR155|Classic 350/i.test(b.model)),
  [rec + "yamaha-scooters-philippines"]: make(["Yamaha brand", "Scooter category and automatic transmission", "Different generations not merged"], (b) => brand("Yamaha")(b) && scooter(b), everydayNotes),
  [rec + "honda-scooters-philippines"]: make(["Honda brand", "Scooter or adventure-scooter body style", "Automatic transmission"], (b) => brand("Honda")(b) && b.transmission === "Automatic" && (b.category.includes("Scooter") || b.category.includes("Adventure")), everydayNotes),
  [rec + "yamaha-mio-motorcycles-philippines"]: make(["Yamaha Mio-related model set", "Mio, Fazzio and Aerox records", "Exact model pages remain separate"], (b) => b.brand === "Yamaha" && /Mio|Fazzio|Aerox/i.test(b.model), everydayNotes),
  [rec + "kawasaki-ninja-motorcycles-philippines"]: make(["Kawasaki brand", "Ninja model family", "Actual displacement, variant and source date retained"], (b) => b.brand === "Kawasaki" && /Ninja/i.test(b.model)),
  [rec + "suzuki-burgman-motorcycles-philippines"]: make(["Suzuki brand", "Burgman family", "Street, Street EX and 400 are distinct records"], (b) => b.brand === "Suzuki" && /Burgman/i.test(b.model), everydayNotes),
  [rec + "suzuki-raider-motorcycles-philippines"]: make(["Suzuki brand", "Raider family", "J Crossover, R150 FI and PRO remain distinct"], (b) => b.brand === "Suzuki" && /Raider/i.test(b.model)),
  [rec + "ktm-duke-motorcycles-philippines"]: make(["KTM brand", "Duke family", "Do not transfer specs between 390 generations"], (b) => b.brand === "KTM" && /Duke/i.test(b.model)),
  [rec + "cfmoto-sr-motorcycles-philippines"]: make(["CFMOTO brand", "SR sport-bike family", "Each engine and model record treated separately"], (b) => b.brand === "CFMOTO" && /SR/i.test(b.model)),
  [rec + "best-motorcycles-for-short-riders"]: make(["Lowest published seat height first", "Seat height is not a physical-fit prediction", "Test seat width, sag and actual foot reach"], () => true, [
    { title: "The number is only a starting point", text: "Two motorcycles with the same seat height can feel very different because of seat width, sag, footwear and rider technique. A taller but narrower seat can be easier to reach around than a lower, wider one." },
    { title: "Try the full low-speed routine", text: "Check mounting, stopping, reversing, parking and reaching the controls. Consider the actual load and the road camber you encounter. A table cannot certify whether a motorcycle suits your body or experience." },
    { title: "Keep power and weight in the decision", text: "A low-seat cruiser may be much heavier and more powerful than a compact scooter. Seat-height order is not an automatic beginner shortlist. Use the rider-fit tool for context, then arrange an in-person check." },
  ], "seat", "/fitment"),
  [rec + "lightweight-motorcycles-philippines"]: make(["Only records with a known curb weight", "Lowest recorded weight first", "Missing weights are excluded, not treated as zero"], (b) => typeof b.weight === "number", everydayNotes, "weight"),
  [rec + "fuel-efficient-motorcycles-philippines"]: make(["Only a sourced published fuel-economy figure", "Highest km/L first", "Planning estimates are excluded from the ranking"], (b) => b.economyBasis === "published" && typeof b.economy === "number", [
    { title: "Test figures are not your exact commute", text: "Published fuel-economy figures can come from different test conditions. Traffic, load, speed, tires and maintenance affect consumption. Read the figure as a source-backed reference, not guaranteed daily mileage." },
    { title: "Tank range is a separate calculation", text: "Multiplying tank capacity by economy gives theoretical full-tank range, not usable range with a reserve. Do not plan to use the entire tank or assume two manufacturers used the same test procedure." },
    { title: "Measure and plan your own usage", text: "A record of actual fuel purchased and distance traveled is more useful for your budget. Enter a realistic figure in the commute planner and leave room for service, insurance and registration." },
  ], "economy", "/commute/cost-calculator"),
  [rec + "motorcycles-with-abs-philippines"]: make(["ABS explicitly recorded on at least one configuration", "Variant caveats remain visible", "CBS is not counted as ABS"], (b) => b.absListed === true, [
    { title: "Check the actual variant", text: "A model name can cover ABS and non-ABS trims. Read the brake-package wording and ask the dealer to confirm the exact unit. A family-level ABS label is not proof that every version is equipped the same way." },
    { title: "Do not confuse ABS and CBS", text: "Combined braking and anti-lock braking are different systems. A reference to CBS alone is not included here as ABS evidence. Ask for manufacturer information rather than relying on an ambiguous seller title." },
    { title: "Equipment does not replace riding technique", text: "ABS is not a promise that a motorcycle will prevent a crash or stop within a specific distance on every surface. Tires, condition, load, speed and training remain important." },
  ]),
  [rec + "beginner-friendly-motorcycles-philippines"]: make(["Known curb weight at or below 130 kg", "Published seat at or below 800 mm", "Recorded output at or below 20 hp", "A measurable research starting point, not a safety guarantee"], (b) => typeof b.weight === "number" && b.weight <= 130 && b.seat <= 800 && b.hp <= 20, everydayNotes, "weight", "/finder"),
  [rec + "best-motorcycles-for-daily-commute-philippines"]: make(["Known curb weight at or below 135 kg", "Automatic or utility-oriented model", "Weight order with price as a tie-breaker"], (b) => !!b.weight && b.weight <= 135 && (b.transmission === "Automatic" || b.category.includes("Underbone") || b.category.includes("Commuter")), everydayNotes, "weight", "/commute/cost-calculator"),
  [rec + "best-motorcycles-for-long-rides"]: make(["Known fuel capacity of at least 7 L", "Automatic scooters, road or touring-oriented models", "Largest recorded tank first; comfort still needs an in-person check"], (b) => !!b.tank && b.tank >= 7, categoryNotes, "tank", "/ownership/cost-calculator"),
  "/commute/heavy-traffic": make(["Known curb weight at or below 130 kg", "Automatic scooters or utility-oriented underbones", "No claim about filtering, travel time or crash risk"], (b) => !!b.weight && b.weight <= 130 && (b.transmission === "Automatic" || b.category.includes("Underbone")), everydayNotes, "weight", "/commute/cost-calculator"),
  "/commute/affordable-under-80k": make(["Published starting price below PHP 80,000", "Source-linked current records", "Gear, fees and running costs are additional"], (b) => b.priceFrom < 80000, budgetNotes, "price", "/commute/affordability"),
  "/commute/delivery-riders": make(["Recorded engine displacement at or below 175 cc", "Automatic, underbone or commuter model", "A practical research set, not platform eligibility or earnings advice"], (b) => b.cc <= 175 && (b.transmission === "Automatic" || b.category.includes("Underbone") || b.category.includes("Commuter")), everydayNotes, "price", "/commute/cost-calculator"),
  "/commute/passenger-commute": make(["Engine displacement of at least 150 cc", "Known fuel capacity at least 7 L", "ABS recorded on a configuration", "Passenger comfort and load limit must be checked in person"], (b) => b.cc >= 150 && !!b.tank && b.tank >= 7 && b.absListed === true, everydayNotes, "price", "/fitment"),
};

export function collectionModels(definition: Collection): CatalogBike[] {
  const list = catalog.filter(definition.filter);
  return list.sort((a, b) => {
    const metric = definition.order === "seat" ? a.seat - b.seat
      : definition.order === "weight" ? (a.weight ?? Infinity) - (b.weight ?? Infinity)
      : definition.order === "economy" ? (b.economy ?? 0) - (a.economy ?? 0)
      : definition.order === "tank" ? (b.tank ?? 0) - (a.tank ?? 0) : 0;
    return metric || a.priceFrom - b.priceFrom;
  });
}