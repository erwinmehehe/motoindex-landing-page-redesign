# Connected MotoIndex Redesign

## What This Build Is

A connected React/Vite redesign preview with shared navigation, real pathname routing, original sitemap paths, and interactive research tools. It is not a deployment to motoindexph.com or a wholesale import of the live site's content database.

The original sitemap snapshot is in `src/original-sitemap.txt`. The additional brand URLs found on the live site are recorded separately in `src/original-brand-paths.txt`; the fetched top-level XML did not list them. `src/routes.ts` resolves both the application and the searchable `/sitemap` directory through one route manifest, and exports uncovered-source-path checks for both inventories.

## Implemented Templates

- Motorcycle catalog with filters, sorting, pagination, grid/list views and shareable query strings.
- A prominent `/brands` directory and `/gear/helmets/brands` directory, with all 22 motorcycle and 19 helmet brand profiles on their original paths.
- Dedicated brand pages with source-adapted buying guidance, source price context, searchable/sortable price tables, comparisons, CSV exports, FAQs, related research, and locally rendered older-model archive pages.
- Motorcycle detail pages with source links, variant context, financing previews, dimensional fit checks and related models.
- Twenty existing comparison pairs, plus a custom comparison with differences-only mode, share links, CSV export and print styling.
- Guide, maintenance, commuting, ownership, recommendation and tools hubs.
- Article templates with a table of contents, reading-size control, source links, bookmarks and local checklists.
- Eight editable calculators with disclosed assumptions, input validation, shareable inputs and downloadable estimates.
- Rider matching and rider fit tools.
- Dealer directory and local application-draft preparation.
- Helmet directory and detail templates, tire-size references, accessory checklists, and the repo reference-price board.
- A browser-local garage, notes, recently viewed bikes, bookmarks and saved helmets.
- Four local archive pages: Aerox V2, NMAX V2, Click 150i and ADV 150. Each contains generation-specific facts, historical price context, a fuel planner, an actual-offer budget tool, checklists and FAQs.
- Four local model-family pages for Aerox, NMAX, Click and ADV, with current and historical records kept separate.
- Thirty-five local motorcycle recommendation collections, the electric recommendation page, and four commuting collections. Each has its own explicit selection rule, model results, price/specification table, buying guidance and FAQ content.
- Nine real model-research page types per recorded motorcycle: specs, price, installment, fuel consumption, tire size, maintenance, top-speed evidence, ownership costs and used-price research. These are rendered pages, not HTTP redirects.
- Three local electric-motorcycle detail pages with battery-subscription and owned-battery pricing, configuration controls, manufacturer claim labels and registration evidence.
- Complete local helmet detail pages with fit checklists, recorded equipment context, related helmets and a dedicated helmet-comparison page.
- A local corrections page that creates and downloads a report draft without claiming backend delivery.

## Content Boundaries

- The interactive combustion catalog now includes 102 reference models across 22 motorcycle brands, not the full live catalog. This includes three source-backed restored live records and two researched model additions. Source dates and undated comparison-page references are identified; unimported specifications remain explicit. Published price ranges are not silently presented as one official manufacturer SRP.
- Editorial pages now have page-specific local bodies in `src/content.ts` and `src/editorial.ts`, including all maintenance topics, ownership paperwork, helmet certification, EV registration, source methodology and company/editor information. The generic research-brief fallback was removed. Recommendation routes use their own functional collection pages, not a generic article or an old-site handoff.
- The local articles adapt reviewed source facts and add practical explanation. They are not represented as byte-for-byte exports of the original CMS. Reconcile them against the complete original SEO copy, metadata and citations before replacing live content.
- The helmet directory now contains all 175 detail records listed by the fetched source catalog across 19 brands. All have local routes, including records without published prices or photos. Brand grids use searchable pagination instead of three sample tiles. Broader tracked-name counts remain separate from detailed model coverage. The dealer directory still contains 10 branch records.
- The repo board contains the 15 advertised prices from the August 26, 2026 source snapshot. It is not a live marketplace or an inventory feed.
- Product images use source-hosted media where available, with explicit photo-unavailable fallback states. Existing landing-page generated imagery is illustrative.
- Sample testimonials and concept membership pricing are no longer rendered on the homepage. The noninteractive brand marquee/stat strip was replaced with direct brand-guide links. The homepage shows six featured library links per topic plus the full-hub link instead of nine links and an additional promo card. These are presentation cleanups, not deletions of SEO articles or canonical URLs.
- There is no payment processing, account authentication, cloud sync, email alert delivery or dealer lead API. Forms never claim to have submitted when they have only created a local draft.

## Before Production Migration

1. Keep the existing CMS/database and all original slugs. Reconcile the implemented local content with the original page bodies before deployment. Built local pages and a complete CMS migration are separate milestones.
2. Preserve each page's unique title, H1, body, FAQs, author, publication/update dates, sources, structured data and existing internal links. Review any intended copy changes page by page.
3. Use the current server-rendered platform, or prerender full HTML per URL. Client-side metadata and SPA fallbacks alone are not a complete SEO delivery strategy.
4. Keep self-canonicals on unfiltered article/model pages. Plan the indexing and canonical policy for search/filter parameters separately. Do not create thin indexable pages for arbitrary filter combinations.
5. The production build uses `index, follow` in both `index.html` and `PageMeta`. Keep indexing enabled unless a specific staging or private-preview environment requires otherwise.
6. Preserve existing sitemap entries and server 200 responses. If a URL truly must change, map a specific 301 redirect. Do not redirect article URLs to the homepage or consolidate meaningful articles into one generic page.
7. Connect production dealer forms, consent handling, email providers and any account services only after the corresponding backend exists. Use the actual production privacy and retention policy.
8. Crawl the original and redesigned deployments. Compare URL coverage, status codes, rendered HTML, canonical tags, titles, H1s, structured data, source links and internal-link depth before switching traffic.
9. Test direct URL loads, refresh, back/forward navigation, keyboard-only interaction, phone-size layouts, reduced motion, storage-disabled behavior and external image failures in real browsers.
10. Monitor Search Console coverage, query/page traffic, crawl errors and conversion events after rollout. No redesign can guarantee unchanged rankings.

## Hosting Note

`public/_redirects` supplies a Netlify-style SPA fallback for the preview only. Other hosts need equivalent history fallback configuration. A production SEO site should retain server-rendered pages and real 404 status handling instead of relying on this catch-all.

## Useful Review Journeys

- `/motorcycles` -> model -> save -> `/saved` -> compare -> cost planner -> dealer.
- `/guides` -> helmet size guide -> complete checklist -> bookmark -> garage reading list.
- `/finder` -> budget/transmission constrained shortlist -> detail -> fit check.
- `/tools` -> change loan method and APR inputs -> download estimate -> share the exact inputs.
- `/sitemap` -> search any original sitemap path -> open the matching connected template.
- `/brands` -> Honda or Yamaha -> current-model price table -> model -> model-specific specs or installment page -> compare.
- `/motorcycles/yamaha` -> NMAX V2 archive -> historical specs and actual-offer planner -> NMAX generation guide.
- `/gear/helmets/brands` -> KYT or Shoei -> local helmet detail -> local comparison -> saved reading list.
- `/recommendations/motorcycles-under-100k` -> local shortlist and price table -> bike detail -> ownership planner.
- `/motorcycles/electric` -> VinFast Evo -> battery setup -> charging planner -> local registration guide.

## Brand Content Follow-Up

All 22 motorcycle brand URLs were fetched, along with the helmet brand directory and the detailed KYT brand page. The redesigned brand bodies adapt their buying-guide structure, price context, ownership support and FAQ questions. They are not claimed to be byte-for-byte copies of every original article. Helmet brands other than KYT use directory-backed facts and model-level buying guidance; reconcile that local copy with the original long-form pages before launch.

The live site has not been changed. No original SEO article, brand URL or archive URL has been deleted or redirected by this work. Before removing or merging any real content, review page-level Search Console traffic, impressions, backlinks, conversions and duplicate intent. If a genuine duplicate is merged, preserve useful material and map an appropriate 301; do not send old content to the homepage.

Primary browsing links no longer send the rider to the old MotoIndex site. External evidence is grouped in the expandable `SourceReferences` component. Calls, maps, agency resources and manufacturer citations remain intentional third-party actions.

See `docs/COMPETITOR-GAPS.md` for the supplied spreadsheet scope, thirteen first-batch new destinations, seven restored model/color destinations, existing intent mappings and the remaining unreviewed keyword set. The keyword tab contains 30,000 rows; this is a prioritized partial manual audit, not a claim that every potential gap has been researched or published.

The production build is configured for indexing. Confirm content comparison, citations, metadata output and browser-based visual and interaction QA before launch.