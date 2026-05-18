export const humanizeHeader = (s: string) =>
  s
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
