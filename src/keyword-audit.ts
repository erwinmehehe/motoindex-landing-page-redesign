import { catalog, bikePath } from "./catalog";
import { colorById } from "./color-records";
import { allBrands, brandPath } from "./brands";
import { helmets } from "./helmet-catalog";
import { modelFamilies, archivedMotorcycles } from "./model-history";

export type KeywordInput = { keyword: string; country: string; volume: number | null; kd: number | null; competitorUrl: string };
export type GapAction = "new" | "restored" | "covered" | "review" | "exclude";
export type AuditedKeyword = KeywordInput & { action: GapAction; path?: string; reason: string; basis: "Reviewed cluster" | "Suggested mapping" };
export const actionLabels: Record<GapAction, string> = { new: "New page built", restored: "Restored locally", covered: "Use existing page", review: "Needs research", exclude: "Outside this scope" };
export const sheetId = "1bZ4fs9e_BHOWw9-iyLmokL44RZ5595adH55ObIavq-w";
export const sheetGid = "1933668074";
export const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=${sheetGid}`;
export const keywordExportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?gid=${sheetGid}&headers=1&tqx=out:csv&tq=${encodeURIComponent("select A,B,M,N,T")}`;
export const spreadsheetScope = { totalRows: 30000, philippinesRows: 25493, candidateRows: 11108, prioritizedRowsRead: 600, note: "Candidate query: country PH and competitor URL contains 'motorcycle' or keyword contains 'helmet'. This is a relevance screen, not proof of a gap. It can miss motorcycle terms ranking on a homepage." };
const z = "https://www.zigwheels.ph";
type Seed = [string, number, number, GapAction, string | null, string, string?, string?];

const seeds: Seed[] = [
  ["mio gravis",10000,0,"new","/motorcycles/yamaha/mio-gravis","Distinct local model page added with a Standard reference and explicit variant caveats.","/"],
  ["yamaha mio gravis",4200,0,"new","/motorcycles/yamaha/mio-gravis","Same model intent; use the same canonical model page.","/compare-motorcycles/yamaha-mio-gear-vs-yamaha-mio-gravis"],
  ["mio gravis price",4100,30,"new","/motorcycles/yamaha/mio-gravis","Published starting price and variant-source distinction on the model page.","/"],
  ["mio soul i 125",9700,0,"new","/motorcycles/yamaha/mio-soul-i-125","New model record with Standard/S price context; no duplicate spelling pages.","/compare-motorcycles/yamaha-mio-gear-vs-yamaha-mio-soul-i-125"],
  ["mio soul i 125 price",2000,0,"new","/motorcycles/yamaha/mio-soul-i-125","Keep the price intent on the same model record.","/new-motorcycles/yamaha/mio-soul-i-125"],
  ["suzuki scooter",3600,20,"new","/recommendations/suzuki-scooters-philippines","Missing Suzuki scooter-specific collection built from existing model records.","/new-motorcycles/suzuki+scooter"],
  ["suzuki scooter price philippines",500,0,"new","/recommendations/suzuki-scooters-philippines","One brand/category price table covers this variation.","/new-motorcycles/suzuki"],
  ["suzuki scooters",300,19,"new","/recommendations/suzuki-scooters-philippines","Plural variation consolidated into the same collection.","/new-motorcycles/suzuki"],
  ["scrambler motorcycle",2600,10,"new","/recommendations/scrambler-motorcycles-philippines","Named style-led shortlist with an explicit off-road capability caveat.","/new-motorcycles/best-cafe-racer"],
  ["scrambler motorcycle philippines",200,4,"new","/recommendations/scrambler-motorcycles-philippines","Local shortlist and a linked scrambler-versus-cafe guide, not a copied competitor landing page.","/truck-news/nlex-continues-road-safety-push-with-biyahero-2024-caravan"],
  ["cruiser motorcycle",2000,32,"new","/recommendations/cruiser-motorcycles-philippines","Dedicated cruiser category was absent from the local guide library.","/upcoming-motorcycles/cruiser"],
  ["cruiser motorcycle philippines",400,32,"new","/recommendations/cruiser-motorcycles-philippines","Same intent as the cruiser collection; do not split into near-duplicate URLs.","/new-motorcycles/best-cruiser"],
  ["manual motorcycle",1400,20,"new","/recommendations/manual-motorcycles-philippines","Manual-transmission collection with exact-clutch-layout guidance.","/new-motorcycles/40000-60000"],
  ["manual motorcycle philippines",350,45,"new","/recommendations/manual-motorcycles-philippines","Same collection; variants handled as filters and model links.","/best-motorcycles"],
  ["types of motorcycles",1500,2,"new","/guides/types-of-motorcycles","Substantive category explainer with linked model research.","/best-motorcycles"],
  ["honda click v4",35000,53,"new","/guides/honda-click-generations","Explain ambiguous seller generation labels; do not invent a V4 specification or redirect to an unrelated model."],
  ["honda click 125i v4",5800,43,"new","/guides/honda-click-generations","Same generation-identification guide; document evidence before creating a claimed new model."],
  ["click v1",3900,0,"new","/guides/honda-click-generations","Historical version query addressed through identity checks; not a fabricated current offer.","/new-motorcycles/honda/click-125i-2016-2017/new"],
  ["yamaha r6 price philippines",2400,0,"new","/guides/yamaha-r6-price-philippines","Competitor R7 URL does not answer R6 intent. New guide separates used, import and track-only context; no unverified PH SRP.","/new-motorcycles/yamaha/yzf-r7"],
  ["yamaha r6 price",450,11,"new","/guides/yamaha-r6-price-philippines","One R6 guide covers this variation without borrowing an R7 price.","/compare-motorcycles/kawasaki-ninja-zx-6r-vs-yamaha-yzf-r7"],
  ["tmax price philippines",4400,0,"new","/guides/yamaha-tmax-price-philippines","New evidence-led guide distinguishes historical 530cc, Standard and Tech Max listings.","/motorcycle-feature-stories/yamaha-tmax-top-3-reasons-to-buy"],
  ["tmax price",1000,0,"new","/guides/yamaha-tmax-price-philippines","Same price-context guide; conflicting displacement claims are disclosed, not copied as fact.","/new-motorcycles/yamaha/tmax"],
  ["xmax 400cc",2400,55,"new","/guides/yamaha-xmax-300-vs-400","Clarify that the recorded Philippine XMAX is 292cc, not a 400cc unit."],
  ["yamaha xmax 400cc price philippines",1700,31,"new","/guides/yamaha-xmax-300-vs-400","Do not attach 400cc or toll-road claims to a 292cc local record."],
  ["honda rs 150",1600,0,"new","/guides/honda-rs150r-price-philippines","Discontinued-model buying guide; old price references are not current stock or a used valuation.","/new-motorcycles/honda/rs150r/faq/what-are-the-pros-and-cons-of-honda-rs150r"],
  ["rs 150 price philippines",350,53,"new","/guides/honda-rs150r-price-philippines","Same historical price-context guide; do not replace with Winner X pricing.","/"],
  ["ninja 400 price philippines",6800,0,"restored","/motorcycles/kawasaki/ninja-400","Existing live MotoIndex page found; restored in the app, not a new SEO URL.","/new-motorcycles/kawasaki/ninja-400"],
  ["kawasaki ninja 400 price philippines",3200,2,"restored","/motorcycles/kawasaki/ninja-400","Same existing model URL; retain its original intent and dated reference.","/new-motorcycles/kawasaki/ninja-400"],
  ["honda navi",51000,0,"restored","/motorcycles/honda/navi","Live model page already exists. Local catalog coverage, not original-site page count, was the gap."],
  ["honda navi price",21000,0,"restored","/motorcycles/honda/navi","Restored existing source record; do not make city price clones from competitor URLs.","/new-motorcycles/honda/navi/price-muntinlupa"],
  ["honda beat",29000,21,"restored","/motorcycles/honda/beat","Existing live BeAT record restored in local browsing and comparison."],
  ["aerox v3 colors",12000,36,"restored","/motorcycles/yamaha/aerox-v3/colors","Live color page already exists. Restored names and limitations locally, without invented paint swatches.","/"],
  ["honda click 125i v3 colors",6600,53,"restored","/motorcycles/honda/click-125i/colors","Existing color reference restored; exact generation and dealer stock still need checking.","/new-motorcycles/honda/click-125i/colors"],
  ["nmax v3 colors",2200,0,"restored","/motorcycles/yamaha/nmax-v3/colors","Existing local intent restored with four recorded color names."],
  ["adv 160 black",5500,24,"restored","/motorcycles/honda/adv-160/colors","Model-specific color page with ABS/RoadSync mapping, not one page per paint keyword."],
  ["pcx 160 price",18000,0,"covered","/motorcycles/honda/pcx-160","Already covered by the model record. Improve source and variant clarity rather than duplicate the page.","/new-motorcycles/honda/pcx160/user-reviews/exellent-honda-pcx160"],
  ["aerox v3 price philippines",41000,0,"covered","/motorcycles/yamaha/aerox-v3","Existing model and variant pricing covers this intent.","/new-motorcycles/yamaha/mio-aerox/sp"],
  ["aerox v3",107000,0,"covered","/motorcycles/yamaha/aerox-v3","Keep one strong exact-generation canonical page.","/new-motorcycles/yamaha/mio-aerox/colors"],
  ["nmax v3 price philippines",14000,0,"covered","/motorcycles/yamaha/nmax-v3","Existing current-generation price reference and planner.","/new-motorcycles/yamaha/nmax/price"],
  ["yamaha motorcycle philippines price list",4800,0,"covered","/motorcycles/yamaha","Existing brand price table is the appropriate destination, not a city-level scooter page.","/new-motorcycles/yamaha/mio-gear/price-paranaque"],
  ["honda motorcycle philippines price list",6800,60,"covered","/motorcycles/honda","Use the existing Honda brand guide and price table.","/new-motorcycles/honda"],
  ["honda click 125i downpayment and monthly",4500,43,"covered","/motorcycles/honda/click-125i/installment","Existing local finance page includes term, interest and down payment.","/new-motorcycles/honda/click-125i/price"],
  ["motorcycle loan calculator",8300,53,"covered","/tools/motorcycle-loan-calculator","Existing tool already matches the intent; no duplicate calculator URL.","/new-motorcycles/loan-emi-calculator"],
  ["gixxer sf 155",8100,0,"covered","/motorcycles/suzuki/gixxer-sf-155","Exact local model page exists.","/new-motorcycles/suzuki/gixxer-sf-155"],
  ["honda click 160 price",7700,0,"covered","/motorcycles/honda/click-160","Keep the price and product identity together.","/new-motorcycles/honda/click-160"],
  ["honda click 150i price",4900,0,"covered","/motorcycles/honda/click-150i","Existing archive explains historical launch pricing instead of advertising it as current stock.","/new-motorcycles/honda/click-150i/price"],
  ["adv 150 price philippines",3900,0,"covered","/motorcycles/honda/adv-150","Existing historical model page. Do not silently substitute ADV160 specs.","/"],
  ["big bike price philippines",3100,0,"covered","/recommendations/motorcycles-400cc-plus-philippines","Existing displacement-based collection covers the price-list intent.","/new-motorcycles/big-bikes"],
  ["electric motorcycle philippines",2000,3,"covered","/motorcycles/electric","Existing electric catalog separates battery-subscription and ownership costs.","/new-motorcycles/scooter+electric"],
  ["honda giorno price",13000,0,"covered","/motorcycles/honda/giorno-plus","Keep the exact Philippine Giorno+ model identity visible.","/new-motorcycles/honda/giorno/price-caloocan"],
  ["raider 150 fi price philippines",8900,43,"covered","/motorcycles/suzuki/raider-r150","Existing FI record; do not mix carbureted variants.","/new-motorcycles/suzuki/raider-r150-fi"],
  ["zontes 400g price philippines",4300,0,"covered","/motorcycles/zontes/400g","Existing Zontes model route; competitor Bristol path is not a reason to rename it.","/new-motorcycles/bristol/zontes-400g/price"],
  ["motorcycle philippines price list",2300,61,"covered","/motorcycles","Existing catalog with current-record context and filters.","/new-motorcycles"],
  ["aerox price philippines",14000,1,"covered","/motorcycles/yamaha/aerox","Existing generation-family guide avoids merging V2 and V3.","/new-motorcycles/yamaha/mio-aerox/price"],
  ["vespa",21000,8,"covered","/motorcycles/vespa","Existing brand guide; navigational brand term needs no duplicate page.","/new-motorcycles/vespa"],
  ["sniper 155",55000,12,"covered","/motorcycles/yamaha/sniper-155","Existing exact-model page rather than a different-generation comparison.","/compare-motorcycles/yamaha-sniper-150-vs-yamaha-sniper-155"],
  ["gas prices near me",8400,1,"review",null,"Requires a reliable location-specific live fuel dataset. A static calculator cannot satisfy nearby-price intent.","/fuel-price"],
  ["adv 350 price philippines",4400,0,"review",null,"Research a dated Philippine model record and reconcile source discrepancies before building a price page."],
  ["crf 250 price philippines",3400,0,"review",null,"Disambiguate CRF250L, Rally and competition models, then verify local generation and pricing.","/compare-motorcycles/honda-crf250-rally-vs-honda-crf250l"],
  ["aerox v4",5100,0,"review",null,"Unverified generation label. Do not invent a new model, release date or SRP."],
  ["yamaha r15",7600,43,"review",null,"R15 and R15M are not automatically the same exact model. Establish the intended generation."],
  ["sniper 150",8600,28,"review",null,"Needs a separate, source-backed historical generation record; do not redirect to Sniper155."],
  ["mio soulty",5200,28,"review",null,"Ambiguous model wording. The competitor points to Mio Sporty, not Soul i125; do not map by substring alone.","/new-motorcycles/yamaha/mio-sporty"],
  ["yamaha r1 price philippines",2900,0,"review",null,"R1 and R1M need distinct configuration evidence; do not borrow the R1M price without explaining it.","/new-motorcycles/yamaha/yzf-r1m"],
  ["tricycle",25000,0,"review",null,"Separate three-wheeler and local regulatory research needed; do not publish a motorcycle clone.","/new-three-wheelers/best-tricycle"],
  ["ko44.e3op model size",2400,0,"exclude",null,"Unrelated/low-quality query with no established motorcycle identity. Exclude from publication."],
  ["zigwheels",3000,7,"exclude",null,"Competitor-brand navigational query, not MotoIndex rider intent.","/"],
  ["zigwheels ph",1600,0,"exclude",null,"Competitor navigational variation; do not create an impersonating doorway page.","/"],
  ["kia sonet price philippines",8300,0,"exclude",null,"Passenger-car intent outside the motorcycle content scope.","/compare-cars/kia-sonet-vs-toyota-coaster"],
  ["byd price philippines",9600,0,"exclude",null,"Car-price intent; no motorcycle page should be generated for it.","/new-cars/byd/promo-lian"],
  ["toyota veloz",26000,0,"exclude",null,"Passenger-car topic unrelated to the motorcycle index.","/new-cars/toyota/veloz"],
  ["nmax 2026",25000,0,"exclude",null,"This row is for Colombia, not the Philippine price/specification market.","/new-motorcycles/yamaha/nmax","CO"],
];

export const reviewedKeywords: AuditedKeyword[] = seeds.map(([keyword, volume, kd, action, path, reason, competitorPath, country]) => ({ keyword, volume, kd, action, ...(path ? { path } : {}), reason, competitorUrl: competitorPath ? z + competitorPath : "", country: country || "PH", basis: "Reviewed cluster" }));
const normalize = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();
const reviewed = new Map(reviewedKeywords.map((row) => [`${normalize(row.keyword)}|${row.country}`, row]));
const contains = (query: string, phrase: string) => ` ${query} `.includes(` ${normalize(phrase)} `);
const orderedHelmets = [...helmets].sort((a, b) => b.model.length - a.model.length);
const orderedModels = [...catalog].sort((a, b) => b.model.length - a.model.length);

export function auditKeyword(input: KeywordInput): AuditedKeyword {
  const exact = reviewed.get(`${normalize(input.keyword)}|${input.country.toUpperCase()}`);
  if (exact) return { ...exact, ...input, competitorUrl: input.competitorUrl || exact.competitorUrl };
  const keyword = normalize(input.keyword);
  const base = { ...input, basis: "Suggested mapping" as const };
  const suggest = (path: string, reason: string): AuditedKeyword => ({ ...base, action: "covered", path, reason });
  if (input.country && input.country.toUpperCase() !== "PH") return { ...base, action: "exclude", reason: "Non-PH export row. Do not apply Philippine prices or regulations to this market without a localized review." };
  if (!input.country) return { ...base, action: "review", reason: "Country is missing. Confirm the target market before assigning a Philippine page." };
  if (/\b(zigwheels|carmudi|motodeal|toyota|kia|hyundai|tesla|byd|innova|avanza|veloz|vios|rolls royce|aurelio|geely|jetour)\b/.test(keyword)) return { ...base, action: "exclude", reason: "Likely competitor navigation or passenger-car intent. Review the source query before publication." };
  if (/\b(vs|versus|compare)\b/.test(keyword)) return { ...base, action: "review", reason: "Comparison intent requires an exact pair and generation review; do not assign one model automatically." };
  if (/\b(near me|2027|2028|v4|v5|v6)\b/.test(keyword)) return { ...base, action: "review", reason: "Location, future-year or unverified generation modifier needs evidence before mapping or publication." };
  const old = archivedMotorcycles.find((bike) => contains(keyword, bike.name));
  if (old) return suggest(old.path, "Possible historical-model intent. Check year and transaction context before using an old launch price.");
  const helmet = orderedHelmets.find((h) => contains(keyword, `${h.brand} ${h.model}`));
  if (helmet) return suggest(`/gear/helmets/${helmet.slug}`, "Exact brand/model phrase matches an existing local helmet page. Confirm modifiers manually.");
  const model = orderedModels.find((bike) => contains(keyword, `${bike.brand} ${bike.model}`) || (normalize(bike.model).length > 5 && contains(keyword, bike.model)));
  if (model) {
    const topic = /\b(colou?r|colou?rs)\b/.test(keyword) ? "colors" : /\b(downpayment|installment|monthly|down payment)\b/.test(keyword) ? "installment" : /\b(specs|specifications)\b/.test(keyword) ? "specs" : "";
    if (topic === "colors" && !colorById.has(model.id)) return { ...base, action: "review", reason: "Model exists but this color record is not verified. Do not invent paint names or swatches.", path: bikePath(model) };
    return suggest(`${bikePath(model)}${topic ? `/${topic}` : ""}`, "Possible existing exact-model intent. This is an automated suggestion, not confirmed keyword coverage or ranking evidence.");
  }
  const profile = allBrands.find((brand) => contains(keyword, brand.name) && (brand.kind === "helmet" ? contains(keyword, "helmet") || contains(keyword, "helmets") : /\b(motorcycle|motorcycles|price list)\b/.test(keyword)));
  if (profile) return suggest(brandPath(profile), "Possible brand-hub intent. Check whether the query actually requests a specific model.");
  const family = modelFamilies.find((family) => contains(keyword, family.name));
  if (family) return suggest(family.path, "Family-level wording detected; check exact generation rather than merging model records.");
  if (contains(keyword, "motorcycle loan calculator")) return suggest("/tools/motorcycle-loan-calculator", "Existing calculator covers the basic financing-tool intent.");
  if (contains(keyword, "motorcycle brands")) return suggest("/brands", "Existing brand directory is the natural hub.");
  return { ...base, action: "review", reason: "No confident mapping. Research the search intent, live pages and product evidence; unmatched is not proof of a genuine SEO gap." };
}