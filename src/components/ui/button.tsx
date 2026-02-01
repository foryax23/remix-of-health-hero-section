import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles with premium micro-interactions
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-150 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary - Electric Indigo with subtle inner glow
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-soft-sm hover:shadow-soft shadow-inner-glow",
        // Destructive - Keeps semantic meaning
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg shadow-soft-sm hover:shadow-soft",
        // Outline - Ghost with precise border
        outline:
          "border border-border bg-transparent hover:bg-secondary/50 text-foreground rounded-lg",
        // Secondary - Subtle, for secondary actions
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        // Ghost - Minimal, for tertiary actions
        ghost:
          "hover:bg-secondary/60 text-muted-foreground hover:text-foreground rounded-lg",
        // Link - Text only
        link:
          "text-primary underline-offset-4 hover:underline active:scale-100",
        // Success variant
        success:
          "bg-success text-success-foreground hover:bg-success/90 rounded-lg shadow-soft-sm hover:shadow-soft",
        // Hero - For landing page CTAs (dark background context)
        hero:
          "bg-[hsl(var(--hero-button-bg))] text-[hsl(var(--hero-button-text))] hover:bg-[hsl(var(--hero-button-bg)/0.95)] rounded-full font-medium shadow-soft-md hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
        xl: "h-12 px-8 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
