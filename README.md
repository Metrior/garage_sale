# Garage Sale

**Live site: https://metrior.github.io/garage_sale/**

A small shop for garage sale items, built with React, Vite, MUI and Supabase. Visitors browse a photo gallery, add items to a cart, and check out by opening a Telegram chat with a prewritten message listing the items they want.

## Managing items

Items and their photos are stored in [Supabase](https://supabase.com) and managed from the site itself:

1. Click **Admin login** in the top bar (the login icon on phones) and sign in with the admin account.
2. Open the **Admin** tab. **Add Item** creates an item; each card has **Edit** and **Delete**.

On the item form, the first photo is the cover (use the star on another photo to make it the cover). Photos are resized in the browser before upload, which also strips their metadata (including GPS location). `price` is a whole number of shekels (₪), and the optional price note (e.g. "за штуку") is shown under the price. Deleting an item also deletes its photos and removes it from visitors' carts the next time they open the site.

The Telegram username, seller name, pickup address (shown on the Location page and its map), currency and locale are set in [`src/config.js`](src/config.js).

The Supabase project is set by `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`: in a `.env` file for local development (it isn't committed), and as repository variables (Settings → Secrets and variables → Actions → Variables) for the GitHub Actions deploy.

## Development

```sh
npm install
npm run dev
```

## Deployment

Every push to `main` builds the site and publishes it to the `gh-pages` branch via [GitHub Actions](.github/workflows/deploy.yml). GitHub Pages serves that branch.

To publish manually from your machine instead, run `npm run deploy`.
