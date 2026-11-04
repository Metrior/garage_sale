# Garage Sale

**Live site: https://metrior.github.io/garage_sale/**

A small shop for garage sale items, built with React, Vite and MUI. Visitors browse a photo gallery, add items to a cart, and check out by opening a Telegram chat with a prewritten message listing the items they want.

## Editing items

All items live in [`src/data/items.json`](src/data/items.json):

```json
{
  "id": "knife",
  "title": "Нож с ножнами",
  "description": "Нож с гравировкой на клинке и кожаными ножнами.",
  "price": 120,
  "images": ["Knife_1.jpg", "Knife_2.jpg"]
}
```

- `id` must be unique. Removing an item from the JSON also removes it from visitors' carts the next time they open the site.
- `price` is in shekels (₪).
- `images` lists one or more photos; the first one is shown on the card, and clicking it opens all of them in a swipeable viewer. Each entry is the name of a file in [`src/images/`](src/images/) (or a full `https://` URL). Drop full-size phone photos there as they are: the build makes resized WebP copies and strips their metadata (including GPS location), and the originals are not published.

The Telegram username, seller name, pickup address (shown on the Location page and its map), currency and locale are set in [`src/config.js`](src/config.js).

## Development

```sh
npm install
npm run dev
```

## Deployment

Every push to `main` builds the site and publishes it to the `gh-pages` branch via [GitHub Actions](.github/workflows/deploy.yml). GitHub Pages serves that branch.

To publish manually from your machine instead, run `npm run deploy`.
