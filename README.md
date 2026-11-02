# Garage Sale

**Live site: https://metrior.github.io/garage_sale/**

A small shop for garage sale items, built with React, Vite and MUI. Visitors browse a photo gallery, add items to a cart, and check out by opening a Telegram chat with a prewritten message listing the items they want.

## Editing items

All items live in [`src/data/items.json`](src/data/items.json):

```json
{
  "id": "desk-lamp",
  "title": "Desk Lamp",
  "description": "Adjustable metal desk lamp with warm LED bulb included.",
  "price": 15,
  "image": "images/desk-lamp.jpg"
}
```

- `id` must be unique. Removing an item from the JSON also removes it from visitors' carts the next time they open the site.
- `image` is either a full `https://` URL or a path to a file in [`public/`](public/), such as `images/desk-lamp.jpg` for `public/images/desk-lamp.jpg`.

The Telegram username, currency and locale are set in [`src/config.js`](src/config.js).

## Development

```sh
npm install
npm run dev
```

## Deployment

Every push to `main` builds the site and publishes it to the `gh-pages` branch via [GitHub Actions](.github/workflows/deploy.yml). GitHub Pages serves that branch.

To publish manually from your machine instead, run `npm run deploy`.
