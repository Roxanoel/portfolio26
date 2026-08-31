/* Bauhaus SVG card motifs — Spectrum muted neutral palette */

function halftoneField(fill: string): string {
  let s = "";
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 9; x++) {
      const r = (2 + (Math.sin(x * 0.7 + y) * 0.5 + 0.5) * 9).toFixed(1);
      s += `<circle cx="${40 + x * 40}" cy="${40 + y * 42}" r="${r}" fill="${fill}"/>`;
    }
  }
  return s;
}

function makeSVG(bg: string, shapes: string): string {
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="250" fill="${bg}"/>${shapes}</svg>`;
}

const S = {
  bg: "#f2e8d5",
  ink: "#1c1a17",
  dk: "#57554e",
  mid: "#a8a49e",
  lt: "#d6d4d1",
};

export const MOTIFS: string[] = [
  makeSVG(
    S.bg,
    `<circle cx="200" cy="125" r="110" fill="${S.dk}"/><circle cx="200" cy="125" r="74" fill="${S.bg}"/><circle cx="200" cy="125" r="42" fill="${S.mid}"/><circle cx="200" cy="125" r="14" fill="${S.ink}"/>`,
  ),
  makeSVG(
    S.bg,
    `<path d="M120 210 A80 80 0 0 1 280 210 Z" fill="${S.mid}"/><rect x="40" y="40" width="22" height="170" fill="${S.dk}"/><rect x="338" y="40" width="22" height="170" fill="${S.lt}"/>`,
  ),
  makeSVG(
    S.bg,
    `<clipPath id="c2s"><circle cx="200" cy="125" r="96"/></clipPath><g clip-path="url(#c2s)"><rect x="104" y="29" width="96" height="192" fill="${S.lt}"/><rect x="200" y="29" width="96" height="192" fill="${S.ink}"/></g><circle cx="200" cy="125" r="96" fill="none" stroke="${S.ink}" stroke-width="2"/><line x1="200" y1="29" x2="200" y2="221" stroke="${S.bg}" stroke-width="2"/>`,
  ),
  makeSVG(
    S.bg,
    `<path d="M40 40 H170 A130 130 0 0 1 40 170 Z" fill="${S.dk}"/><path d="M360 210 H230 A130 130 0 0 1 360 80 Z" fill="${S.mid}"/><circle cx="200" cy="125" r="18" fill="${S.ink}"/>`,
  ),
  makeSVG(S.bg, halftoneField(S.dk)),
  makeSVG(
    S.bg,
    `<circle cx="300" cy="80" r="52" fill="${S.lt}"/><rect x="40" y="150" width="320" height="14" fill="${S.mid}"/><rect x="40" y="178" width="220" height="14" fill="${S.dk}"/><rect x="40" y="206" width="140" height="14" fill="${S.ink}"/>`,
  ),
];
