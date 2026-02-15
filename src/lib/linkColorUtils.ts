/**
 * Link color storage: supports both legacy hex/hexa and new JSON rgba.
 * - Legacy: "#fff", "#ffffff", "#ffffff80"
 * - New: '{"r":255,"g":255,"b":255,"a":1}'
 * - Other CSS (oklch, rgb()) pass through unchanged for getCssColor.
 */

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

const DEFAULT_RGBA: Rgba = { r: 0, g: 0, b: 0, a: 1 };

function isJsonRgba(value: string): boolean {
  const trimmed = value?.trim();
  return typeof trimmed === "string" && trimmed.startsWith("{");
}

/**
 * Parse stored value (hex, hexa, or JSON rgba) into rgba object.
 * Returns default black if invalid.
 */
export function parseStoredColor(value: string | undefined | null): Rgba {
  if (value == null || value === "") return DEFAULT_RGBA;

  const s = value.trim();

  if (isJsonRgba(s)) {
    try {
      const parsed = JSON.parse(s) as unknown;
      if (
        parsed &&
        typeof parsed === "object" &&
        "r" in parsed &&
        "g" in parsed &&
        "b" in parsed
      ) {
        const r = Number((parsed as Rgba).r);
        const g = Number((parsed as Rgba).g);
        const b = Number((parsed as Rgba).b);
        const a = "a" in parsed ? Number((parsed as Rgba).a) : 1;
        if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
          return {
            r: Math.min(255, Math.max(0, r)),
            g: Math.min(255, Math.max(0, g)),
            b: Math.min(255, Math.max(0, b)),
            a: Number.isNaN(a) ? 1 : Math.min(1, Math.max(0, a)),
          };
        }
      }
    } catch {
      /* fall through to hex parse */
    }
  }

  const hex = s.startsWith("#") ? s.slice(1) : s;
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }
  if (/^[0-9a-fA-F]{8}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }

  return DEFAULT_RGBA;
}

/**
 * Convert rgba to CSS color string for use in style.
 */
export function rgbaToCss(rgba: Rgba): string {
  const { r, g, b, a } = rgba;
  if (a >= 1) return `rgb(${r},${g},${b})`;
  return `rgba(${r},${g},${b},${a})`;
}

/**
 * Get a CSS color string from a stored value (hex, hexa, or JSON rgba).
 * Passes through other strings (e.g. oklch, rgb()) unchanged.
 */
export function getCssColor(value: string | undefined | null): string {
  if (value == null || value === "") return "transparent";

  const s = value.trim();
  if (isJsonRgba(s)) {
    return rgbaToCss(parseStoredColor(value));
  }
  const hex = s.startsWith("#") ? s.slice(1) : s;
  if (/^[0-9a-fA-F]{6}$/.test(hex) || /^[0-9a-fA-F]{8}$/.test(hex)) {
    return rgbaToCss(parseStoredColor(value));
  }
  return value;
}

/**
 * Serialize rgba to the new stored format (JSON string).
 */
export function toStoredRgbaJson(rgba: Rgba): string {
  return JSON.stringify({
    r: Math.round(rgba.r),
    g: Math.round(rgba.g),
    b: Math.round(rgba.b),
    a: rgba.a,
  });
}

/**
 * From stored value (hex, hexa, or JSON rgba) return 6-digit hex for legacy code that expects hex (e.g. generateShadows).
 */
export function storedColorToHex(value: string | undefined | null): string {
  const rgba = parseStoredColor(value);
  const r = Math.min(255, Math.max(0, Math.round(rgba.r)))
    .toString(16)
    .padStart(2, "0");
  const g = Math.min(255, Math.max(0, Math.round(rgba.g)))
    .toString(16)
    .padStart(2, "0");
  const b = Math.min(255, Math.max(0, Math.round(rgba.b)))
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}
