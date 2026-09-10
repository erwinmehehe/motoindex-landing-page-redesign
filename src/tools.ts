export type NumberField = { key: string; label: string; unit?: string; value: number; min: number; max: number; step?: number };
export type ToolResult = { value: number; label: string; suffix?: string; unit?: string; rows: [string, number, string?][]; explanation: string };
export type ToolDefinition = { title: string; eyebrow: string; description: string; icon: string; fields: NumberField[]; calculate: (values: Record<string, number>, method: string) => ToolResult };
const field = (key: string, label: string, value: number, min: number, max: number, unit = "PHP", step = 1): NumberField => ({ key, label, value, min, max, unit, step });

export function monthlyPayment(principal: number, annualRate: number, months: number) {
  if (principal <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const rate = annualRate / 1200;
  return principal * rate / (1 - Math.pow(1 + rate, -months));
}

export const toolDefinitions: Record<string, ToolDefinition> = {
  "/tools/motorcycle-loan-calculator": {
    title: "Know every peso before you sign.", eyebrow: "Motorcycle loan calculator", icon: "calculator", description: "Go beyond the monthly payment. See the down payment, interest, fees and full amount payable together.",
    fields: [field("price", "Purchase price", 125900, 1, 5000000), field("down", "Down payment", 20, 0, 100, "%"), field("months", "Loan term", 36, 1, 120, "months"), field("rate", "Annual interest input", 12, 0, 100, "%", 0.1), field("fees", "Fees paid upfront", 3500, 0, 1000000)],
    calculate: (v, method) => {
      const dp = v.price * v.down / 100;
      const financed = v.price - dp;
      const payment = method === "flat" ? (financed + financed * v.rate / 100 * v.months / 12) / v.months : monthlyPayment(financed, v.rate, v.months);
      return { value: payment, label: "Estimated monthly payment", suffix: "/ month", rows: [["Down payment", dp], ["Amount financed", financed], ["Total interest", Math.max(0, payment * v.months - financed)], ["Fees paid upfront", v.fees], ["Total amount payable", dp + payment * v.months + v.fees]], explanation: method === "flat" ? "Flat / add-on interest is calculated on the original principal for the entire term. This input is not an effective APR. Fees are paid upfront, not financed." : "Standard monthly amortization using the nominal annual rate divided by 12. Fees are paid upfront and excluded from the financed principal; this is not an all-in effective APR." };
    },
  },
  "/ownership/cost-calculator": {
    title: "The whole cost. Not just the bike.", eyebrow: "Ownership cost estimator", icon: "wallet", description: "Build a monthly budget for fuel, service, tires, paperwork and your actual finance payment.",
    fields: [field("distance", "Distance per month", 900, 0, 20000, "km"), field("economy", "Fuel economy assumption", 40, 1, 150, "km/L", 0.1), field("fuel", "Fuel price", 65, 0, 500, "PHP/L", 0.1), field("maintenance", "Maintenance reserve", 650, 0, 20000), field("insurance", "Insurance per year", 4500, 0, 100000), field("registration", "Registration per year", 1800, 0, 20000), field("tires", "Tire reserve per year", 3500, 0, 100000), field("loan", "Actual monthly loan payment", 0, 0, 200000)],
    calculate: (v) => { const fuel = v.distance / v.economy * v.fuel; const running = fuel + v.maintenance + (v.insurance + v.registration + v.tires) / 12; return { value: running + v.loan, label: "Monthly ownership budget", suffix: "/ month", rows: [["Fuel", fuel], ["Maintenance reserve", v.maintenance], ["Insurance + registration reserve", (v.insurance + v.registration) / 12], ["Tire reserve", v.tires / 12], ["Finance payment", v.loan], ["12-month budget", (running + v.loan) * 12]], explanation: "Fuel economy and annual charges are editable planning assumptions. Purchase price, down payment, depreciation, parking, tolls, repairs and accessories are not included in this monthly budget." }; },
  },
  "/commute/cost-calculator": {
    title: "Make your daily ride add up.", eyebrow: "Commute cost calculator", icon: "route", description: "Compare your motorcycle running budget with the commute you are paying for today.",
    fields: [field("distance", "Round-trip daily distance", 20, 0, 1000, "km"), field("days", "Commute days per month", 22, 1, 31, "days"), field("economy", "Fuel economy assumption", 40, 1, 150, "km/L"), field("fuel", "Fuel price", 65, 0, 500, "PHP/L", 0.1), field("parking", "Parking per day", 30, 0, 2000), field("maintenance", "Monthly maintenance reserve", 650, 0, 20000), field("transit", "Current round-trip commute", 120, 0, 10000, "PHP/day")],
    calculate: (v) => { const fuel = v.distance * v.days / v.economy * v.fuel; const total = fuel + v.parking * v.days + v.maintenance; return { value: total, label: "Motorcycle commute running cost", suffix: "/ month", rows: [["Monthly distance", v.distance * v.days, "km"], ["Fuel", fuel], ["Parking", v.parking * v.days], ["Maintenance reserve", v.maintenance], ["Your current commute", v.transit * v.days], ["Current cost minus motorcycle cost", v.transit * v.days - total]], explanation: "A positive difference means the entered commute costs more than this running estimate. Purchase price, finance, insurance, registration, gear and repairs are excluded; this is not a savings guarantee." }; },
  },
  "/commute/affordability": {
    title: "Find your comfortable ceiling.", eyebrow: "Affordability planner", icon: "wallet", description: "Work backward from your own monthly budget instead of a tempting showroom payment.",
    fields: [field("income", "Monthly take-home pay", 35000, 1, 10000000), field("cap", "Your chosen transport cap", 15, 1, 100, "%"), field("running", "Monthly running-cost reserve", 2000, 0, 1000000), field("down", "Available down payment", 30000, 0, 5000000), field("rate", "Nominal annual interest", 12, 0, 100, "%", 0.1), field("months", "Loan term", 36, 1, 120, "months")],
    calculate: (v) => { const cap = v.income * v.cap / 100; const payment = Math.max(0, cap - v.running); const principal = payment === 0 ? 0 : payment / monthlyPayment(1, v.rate, v.months); return { value: principal + v.down, label: "Estimated purchase-price ceiling", rows: [["Your monthly transport cap", cap], ["Running-cost reserve", v.running], ["Available monthly loan budget", payment], ["Estimated financed amount", principal], ["Available down payment", v.down]], explanation: "This follows your chosen cap, not a recommended debt-to-income ratio. It excludes loan fees and other debts. Keep emergency savings separate and obtain an actual lender quote." }; },
  },
  "/tools/lto-registration-fee-calculator": {
    title: "Plan the paperwork budget.", eyebrow: "LTO registration fee planner", icon: "doc", description: "Add your assessed charges. Keep variable costs visible instead of relying on a single universal renewal price.",
    fields: [field("mvuc", "MVUC from your assessment", 240, 0, 20000), field("inspection", "Inspection / emissions", 500, 0, 10000), field("ctpl", "Actual CTPL quote", 0, 0, 20000), field("other", "Other assessed charges", 0, 0, 100000)],
    calculate: (v) => ({ value: v.mvuc + v.inspection + v.ctpl + v.other, label: "Registration planning total", rows: [["Entered MVUC", v.mvuc], ["Inspection / emissions", v.inspection], ["CTPL quote", v.ctpl], ["Other charges", v.other]], explanation: "PHP 240 is the core motorcycle MVUC reference on the original source dated August 25, 2026. Replace it with your current assessment, especially for sidecar status or different transactions. Late fees and other charges are not inferred automatically." }),
  },
  "/tools/motorcycle-insurance-calculator": {
    title: "Budget for cover. Check the exclusions.", eyebrow: "Insurance budget estimator", icon: "shield", description: "Use a quoted premium rate and disclosed fees to estimate your insurance budget, not a promise of coverage.",
    fields: [field("value", "Insured value", 125900, 1, 5000000), field("rate", "Quoted annual premium rate", 3, 0, 100, "%", 0.1), field("fees", "Quoted taxes and fees", 0, 0, 100000), field("ctpl", "Separate CTPL premium", 0, 0, 20000)],
    calculate: (v) => { const base = v.value * v.rate / 100; return { value: base + v.fees + v.ctpl, label: "Illustrative annual insurance budget", suffix: "/ year", rows: [["Premium at entered rate", base], ["Taxes and fees entered", v.fees], ["Separate CTPL premium", v.ctpl], ["Monthly reserve", (base + v.fees + v.ctpl) / 12]], explanation: "The default 3% is an example, not a market quote. Insurers determine eligibility, premium, exclusions, limits and deductibles. Do not double-count CTPL if it is already included in a quotation." }; },
  },
  "/tools/electric-motorcycle-charging-cost": {
    title: "What will plugging in really cost?", eyebrow: "Electric charging-cost calculator", icon: "bolt", description: "Use your electricity tariff, charging efficiency and riding distance to see a practical energy budget.",
    fields: [field("battery", "Battery energy", 2.5, 0.1, 100, "kWh", 0.1), field("tariff", "Electricity tariff", 12, 0, 100, "PHP/kWh", 0.1), field("efficiency", "Charging efficiency assumption", 85, 1, 100, "%"), field("consumption", "Energy use assumption", 40, 1, 1000, "Wh/km"), field("distance", "Monthly distance", 900, 0, 20000, "km")],
    calculate: (v) => { const energy = v.distance * v.consumption / 1000 / (v.efficiency / 100); return { value: energy * v.tariff, label: "Estimated monthly electricity", suffix: "/ month", rows: [["Full-capacity charge from empty", v.battery / (v.efficiency / 100) * v.tariff], ["Cost per 100 km", v.consumption / 10 / (v.efficiency / 100) * v.tariff], ["Monthly wall energy", energy, "kWh"]], explanation: "Charging losses are included using your efficiency input. Standby use, public charging fees and fixed utility charges are excluded. Use the supplied charger and a suitable electrical installation." }; },
  },
  "/tools/electric-motorcycle-range-calculator": {
    title: "Plan your range with room to spare.", eyebrow: "Electric range calculator", icon: "route", description: "Turn battery capacity and an energy-use assumption into a range estimate with an explicit reserve.",
    fields: [field("battery", "Nominal battery energy", 2.5, 0.1, 100, "kWh", 0.1), field("usable", "Usable capacity assumption", 90, 1, 100, "%"), field("reserve", "Keep in reserve", 15, 0, 99, "%"), field("consumption", "Energy consumption assumption", 40, 1, 1000, "Wh/km")],
    calculate: (v) => { const usable = v.battery * v.usable / 100; const range = usable * 1000 * (1 - v.reserve / 100) / v.consumption; return { value: range, unit: "km", label: "Planning range after reserve", rows: [["Usable battery energy", usable, "kWh"], ["Reserved energy", usable * v.reserve / 100, "kWh"], ["Range before reserve", usable * 1000 / v.consumption, "km"]], explanation: "A planning estimate, not a promised range. Speed, payload, hills, temperature, tire pressure and battery condition change consumption. Manufacturer safety and charging guidance always applies." }; },
  },
};