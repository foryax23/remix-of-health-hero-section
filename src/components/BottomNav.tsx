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
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 lg:hidden">
      <nav 
        className="flex items-center gap-1 rounded-full px-2 py-2"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-full px-4 py-2 text-xs transition-all duration-200",
                isActive
                  ? "bg-white/10 text-[hsl(var(--accent-cyan))]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
