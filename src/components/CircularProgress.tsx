import { cn } from "@/lib/utils";

/**
 * Linear-style Circular Progress
 *
 * Design principles:
 * - Soft gradient with brand colors
 * - Smooth animations
 * - Monospace font for numbers (precision feel)
 * - Minimal, clean aesthetics
 */

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 180,
  strokeWidth = 10,
  label,
  sublabel,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          className="opacity-60"
        />
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {sublabel && (
          <span className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
