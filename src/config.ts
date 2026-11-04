// Telegram username (without "@") that receives checkout messages.
export const TELEGRAM_USERNAME = 'metrior'

// Name of the seller shown under the checkout button.
export const SELLER_NAME = 'Pavel'

// Pickup address shown on the Location page; the embedded Google Map searches for this exact text.
export const ADDRESS = "Ma'ale haNesher 6, Ramat Gan"

// Currency and locale used to format all prices (ISO 4217 code, BCP 47 locale).
export const CURRENCY = 'ILS'
export const LOCALE = 'en-US'

// localStorage key that holds the ids of items in the cart.
export const CART_STORAGE_KEY = 'garage-sale-cart'

// Supabase project that stores the items, photos and the admin login, set in .env.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
