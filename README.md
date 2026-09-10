# MotoIndex Landing Page Redesign

React + Vite landing page prepared for deployment to Cloudflare Workers using Static Assets.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

## Cloudflare Workers

The project is configured in `wrangler.jsonc` to deploy the Vite `dist` directory as Workers Static Assets with SPA fallback routing.

For local Cloudflare preview:

```bash
npm run build
npm run cf:dev
```

For direct deployment from a local terminal after `wrangler login`:

```bash
npm run deploy:cloudflare
```

## GitHub Actions deployment

`.github/workflows/deploy-cloudflare.yml` deploys every push to `main`.

Add these repository secrets before the first deployment:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The API token should be scoped to the target Cloudflare account with Workers edit permissions.
