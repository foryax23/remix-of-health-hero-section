import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNav } from "@/components/BottomNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Dumbbell,
  Calendar,
  Sparkles,
  TrendingUp,
  ShoppingBasket,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Meals", icon: UtensilsCrossed, href: "/meals" },
  { label: "Workouts", icon: Dumbbell, href: "/workouts" },
  { label: "Planner", icon: Calendar, href: "/planner" },
  { label: "AI Coach", icon: Sparkles, href: "/coach" },
  { label: "Progress", icon: TrendingUp, href: "/progress" },
  { label: "Pantry", icon: ShoppingBasket, href: "/pantry" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar - Linear Style */}
        <aside
          className={cn(
            "hidden lg:flex lg:flex-col border-r border-border bg-sidebar transition-all duration-300 ease-smooth",
            isCollapsed ? "lg:w-16" : "lg:w-60"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Logo & Collapse Toggle */}
            <div className="flex h-14 items-center justify-between px-3 border-b border-border">
              <Link
                to="/dashboard"
                className={cn(
                  "flex items-center gap-2.5 transition-all duration-300",
                  isCollapsed && "justify-center"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-semibold text-foreground">
                    NutriPlan
                  </span>
                )}
              </Link>
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsCollapsed(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Expand button when collapsed */}
            {isCollapsed && (
              <div className="flex justify-center py-2 border-b border-border">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsCollapsed(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Navigation */}
            <ScrollArea className="flex-1 px-2 py-3">
              <nav className="space-y-0.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.href;
                  const NavLink = (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                        isCollapsed && "justify-center px-2",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          isActive && "text-primary"
                        )}
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  );

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return NavLink;
                })}
              </nav>
            </ScrollArea>

            {/* Sign Out */}
            <div className="border-t border-border p-2">
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="w-full text-muted-foreground hover:text-foreground"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-[18px] w-[18px]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    Sign Out
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm text-muted-foreground hover:text-foreground"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-[18px] w-[18px]" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col pb-24 lg:pb-0">
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </TooltipProvider>
  );
}
