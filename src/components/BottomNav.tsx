import { Link, useLocation } from "react-router-dom";
import {
  Home,
  UtensilsCrossed,
  Calendar,
  TrendingUp,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Linear-style Bottom Navigation
 *
 * Design principles:
 * - Glass morphism with backdrop blur
 * - Subtle, precise styling
 * - Minimal active indicators (10% opacity pill)
 * - Fast micro-interactions
 */

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Meals", icon: UtensilsCrossed, href: "/meals" },
  { label: "Plan", icon: Calendar, href: "/planner" },
  { label: "Stats", icon: TrendingUp, href: "/progress" },
  { label: "Profile", icon: User, href: "/settings" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 lg:hidden">
      <nav
        className="flex items-center gap-0.5 rounded-2xl border border-border/50 bg-card/80 px-1.5 py-1.5 shadow-soft-lg"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl px-4 py-2 text-xs transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-all duration-150",
                  isActive && "scale-105"
                )}
                strokeWidth={isActive ? 2.25 : 1.75}
              />
              <span
                className={cn(
                  "mt-1 font-medium transition-all duration-150",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
