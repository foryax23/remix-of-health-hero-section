import { cn } from "@/lib/utils";

/**
 * Linear-style Skeleton Component
 *
 * Design principles:
 * - Shimmer effect instead of simple pulse (perceived speed)
 * - Subtle gradient animation
 * - Maintains layout stability during loading
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rectangular";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        // Base shimmer animation
        "relative overflow-hidden bg-secondary/60",
        // Shimmer gradient overlay
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        // Variant-specific styling
        {
          "rounded-lg": variant === "default",
          "rounded h-4": variant === "text",
          "rounded-full": variant === "circular",
          "rounded-xl": variant === "rectangular",
        },
        className
      )}
      {...props}
    />
  );
}

// Preset skeleton patterns for common use cases
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full" // Last line shorter
          )}
        />
      ))}
    </div>
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 p-4", className)}>
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton variant="text" className="h-5 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
  );
}

function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };
  return <Skeleton variant="circular" className={sizeClasses[size]} />;
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar };
