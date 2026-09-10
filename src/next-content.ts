import type { ArticleBody, ResearchPage } from "./content";

export const nextPages: ResearchPage[] = [
  { href: "/guides/buy-helmet-online-philippines", title: "How to buy a motorcycle helmet online in the Philippines", desc: "A practical Shopee and Lazada checklist: exact model, size, seller checks, returns and what to inspect on arrival.", topic: "maintenance", icon: "helmet" },
  { href: "/guides/fake-helmets-shopee-lazada", title: "How to spot fake motorcycle helmets on Shopee and Lazada", desc: "Red flags, price traps, listing photos and the unit-level checks that matter more than a store badge.", topic: "maintenance", icon: "shield" },
  { href: "/guides/first-motorcycle-buying-checklist", title: "First motorcycle buying checklist for the Philippines", desc: "Budget, license, fit, gear, dealer quotes and paperwork — in the order that actually prevents expensive mistakes.", topic: "guides", icon: "check" },
  { href: "/guides/how-to-read-a-motorcycle-dealer-quote", title: "How to read a motorcycle dealer quote", desc: "Separate SRP, cash price, fees, insurance, registration and financing so a low monthly payment cannot hide the total.", topic: "ownership", icon: "wallet" },
  { href: "/affiliate-disclosure", title: "Affiliate disclosure", desc: "How MotoIndex uses Involve Asia, Shopee and Lazada shop links, and what commissions never change.", topic: "about", icon: "tag" },
];

const dti = { label: "DTI-BPS: PS and ICC marks", href: "https://bps.dti.gov.ph/product-certification/ps-and-icc-marks" };

export const nextEditorial: Record<string, ArticleBody> = {
  "/guides/buy-helmet-online-philippines": {
    originalSource: false, takeaways: ["Search the exact model and size, not a brand nickname.", "A marketplace listing is not a certified unit until you inspect it.", "Keep the return window open until fit and markings are checked."],
    sections: [
      { title: "Start from a researched model, not a sponsored listing", text: ["Open the MotoIndex model page first. Confirm the format, recorded sizes and whether a published price exists. Then use the Shop buttons to search Shopee PH and Lazada PH for that exact name.", "A sponsored carousel item can be a different graphic, an older batch or an unrelated lookalike. Match brand, model code and size before adding to cart."] },
      { title: "Read the listing like a product record", text: ["Check the seller name, rating, sold count, location and return policy. Official or flagship stores are a useful starting point, but they still require the same unit-level checks.", "Read whether the price includes a spare visor, bag or intercom. Bundles change value; they do not change whether the helmet fits your head."], checks: ["Exact brand, model and size in the listing title.", "Seller identity and return window confirmed.", "Photos show the actual product, not only a catalogue shot.", "Price compared on both Shopee and Lazada before paying."] },
      { title: "Size still comes from the model's chart", text: ["Enter your head circumference in centimetres and use the manufacturer's chart for that helmet. A Medium in one shell family is not a Medium in another.", "If you fall between sizes, prefer trying both in person. Online, keep tags on until the crown, cheeks and retention strap feel right after several minutes."] },
      { title: "Inspect the parcel before you commit", text: ["Photograph the sealed package, then the helmet, labels and visor. Check for cracks, uneven paint, loose lining, a weak visor latch or a damaged strap.", "Look for the applicable PS or ICC marking and the certification label on the unit in your hands. A marketplace badge is not that marking. If anything is off, use the platform return process while the window is open."] },
      { title: "After it fits, keep the evidence", text: ["Save the order, receipt and model details with your garage notes. Replacement visors and cheek pads are model-specific.", "Follow the maker's cleaning and replacement guidance. An impact, even when the shell looks intact, is a reason to seek manufacturer advice rather than keep riding the same helmet."] },
    ],
    faqs: [
      { q: "Is buying a helmet online safe in the Philippines?", a: "It can be practical if you verify the exact model, seller, size chart, return terms and the markings on the unit you receive. Online convenience does not replace those checks." },
      { q: "Should I buy the cheapest listing of a familiar name?", a: "No. Price can reflect a different graphic, a used or grey-market unit, missing accessories or a counterfeit. Compare the exact configuration." },
    ],
    sources: [dti, { label: "MotoIndex helmet catalog", href: "https://motoindexph.com/gear/helmets" }],
    related: [{ label: "Helmet size and fit guide", href: "/guides/motorcycle-helmet-size-guide" }, { label: "Spot fake helmets", href: "/guides/fake-helmets-shopee-lazada" }, { label: "Browse helmets under PHP 5,000", href: "/gear/helmets/under-5000" }],
  },
  "/guides/fake-helmets-shopee-lazada": {
    originalSource: false, takeaways: ["A famous logo at an impossible price is a warning, not a bargain.", "Certification is on the unit, not in a seller's caption.", "Keep the return window until the physical helmet is inspected."],
    sections: [
      { title: "Why counterfeits show up in marketplace search", text: ["Shopee and Lazada search results mix official stores, authorised sellers and unrelated shops. A listing can reuse catalogue photos while shipping a different shell.", "Premium names such as Shoei, Arai, AGV and some race graphics are frequent targets. Value brands can be copied too. Treat every unit as unverified until you inspect it."] },
      { title: "Red flags in the listing", text: ["Prices far below the published reference, stock photos only, vague model names, mixed brand logos, 'original replica' wording, or a seller with almost no motorcycle-gear history deserve extra caution.", "Count sold items and reviews that mention size, visor and delivery — not only five-star emojis. Ask the seller for close-ups of the certification label and retention buckle before paying."], checks: ["Price compared with the dated MotoIndex reference.", "Seller identity and history reviewed.", "Model name matches a real product record.", "Return policy long enough to inspect fit and markings."] },
      { title: "What to inspect on arrival", text: ["Weigh the helmet in your hands. Extremely light shells, sharp mould lines, peeling decals, a flimsy visor mechanism or a strap that does not lock securely are reasons to stop and return.", "Check the PS or ICC marking and any certification label against the listing claim. If the label is missing, poorly printed, or does not match the model, do not wear it in traffic."] },
      { title: "What a genuine listing still cannot skip", text: ["Even a legitimate helmet can be the wrong size or the wrong market version. Fit and local conformity remain separate from authenticity.", "Do not modify the liner to force an intercom. After an impact, follow the manufacturer replacement advice rather than judging by appearance."] },
    ],
    faqs: [
      { q: "Does a Shopee Mall or Lazada Mall badge prove the helmet is genuine?", a: "It can reduce some risk, but it is not a substitute for matching the exact model and inspecting the unit and its markings." },
      { q: "Can I trust an ECE sticker in a listing photo?", a: "A photo is not the helmet in your hands. Homologation claims must be checked on the actual label, and Philippine distribution still needs the applicable PS or ICC mark." },
    ],
    sources: [dti],
    related: [{ label: "Philippine helmet certification guide", href: "/guides/motorcycle-helmet-certification-philippines" }, { label: "How to buy a helmet online", href: "/guides/buy-helmet-online-philippines" }, { label: "Compare helmets", href: "/gear/helmets/compare" }],
  },
  "/guides/first-motorcycle-buying-checklist": {
    originalSource: false, takeaways: ["License, budget and intended use come before engine size.", "A written quote must list the exact variant and every fee.", "Gear is part of the purchase, not an afterthought."],
    sections: [
      { title: "Confirm you can legally ride it", text: ["Check the driving-license codes that apply to the motorcycle you want. Automatic-only authorisation does not cover a manual clutch. Requirements can change; confirm with LTO before paying a reservation."] },
      { title: "Set a complete budget", text: ["Include the motorcycle, a correctly fitted helmet, other riding gear, registration, CTPL, a fuel and service reserve, and an emergency buffer. A published starting price is not the amount you will hand over.", "Use the loan planner with the actual quote. Compare total payable, not only the monthly figure."], checks: ["License category matches the motorcycle.", "Cash ceiling includes gear and fees.", "Intended roads and passenger use written down.", "Service support exists near your route."] },
      { title: "Shortlist by facts, then sit on the bike", text: ["Filter by budget, transmission and seat-height context. Open the exact generation. Do not mix V2 and V3 prices.", "At the dealer, test reach, parking, low-speed U-turns and passenger space. A table cannot certify fit."] },
      { title: "Buy the helmet before the first ride", text: ["Research the model, measure your head and inspect markings. Shop links can help compare live prices; they do not replace fit."] },
      { title: "Leave with documents, not only keys", text: ["Match identifiers to the OR/CR, keep receipts, and understand warranty and first service. If buying used, complete the transfer path rather than relying on an open deed."] },
    ],
    faqs: [
      { q: "What should I buy first, the bike or the helmet?", a: "Research both together. Do not ride without a helmet that fits and carries the applicable local markings. Budget gear inside the purchase, not after it." },
      { q: "Is the lowest monthly payment the cheapest deal?", a: "Not necessarily. Down payment, term, interest method and fees can make a smaller monthly number more expensive overall." },
    ],
    related: [{ label: "Find my match", href: "/finder" }, { label: "Read a dealer quote", href: "/guides/how-to-read-a-motorcycle-dealer-quote" }, { label: "Loan planner", href: "/tools/motorcycle-loan-calculator" }],
  },
  "/guides/how-to-read-a-motorcycle-dealer-quote": {
    originalSource: false, takeaways: ["SRP, cash price and financed total are different numbers.", "Ask for every fee in writing for the exact variant.", "A reservation is not ownership until documents match the unit."],
    sections: [
      { title: "Identify the motorcycle on the paper", text: ["The quote should name brand, model, year, variant, colour and any bundled accessories. If it only says a family name, it is not specific enough to compare."] },
      { title: "Separate the price layers", text: ["Published SRP or market observation is a reference. The dealer's cash price is what you pay if you settle in full. Financing adds interest, chattel mortgage, insurance and processing.", "Ask which items are included: LTO registration, CTPL, handling, delivery, first service, top box or garments. Included is not the same as free if the cash price was raised to cover them."], checks: ["Exact variant and colour named.", "Cash price written separately from monthly.", "All fees itemised.", "Interest method and term disclosed.", "Release date and reservation terms clear."] },
      { title: "Compare two quotes the same way", text: ["Use the loan planner with each dealer's numbers. A longer term or larger down payment can disguise a higher motorcycle price.", "Do not treat a calculator estimate as a lender approval."] },
      { title: "Before you pay a reservation", text: ["Confirm whether the amount is refundable, which unit it holds, and what happens if stock or colour changes. Pay only through the dealership's official channel."] },
    ],
    faqs: [
      { q: "Why is the cash price different from the website figure?", a: "Website figures are dated references. Dealers add location, fees, promotions and variant differences. Compare written quotes for the same configuration." },
      { q: "Should insurance be inside the loan?", a: "Only if you understand the premium, term, insured value and whether CTPL is separate. Adding it to the loan increases interest cost." },
    ],
    related: [{ label: "Loan calculator", href: "/tools/motorcycle-loan-calculator" }, { label: "Find a dealer", href: "/dealers" }, { label: "Ownership cost planner", href: "/ownership/cost-calculator" }],
  },
  "/affiliate-disclosure": {
    originalSource: false,
    sections: [
      { title: "What the Shop buttons are", text: ["Shopee and Lazada buttons open Philippine marketplace search or, when configured, Involve Asia tracking links for the named product. They are shopping shortcuts, not inventory, price guarantees or official store certifications unless a store is separately labelled.", "MotoIndex may earn a commission if you buy after using those links, at no extra cost to you. Commissions are paid by the marketplace programme, not added to your checkout."] },
      { title: "What commissions never change", text: ["Affiliate relationships must not change recorded specifications, fitment notes, model order or the outcome of a comparison. A paid placement, if used, must be labelled.", "Search results on Shopee and Lazada are controlled by those platforms. MotoIndex does not control seller stock, fulfilment or product authenticity."] },
      { title: "How to use the links safely", text: ["Match the exact model, compare more than one seller, and inspect the unit on arrival. Read the helmet and accessory buying guides before paying.", "Involve Asia deeplinks can replace generic search URLs in the affiliate configuration after programme approval. Until then, buttons use exact-name search pages."] },
      { title: "Questions and corrections", text: ["If a shop link is broken or misleading, use the corrections tool with the page path and the expected product name. For privacy of local storage, see the privacy page."] },
    ],
    related: [{ label: "Editorial policy", href: "/editorial-policy" }, { label: "Buy a helmet online", href: "/guides/buy-helmet-online-philippines" }, { label: "Prepare a correction", href: "/corrections" }],
  },
};
