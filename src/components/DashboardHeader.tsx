import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

/**
 * Linear-style Dashboard Header
 *
 * Design principles:
 * - Clean typography hierarchy
 * - Subtle date formatting
 * - Minimal avatar styling
 */

interface DashboardHeaderProps {
  displayName?: string | null;
  avatarUrl?: string | null;
}

export function DashboardHeader({
  displayName,
  avatarUrl,
}: DashboardHeaderProps) {
  const today = new Date();
  const hour = today.getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = displayName?.split(" ")[0] || "there";

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {format(today, "EEEE, MMMM d")}
        </p>
        <h1 className="text-xl font-medium text-foreground">
          {greeting}, {firstName}
        </h1>
      </div>
      <Link
        to="/settings"
        className="transition-transform duration-150 hover:scale-105"
      >
        <Avatar className="h-9 w-9 ring-2 ring-border ring-offset-2 ring-offset-background">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
            {firstName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
