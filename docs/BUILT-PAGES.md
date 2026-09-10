# Built Local Pages

The app entry remains `src/App.tsx`. `src/routes.ts` resolves real rendered pages; primary links do not redirect to motoindexph.com. `public/_redirects` is a local SPA history fallback for preview hosting, not an external redirect.

## Representative Routes

| Route | Local implementation |
| --- | --- |
| `/motorcycles/yamaha` | Brand guide, price table, local model/archive links and FAQs |
| `/motorcycles/honda` | Brand guide, current model research and historical owner records |
| `/motorcycles/yamaha/nmax-v3` | Model overview, specifications, fit, planning, alternatives and FAQs |
| `/motorcycles/yamaha/nmax-v3/specs` | Dedicated specification and equipment page |
| `/motorcycles/yamaha/nmax-v3/installment` | Dedicated interactive finance page |
| `/motorcycles/yamaha/nmax-v3/maintenance` | Exact-model maintenance context and connected guidance |
| `/motorcycles/yamaha/aerox-v2` | Full historical owner page and used-offer budget tool |
| `/motorcycles/yamaha/nmax-v2` | Full historical owner page and fuel planner |
| `/motorcycles/honda/click-150i` | Previous-generation model details and buying checks |
| `/motorcycles/honda/adv-150` | Previous-generation model details and buying checks |
| `/motorcycles/yamaha/nmax` | Current/previous-generation family guide |
| `/recommendations/motorcycles-under-100k` | Criteria, searchable shortlist, full record table and buyer advice |
| `/maintenance/cvt-motorcycle` | Full CVT guidance, checklist, FAQs and citations |
| `/ownership/transfer-of-ownership` | Source-adapted transfer guide with practical checklist |
| `/gear/helmets/kyt/tt-course` | Local helmet details, measurement context, fit checklist and FAQs |
| `/gear/helmets/compare` | Local 2-3 helmet comparison with export and sharing |
| `/motorcycles/electric/vinfast-evo` | Local electric model, battery plans, configuration and LTO context |
| `/corrections` | Local report preparation, persistent draft and text export |
| `/sitemap` | Searchable directory of built local pages; optional model subpages |

## Evidence And Data Limits

- External links in `SourceReferences` are citations, not substitutes for page content.
- No iframe, external content fetch at navigation time, or external redirect is needed to read the built pages.
- The 102 combustion-model records and 175 source-listed helmet detail records are snapshots, not a synchronized dealer feed. All source-listed helmet detail URLs now resolve locally, with broader brand tracking lists distinguished from the detailed catalog.
- Historical launch prices are not live used prices. Unrecorded specifications remain explicitly missing.
- Sources were reviewed for the new editorial, historical-model and electric-model pages. The new local copy is not claimed to reproduce every original CMS paragraph verbatim.
- Forms that prepare local drafts say exactly that. There is no connected email, payment or lead-delivery backend.
- The spreadsheet-derived priority gap batch and decision record are documented in `docs/COMPETITOR-GAPS.md`. `/research/coverage` provides the reviewed subset, suggested full-tab/file-import mapping, helmet counts and exports. Import does not automatically publish pages.

## Verification Boundary

Use `functions.build_project` for the production build. The supplied tool environment does not provide a browser automation runner, so direct-navigation, visual, responsive and interaction testing in a real browser must be done before deployment. SEO production delivery should retain SSR/prerendered content, original canonical paths and real status codes, as described in `docs/SEO-MIGRATION.md`.