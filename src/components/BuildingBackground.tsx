export function BuildingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ filter: "brightness(0.7) contrast(1.1)" }}
      />
      {/* Dark cinematic overlay for text readability */}
      <div className="absolute inset-0 bg-overlay" />
      {/* Subtle gradient to blend with page below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
