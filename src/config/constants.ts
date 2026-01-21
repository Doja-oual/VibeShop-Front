// Application constants
export const APP_NAME = 'YouCom';
export const APP_DESCRIPTION = 'Plateforme e-commerce modulaire';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const API_TIMEOUT = 30000;

// Socket.io Configuration
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

// Stripe Configuration
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';

// Pagination
export const PRODUCTS_PER_PAGE = 12;
export const ORDERS_PER_PAGE = 10;

// Search
export const SEARCH_DEBOUNCE_MS = 300;
export const MIN_SEARCH_CHARS = 2;

// Cache
export const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const STALE_TIME = 1000 * 60 * 2; // 2 minutes

// Image Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

// Currency
export const DEFAULT_CURRENCY = 'EUR';
export const CURRENCY_SYMBOL = '€';

// Notification durations
export const TOAST_DURATION = 4000;

// Stock levels
export const LOW_STOCK_THRESHOLD = 10;
export const OUT_OF_STOCK = 0;
