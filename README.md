# ElevaTech Digital

Marketing site for ElevaTech Digital — built with [Vite](https://vitejs.dev/).

## Develop

```bash
npm install      # first time only
npm run dev      # start dev server at http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Configuration

Copy `.env.example` to `.env` and set:

- `VITE_WEB3FORMS_KEY` — access key from [Web3Forms](https://web3forms.com) (powers the contact form)

Each service's Calendly booking link is set via the `data-calendly` attribute on its
"Book" button in `index.html`.

## Deployment

Pushing to `main` triggers the workflow in `.github/workflows/deploy.yml`, which builds
the site and deploys it to GitHub Pages.

The contact form key is injected at build time from the `VITE_WEB3FORMS_KEY` repository
secret (Settings → Secrets and variables → Actions).
