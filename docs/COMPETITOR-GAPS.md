# Helmet Coverage And Competitor Keyword Review

## Source And Scope

The supplied URLs point to the same spreadsheet. The populated tab is `gid=1933668074`. The default view returned a blank grid; the default-tab CSV returned no readable keyword data. No missing-data conclusion was inferred from that blank tab.

Source: https://docs.google.com/spreadsheets/d/1bZ4fs9e_BHOWw9-iyLmokL44RZ5595adH55ObIavq-w/edit?gid=1933668074

Read-only Google Visualization queries returned:

- 30,000 nonempty keyword rows in the populated tab.
- 25,493 rows labeled PH; 4,507 rows for other countries.
- 11,108 candidate PH rows using `Country = PH AND (Current URL contains motorcycle OR Keyword contains helmet)`.
- No rows for a keyword-column query containing `helmet`. Helmet work is therefore a source-catalog restoration, not a keyword finding from this export.

The first 600 volume-sorted candidate rows were read in three 200-row batches, along with the first unfiltered rows and targeted queries for the selected clusters. The URL-based candidate filter misses some motorcycle keywords that rank on a competitor homepage and may include irrelevant queries. It is a screening rule, not a count of genuine SEO gaps.

The bundled working set in `src/keyword-audit.ts` contains 72 reviewed representative keyword rows. It is not the entire spreadsheet and is not an exhaustive manual audit of 30,000 rows. The visible metrics are the export's Volume and KD values, not current measurements, independently validated search volume, traffic forecasts or ranking guarantees.

## Helmet Root Cause

The app had only 22 helmet model records. The brand page additionally limited model tiles to the first three. This was a local implementation/data-coverage problem, not evidence that the original site contained only a few helmets.

`src/helmet-catalog.ts` now contains all 175 detail records listed by the fetched live `/gear/helmets` page, with their exact model paths, formats, available size text, price references and photo-availability context. Null prices are kept null. Missing photographs are not replaced with invented model pictures.

Detailed source record counts restored:

| Brand | Detailed models |
| --- | ---: |
| KYT | 9 |
| Spyder | 10 |
| Gille | 9 |
| EVO | 7 |
| SEC | 8 |
| Arai | 6 |
| HJC | 6 |
| Rook | 1 |
| Shoei | 8 |
| Zebra | 3 |
| HNJ | 4 |
| AGV | 9 |
| MT | 8 |
| Bell | 7 |
| Shark | 8 |
| LS2 | 37 |
| NHK | 12 |
| SMK | 19 |
| Alpinestars | 4 |
| Total | 175 |

The original brand directory also reports a broader tracked catalog. For example, KYT has 14 tracked names but 9 detailed source pages; Gille has 24 tracked names but 9 detailed source pages. The app distinguishes these numbers. It does not fabricate product facts or model URLs to make detailed counts equal the broader tracking totals.

The primary catalog and each helmet brand now use `HelmetBrowser`: search, format, budget, priced-only filtering, price/name sorting, local detail links and crawlable page anchors. Pagination is 12 models per page and does not silently discard the rest. Brand price tables still expose all matching local records.

## Competitor Findings

The supplied export predominantly identifies Zigwheels result URLs in the reviewed sample. Research also consulted MotoDeal, Carmudi, Top Gear and first-party Yamaha material to establish relevant model/price context. These are distinct activities: a competitor rank export is not product evidence.

- Some keywords rank a competitor homepage or an unrelated model page. The useful opportunity is an exact, source-backed answer, not copying the competitor URL.
- The R6 price query maps to an R7 competitor URL. The new guide explicitly separates road-going used R6s, imports and non-homologated R6 RACE products; it does not claim a verified current Philippine R6 SRP.
- TMAX source copy mixes 560cc and 562cc descriptions and older 530cc prices. The new guide discloses the conflict and distinguishes Standard, Tech Max and the 2019 reference.
- XMAX 400cc queries should not inherit a 292cc Philippine XMAX record or automatic expressway eligibility.
- Click version labels are not automatically official model identities. The guide explains how to establish the actual generation rather than inventing V4/V5 specifications.
- Model-price synonyms and loan phrases already have suitable local pages. They are mapped there, not expanded into hundreds of thin keyword or city-price duplicates.
- Passenger-car terms, competitor-brand navigation, other-market rows and unidentifiable strings are excluded or kept for research, not published as irrelevant rider content.

## New First-Batch Pages

Thirteen new destinations were built. Twelve are primary destinations for reviewed keyword clusters; the scrambler/cafe comparison is a supporting explanatory page for the same research journey.

| Destination | Main intent | Evidence / distinction |
| --- | --- | --- |
| `/motorcycles/yamaha/mio-gravis` | Mio Gravis model and price | Standard reference with separate variant-price caveat; cited comparison sources |
| `/motorcycles/yamaha/mio-soul-i-125` | Mio Soul i125 model and price | Standard/S price context; S specification basis is disclosed |
| `/recommendations/suzuki-scooters-philippines` | Suzuki scooter models and prices | Uses existing source-linked Suzuki scooter records |
| `/recommendations/manual-motorcycles-philippines` | Manual motorcycle choices | Explicit transmission criteria and clutch-layout caveat |
| `/recommendations/cruiser-motorcycles-philippines` | Cruiser model shortlist | Actual recorded primary category, not a safety or fit ranking |
| `/recommendations/scrambler-motorcycles-philippines` | Scrambler-style research | Named style-led set; no implied trail capability |
| `/guides/types-of-motorcycles` | Informational category explanation | Separates body style, transmission, engine and legal classification |
| `/guides/scrambler-vs-cafe-racer` | Style and capability distinction | Hardware, fit and modified-bike inspection guidance |
| `/guides/honda-click-generations` | Click V1/V2/V3/V4 identity | Verification process; no invented generation specification |
| `/guides/yamaha-xmax-300-vs-400` | XMAX engine/market disambiguation | Cites the dated 292cc Philippine report |
| `/guides/yamaha-r6-price-philippines` | R6 price/status context | No unverified local SRP; first-party track-only distinction |
| `/guides/yamaha-tmax-price-philippines` | TMAX price, trim and generation | Published 779K / 849K listing context versus historical 649K reference |
| `/guides/honda-rs150r-price-philippines` | RS150R discontinued/used pricing | Historical listing context, not a new-bike inventory promise |

Direct probes of the candidate live guide/model paths were unavailable where checked. An unavailable fetch is not independently verified HTTP 404 evidence and cannot rule out a differently named live page. These are confirmed local app gaps and candidate original-site gaps. Reconcile their intent against the complete production CMS and Search Console before deployment.

## Restored, Not New SEO URLs

These already existed on the live site and were restored at the same local paths:

- `/motorcycles/honda/navi`
- `/motorcycles/honda/beat`
- `/motorcycles/kawasaki/ninja-400`
- `/motorcycles/yamaha/aerox-v3/colors`
- `/motorcycles/yamaha/nmax-v3/colors`
- `/motorcycles/honda/click-125i/colors`
- `/motorcycles/honda/adv-160/colors`

Color names and verified variant mappings are text, not guessed digital paint swatches. A saved color is only a browser-local research preference, not a stock check or reservation.

## Existing Intent To Retain

PCX160 price, Aerox V3 price, NMAX V3 price, Yamaha and Honda price lists, Click125i installments, motorcycle loans, Gixxer SF155, Raider FI, Zontes400G, electric motorcycles, big-bike prices and many other reviewed keywords already have relevant pages. The review points to those paths rather than duplicating their body content.

No original article, model URL or source sitemap entry was deleted. The preview has not been deployed to the live domain.

## Remaining Research

The full 30,000-row manual gap audit is not complete. High-volume unresolved clusters include ADV350, CRF250 variants, R15 versus R15M, historical Sniper150, ambiguous Mio names, future/unverified versions and additional model families. Location-specific fuel queries require an actual trustworthy station/location data source, not a static page pretending to show live nearby prices.

Do not conclude that every unmatched string deserves a page. Confirm product identity, market, unique intent, source availability, existing canonical content and commercial relevance first.

## Working Review Tool

`/research/coverage` includes the reviewed working set, helmet coverage, decision filters, local page links and CSV export. It can request the full public Google tab read-only, or parse an uploaded CSV/TSV when a browser blocks the export.

Full-import mappings are explicitly labeled Suggested mapping unless the keyword/market matches a reviewed cluster. Unknown rows are Needs research, not automatically created pages. Uploading or fetching never writes to the spreadsheet, publishes content, or sends the imported file to a backend. Import data is held in memory for the session.

CSV import supports quoted values, escaped quotes, CRLF/newlines, BOM and TSV. Export prefixes spreadsheet formula-like cells to avoid formula execution. Import limits are 25 MB and 60,000 rows. Direct browser access to Google and browser interaction QA were not available in the tool environment; CSV upload is provided as the fallback.

## Before Indexing

Keep production pages indexable while reconciling original content and source dates, and use noindex only on a separate private staging environment when needed. Confirm any new canonical against the complete live-site inventory, retain server-rendered/prerendered page bodies, validate structured data, test real browser navigation and update sitemap output only after editorial approval. Exported KD and volume do not establish future traffic or rankings.