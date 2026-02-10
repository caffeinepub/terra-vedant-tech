/**
 * Centralized brand asset paths for consistent logo usage across the application.
 */

export const BRAND_ASSETS = {
  logo: {
    // High-resolution logo for hero sections and large displays
    large: '/assets/generated/terra-vedant-logo.dim_512x512.png',
    // Standard logo for header, footer, and general UI usage
    standard: '/assets/generated/terra-vedant-logo.dim_128x128.png',
    // Header logo - uploaded brand logo
    header: '/assets/IMG-20260210-WA0045-4.jpg',
  },
  hero: {
    // Hero background image
    background: '/assets/generated/terra-vedant-tech-hero-bg.dim_1600x900.png',
  },
} as const;
