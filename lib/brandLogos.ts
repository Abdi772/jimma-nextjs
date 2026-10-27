 // Brand logo images, served as normal files from public/brands so the
// browser only downloads the ones it shows and can cache them.
export const BRAND_LOGOS: Record<string, string> = {
  'xiaomi': '/brands/xiaomi.webp',
  'tecno': '/brands/tecno.webp',
  'oppo': '/brands/oppo.webp',
  'infinix': '/brands/infinix.webp',
  'huawei': '/brands/huawei.webp',
  'redmi': '/brands/redmi.webp',
  'samsung': '/brands/samsung.webp',
  'asus': '/brands/asus.webp',
  'lenovo': '/brands/lenovo.webp',
  'apple': '/brands/apple.webp',
  'google': '/brands/google.webp',
  'honor': '/brands/honor.webp',
  'itel': '/brands/itel.webp',
  'motorola': '/brands/motorola.webp',
  'nothing': '/brands/nothing.webp',
  'nokia': '/brands/nokia.webp',
  'oneplus': '/brands/oneplus.webp',
  'poco': '/brands/poco.webp',
  'realme': '/brands/realme.webp',
  'zte': '/brands/zte.webp',
  'vivo': '/brands/vivo.webp',
  'tcl': '/brands/tcl.webp',
  'sony': '/brands/sony.webp',
};

// Some listed brand names differ from the logo file name (e.g. the
// phone brand 'iPhone' uses Apple's logo).
export const BRAND_LOGO_ALIASES: Record<string, string> = {
  iphone: 'apple',
};

export function getBrandLogo(brand: string): string | null {
  const key = BRAND_LOGO_ALIASES[brand.toLowerCase()] || brand.toLowerCase();
  const path = BRAND_LOGOS[key];
  // ?v= makes browsers fetch the updated logo files instead of old cached ones
  return path ? `${path}?v=4` : null;
}
