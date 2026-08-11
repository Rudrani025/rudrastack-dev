import { useEffect, useState } from "react";

/** Pixel-art crosshair cursor that follows the pointer (desktop only). */
export function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-2px, -2px) scale(${down ? 0.8 : 1})`,
        transition: "transform 60ms steps(2)",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 12 12" shapeRendering="crispEdges">
        <path
          d="M0 0h2v2H0zM2 2h2v2H2zM4 4h2v2H4zM6 6h2v2H6zM2 6h2v2H2zM4 8h2v2H4z"
          fill="var(--grape)"
        />
        <path d="M1 1h2v2H1zM3 3h2v2H3zM5 5h2v2H5z" fill="var(--pink)" />
      </svg>
    </div>
  );
}
