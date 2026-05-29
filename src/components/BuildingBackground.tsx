export function BuildingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Floating wireframe browser windows */}
      <FloatingWindow className="left-[5%] top-[12%] w-56 animate-float-slow" delay="0s" />
      <FloatingWindow className="right-[6%] top-[18%] w-64 animate-float-slow" delay="1.2s" variant="code" />
      <FloatingWindow className="left-[12%] bottom-[14%] w-48 animate-float-slow" delay="2.4s" variant="card" />
      <FloatingWindow className="right-[10%] bottom-[10%] w-52 animate-float-slow" delay="0.6s" />

      {/* Scrolling code stream */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      {/* Typing code lines */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 font-mono text-[10px] md:text-xs text-accent/40 whitespace-nowrap">
        <div className="animate-type-line" style={{ animationDelay: "0s" }}>
          {"<div className=\"hero\">"}
        </div>
        <div className="animate-type-line mt-1" style={{ animationDelay: "1.5s" }}>
          {"  <h1>We build.</h1>"}
        </div>
        <div className="animate-type-line mt-1" style={{ animationDelay: "3s" }}>
          {"  <Button>Ship it →</Button>"}
        </div>
        <div className="animate-type-line mt-1" style={{ animationDelay: "4.5s" }}>
          {"</div>"}
        </div>
      </div>
    </div>
  );
}

function FloatingWindow({
  className = "",
  delay = "0s",
  variant = "wire",
}: {
  className?: string;
  delay?: string;
  variant?: "wire" | "code" | "card";
}) {
  return (
    <div
      className={`absolute rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm shadow-glow ${className}`}
      style={{ animationDelay: delay }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-border/60 px-2 py-1.5">
        <span className="h-2 w-2 rounded-full bg-destructive/60" />
        <span className="h-2 w-2 rounded-full bg-accent/60" />
        <span className="h-2 w-2 rounded-full bg-primary/60" />
      </div>
      <div className="p-3 space-y-2">
        {variant === "wire" && (
          <>
            <div className="h-2 w-3/4 rounded bg-foreground/15 animate-build-bar" style={{ animationDelay: "0.2s" }} />
            <div className="h-2 w-1/2 rounded bg-foreground/10 animate-build-bar" style={{ animationDelay: "0.5s" }} />
            <div className="h-8 rounded bg-gradient-primary/40 animate-build-bar" style={{ animationDelay: "0.8s" }} />
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-6 rounded bg-foreground/10 animate-build-bar" style={{ animationDelay: "1.1s" }} />
              <div className="h-6 rounded bg-foreground/10 animate-build-bar" style={{ animationDelay: "1.3s" }} />
              <div className="h-6 rounded bg-foreground/10 animate-build-bar" style={{ animationDelay: "1.5s" }} />
            </div>
          </>
        )}
        {variant === "code" && (
          <div className="space-y-1 font-mono text-[8px] leading-tight">
            <div className="h-1.5 w-2/3 rounded bg-accent/50 animate-build-bar" style={{ animationDelay: "0.2s" }} />
            <div className="h-1.5 w-4/5 rounded bg-foreground/20 animate-build-bar" style={{ animationDelay: "0.4s" }} />
            <div className="h-1.5 w-1/2 rounded bg-primary/50 animate-build-bar" style={{ animationDelay: "0.6s" }} />
            <div className="h-1.5 w-3/4 rounded bg-foreground/20 animate-build-bar" style={{ animationDelay: "0.8s" }} />
            <div className="h-1.5 w-2/5 rounded bg-accent/50 animate-build-bar" style={{ animationDelay: "1s" }} />
            <div className="h-1.5 w-3/5 rounded bg-foreground/20 animate-build-bar" style={{ animationDelay: "1.2s" }} />
          </div>
        )}
        {variant === "card" && (
          <>
            <div className="h-10 rounded bg-gradient-accent/40 animate-build-bar" style={{ animationDelay: "0.2s" }} />
            <div className="h-1.5 w-full rounded bg-foreground/15 animate-build-bar" style={{ animationDelay: "0.5s" }} />
            <div className="h-1.5 w-2/3 rounded bg-foreground/10 animate-build-bar" style={{ animationDelay: "0.7s" }} />
            <div className="h-4 w-1/3 rounded bg-primary/50 animate-build-bar" style={{ animationDelay: "0.9s" }} />
          </>
        )}
      </div>
    </div>
  );
}
