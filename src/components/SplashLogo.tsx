import { useEffect, useState } from "react";

export function SplashLogo() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 5500);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background animate-splash-fade">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative flex flex-col items-center gap-8">
        <svg viewBox="0 0 200 200" className="h-40 w-40 md:h-52 md:w-52">
          <defs>
            <linearGradient id="splashGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.65 0.24 295)" />
              <stop offset="100%" stopColor="oklch(0.78 0.2 155)" />
            </linearGradient>
          </defs>
          {/* base ground line */}
          <line x1="20" y1="170" x2="180" y2="170" stroke="oklch(0.78 0.2 155)" strokeWidth="2" opacity="0.5" />
          {/* Bricks dropping in sequence to build a skyline */}
          <rect x="30" y="120" width="32" height="50" rx="3" fill="url(#splashGrad)" className="brick" style={{ animationDelay: "0.1s" }} />
          <rect x="68" y="80" width="32" height="90" rx="3" fill="url(#splashGrad)" opacity="0.9" className="brick" style={{ animationDelay: "0.45s" }} />
          <rect x="106" y="40" width="32" height="130" rx="3" fill="url(#splashGrad)" opacity="0.8" className="brick" style={{ animationDelay: "0.8s" }} />
          <rect x="144" y="100" width="32" height="70" rx="3" fill="url(#splashGrad)" opacity="0.7" className="brick" style={{ animationDelay: "1.15s" }} />
        </svg>
        <div className="text-center">
          <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            {"Buildify".split("").map((c, i) => (
              <span
                key={i}
                className="inline-block animate-letter-rise"
                style={{ animationDelay: `${1.6 + i * 0.06}s` }}
              >
                {c}
              </span>
            ))}
            <span
              className="inline-block animate-letter-rise text-accent"
              style={{ animationDelay: "2.2s" }}
            >
              .
            </span>
          </div>
          <div
            className="mt-3 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground animate-letter-rise"
            style={{ animationDelay: "2.6s" }}
          >
            We build. You grow.
          </div>
        </div>
      </div>
    </div>
  );
}
