import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, Calendar, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-[hsl(var(--accent-cyan))]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-1 h-1 w-1 rounded-full bg-[hsl(var(--accent-cyan))]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
