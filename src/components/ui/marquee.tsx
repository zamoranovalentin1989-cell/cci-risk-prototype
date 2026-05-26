import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  duration = 30,
  pauseOnHover = false,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={`flex w-max ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee-scroll var(--marquee-duration) linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
