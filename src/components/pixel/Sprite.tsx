type SpriteProps = {
  map: string[];
  palette: Record<string, string>;
  scale?: number;
  className?: string;
  label?: string;
};

/** Renders a pixel-art sprite from a character map using CSS box-shadow pixels. */
export function Sprite({ map, palette, scale = 4, className, label }: SpriteProps) {
  const width = Math.max(...map.map((r) => r.length));
  const shadows: string[] = [];
  map.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      const color = palette[ch];
      if (!color) return;
      shadows.push(`${x * scale}px ${y * scale}px 0 0 ${color}`);
    });
  });
  return (
    <div
      className={className}
      role={label ? "img" : "presentation"}
      aria-label={label}
      style={{ width: width * scale, height: map.length * scale, position: "relative" }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: scale,
          height: scale,
          boxShadow: shadows.join(","),
        }}
      />
    </div>
  );
}

const GIRL_PALETTE = {
  H: "var(--grape)",
  S: "oklch(0.87 0.06 60)",
  P: "var(--pink)",
  p: "oklch(0.78 0.11 350)",
  J: "oklch(0.6 0.1 275)",
  W: "var(--cream)",
  L: "oklch(0.95 0.02 90)",
  E: "oklch(0.28 0.09 300)",
};

export const GIRL_IDLE = [
  "....HHHHHH....",
  "...HHHHHHHH...",
  "..HHHHHHHHHH..",
  "..HHSSSSSSHH..",
  "..HSSSSSSSSH..",
  "..HSSESSESSH..",
  "..HSSSSSSSSH..",
  "..HHSSSSSSHH..",
  "...HSSSSSSH...",
  "....SSSSSS....",
  "...PPPPPPPP...",
  "..PPPPPPPPPP..",
  "..PPPPLLPPPP..",
  "..PPPPPPPPPP..",
  "..pPPPPPPPPp..",
  "...JJJJJJJJ...",
  "...JJJ..JJJ...",
  "...JJJ..JJJ...",
  "...JJJ..JJJ...",
  "..WWWW..WWWW..",
];

export const GIRL_WALK = [
  "....HHHHHH....",
  "...HHHHHHHH...",
  "..HHHHHHHHHH..",
  "..HHSSSSSSHH..",
  "..HSSSSSSSSH..",
  "..HSSESSESSH..",
  "..HSSSSSSSSH..",
  "..HHSSSSSSHH..",
  "...HSSSSSSH...",
  "....SSSSSS....",
  "...PPPPPPPP...",
  "..PPPPPPPPPP..",
  "..PPPPLLPPPP..",
  "..PPPPPPPPPP..",
  "..pPPPPPPPPp..",
  "...JJJJJJJJ...",
  "..JJJ...JJJ...",
  ".JJJ.....JJJ..",
  ".JJ.......JJ..",
  "WWWW.....WWWW.",
];

export function PixelGirl({
  scale = 4,
  walking = false,
  className,
}: {
  scale?: number;
  walking?: boolean;
  className?: string;
}) {
  return (
    <Sprite
      map={walking ? GIRL_WALK : GIRL_IDLE}
      palette={GIRL_PALETTE}
      scale={scale}
      className={`${walking ? "animate-bob" : "animate-float"} ${className ?? ""}`}
      label="Pixel-art avatar of Rudrani Gawande"
    />
  );
}

const CLOUD_MAP = [
  "....WWWW....",
  "..WWWWWWWW..",
  ".WWWWWWWWWW.",
  "WWWWWWWWWWWW",
  ".WWWWWWWWWW.",
];

export function PixelCloud({
  scale = 5,
  className,
  tone = "var(--cream)",
}: {
  scale?: number;
  className?: string;
  tone?: string;
}) {
  return (
    <Sprite map={CLOUD_MAP} palette={{ W: tone }} scale={scale} className={className} />
  );
}

const MOUNTAIN_MAP = [
  "......WW......",
  ".....WWWW.....",
  "....WWWWWW....",
  "...MMWWWWMM...",
  "..MMMMMMMMMM..",
  ".MMMMMMMMMMMM.",
  "MMMMMMMMMMMMMM",
];

export function PixelMountain({
  scale = 6,
  className,
  tone = "var(--lavender)",
}: {
  scale?: number;
  className?: string;
  tone?: string;
}) {
  return (
    <Sprite
      map={MOUNTAIN_MAP}
      palette={{ M: tone, W: "var(--cream)" }}
      scale={scale}
      className={className}
    />
  );
}

const TREE_MAP = [
  "...GG...",
  "..GGGG..",
  ".GGGGGG.",
  "..GGGG..",
  ".GGGGGG.",
  "GGGGGGGG",
  "...TT...",
  "...TT...",
];

export function PixelTree({ scale = 5, className }: { scale?: number; className?: string }) {
  return (
    <Sprite
      map={TREE_MAP}
      palette={{ G: "oklch(0.45 0.1 300)", T: "oklch(0.35 0.06 40)" }}
      scale={scale}
      className={className}
    />
  );
}
