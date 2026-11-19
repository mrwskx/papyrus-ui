const HEX_RGB = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

function toLinear(channel: number): number {
  const c = channel / 255;

  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const match = HEX_RGB.exec(hex);

  if (!match) {
    throw new Error(`Expected a 6-digit hex color, got "${hex}"`);
  }

  const [r, g, b] = match
    .slice(1)
    .map(channel => toLinear(parseInt(channel, 16)));

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG 2.2 contrast ratio between two sRGB hex colors.
export function contrastRatio(hexA: string, hexB: string): number {
  const luminanceA = relativeLuminance(hexA);
  const luminanceB = relativeLuminance(hexB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);

  return (lighter + 0.05) / (darker + 0.05);
}
