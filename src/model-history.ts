export type ArchivedMotorcycle = {
  path: string; id: string; brand: string; name: string; generation: string;
  historicalPrice: number; priceContext: string; currentId: string;
  cc: number; hp: number; torque: number; seat: number; weight: number; tank: number;
  transmission: string; brakes: string; tires: [string, string]; economy: number; economyIsEstimate: boolean;
  introduction: string; checkpoints: string[]; serviceUrl: string;
};

export const archivedMotorcycles: ArchivedMotorcycle[] = [
  {
    path: "/motorcycles/yamaha/aerox-v2", id: "yamaha-aerox-v2", brand: "Yamaha", name: "Aerox V2", generation: "2021 Philippine generation",
    historicalPrice: 112900, priceContext: "Historical 2021 Philippine launch SRP for the Standard variant.", currentId: "yamaha-aerox-v3",
    cc: 155, hp: 15.4, torque: 13.9, seat: 790, weight: 125, tank: 5.5, transmission: "Not specified in the source record", brakes: "Variant-dependent; confirm the exact trim.", tires: ["110/80-14", "140/70-14"], economy: 40, economyIsEstimate: true,
    introduction: "The previous Aerox generation, commonly called V2 in the Philippines, remains useful research for owners and used-bike buyers. Its historical launch price and specifications belong to this generation, not the current V3.",
    checkpoints: ["Check whether the seller is offering a Standard or S variant.", "Verify the model year and identifiers against the OR/CR.", "Review CVT service records and inspect the belt and pulley system through a qualified technician.", "Do not apply V3 SP equipment claims to this V2 record."], serviceUrl: "https://aftersales.yamaha-motor.com.ph/",
  },
  {
    path: "/motorcycles/yamaha/nmax-v2", id: "yamaha-nmax-v2", brand: "Yamaha", name: "NMAX V2", generation: "2020-2021 Philippine generation",
    historicalPrice: 119900, priceContext: "Historical Philippine launch SRP for the Standard variant.", currentId: "yamaha-nmax-v3",
    cc: 155, hp: 15.4, torque: 13.9, seat: 765, weight: 129, tank: 7.1, transmission: "Not specified in the source record", brakes: "Variant-dependent; confirm the exact trim.", tires: ["110/70-13", "130/70-13"], economy: 40, economyIsEstimate: true,
    introduction: "The NMAX V2 is kept separate from the current NMAX V3 so an older launch price is never presented as today's new-bike offer. The 765 mm seat, 129 kg curb weight and 7.1 L tank describe this previous-generation record.",
    checkpoints: ["Verify the generation from the registration record, not just the seller's title.", "Confirm ABS equipment on the exact trim.", "Inspect service history, tires, brakes and charging-system condition.", "Compare the complete cost after overdue service and ownership transfer."], serviceUrl: "https://aftersales.yamaha-motor.com.ph/",
  },
  {
    path: "/motorcycles/honda/click-150i", id: "honda-click-150i", brand: "Honda", name: "Click 150i", generation: "2018-2022 Philippine generation",
    historicalPrice: 95900, priceContext: "Introductory Philippine launch SRP reported by Honda Philippines in 2018.", currentId: "honda-click-160",
    cc: 150, hp: 13, torque: 13.4, seat: 769, weight: 113, tank: 5.5, transmission: "Automatic", brakes: "Combined Braking System (CBS); ABS is not asserted for this generation.", tires: ["90/80-14", "100/80-14"], economy: 52, economyIsEstimate: false,
    introduction: "The 150cc Click generation launched in the Philippines in 2018 and was succeeded by the Click 160 in 2022. This is an owner and used-bike reference, not a current new-bike price listing.",
    checkpoints: ["Match the frame and engine identifiers to the original documents.", "Do not confuse CBS with ABS when reviewing seller claims.", "Check the correct 14-inch tire sizes, load ratings and wheel application.", "Review service history and inspect for crash, flood or electrical damage."], serviceUrl: "https://www.hondaph.com/service-calculator",
  },
  {
    path: "/motorcycles/honda/adv-150", id: "honda-adv-150", brand: "Honda", name: "ADV 150", generation: "2019-2022 Philippine generation",
    historicalPrice: 149000, priceContext: "Historical Philippine launch SRP. The ADV 150 was succeeded by the ADV 160.", currentId: "honda-adv-160",
    cc: 150, hp: 14.35, torque: 13.8, seat: 795, weight: 133, tank: 8, transmission: "Automatic", brakes: "Single-channel ABS with front and rear disc brakes; confirm the local unit.", tires: ["110/80-14", "130/70-13"], economy: 46.6, economyIsEstimate: false,
    introduction: "Honda's previous-generation adventure-style scooter has a 795 mm seat, 133 kg curb weight and an 8 L fuel tank. Compare its real condition and ownership history rather than treating the original launch price as a used valuation.",
    checkpoints: ["Confirm the exact Philippine generation and registered identifiers.", "Inspect suspension, brakes and underbody condition with a qualified mechanic.", "Check service documentation and the current transfer requirements.", "Do not read ground clearance as permission to cross floodwater."], serviceUrl: "https://www.hondaph.com/service-calculator",
  },
];

export type ModelFamily = { path: string; brand: string; name: string; currentIds: string[]; archiveIds: string[]; intro: string };
export const modelFamilies: ModelFamily[] = [
  { path: "/motorcycles/yamaha/aerox", brand: "Yamaha", name: "Aerox", currentIds: ["yamaha-aerox-v3"], archiveIds: ["yamaha-aerox-v2"], intro: "Start with the generation. Compare current Aerox V3 pricing with the separate V2 owner record, without mistaking a historical launch SRP for a current seller quote." },
  { path: "/motorcycles/yamaha/nmax", brand: "Yamaha", name: "NMAX", currentIds: ["yamaha-nmax-v3"], archiveIds: ["yamaha-nmax-v2"], intro: "The NMAX name covers different generations. Keep each price tied to the correct motorcycle, then compare dimensions, equipment and the actual used-bike condition." },
  { path: "/motorcycles/honda/click", brand: "Honda", name: "Click", currentIds: ["honda-click-125i", "honda-click-160"], archiveIds: ["honda-click-150i"], intro: "Click 125i, Click 150i and Click 160 are not interchangeable specifications. Explore the current choices and the earlier 150i record in one clear family guide." },
  { path: "/motorcycles/honda/adv", brand: "Honda", name: "ADV", currentIds: ["honda-adv-160"], archiveIds: ["honda-adv-150"], intro: "Research the ADV 160 and its earlier ADV 150 generation with their own prices, dimensions and equipment. Adventure styling does not replace an in-person fit check." },
];

export const archiveByPath = new Map(archivedMotorcycles.map((bike) => [bike.path, bike]));
export const familyByPath = new Map(modelFamilies.map((family) => [family.path, family]));