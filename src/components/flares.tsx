type FlaresProps = {
  // Mirrors the light, so stacked sections do not repeat the same pattern.
  flip?: boolean;
  // Thin bright lines and a streak. Only for areas of plain black: over a photo
  // they read as scratches.
  lines?: boolean;
};

// Slanted light behind a section. Decorative only.
export function Flares({ flip = false, lines = false }: FlaresProps) {
  return (
    <div
      aria-hidden="true"
      className={`flare-fade pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      <div className="beam-flare flare-in inset-0" />
      {lines ? (
        <>
          <div className="flare-streak flare-in top-[24%] -left-88 hidden sm:block" />
          <div className="hero-flare flare-in inset-0" />
        </>
      ) : null}
    </div>
  );
}
