import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Linear-style Input Component
 *
 * Design principles:
 * - Clean, minimal borders
 * - Subtle focus state
 * - Consistent sizing
 */

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-soft-xs transition-all duration-150",
          "ring-offset-background placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-primary/50",
          "hover:border-border/80",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
