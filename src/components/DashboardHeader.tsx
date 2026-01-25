import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  displayName?: string | null;
  avatarUrl?: string | null;
}

export function DashboardHeader({ displayName, avatarUrl }: DashboardHeaderProps) {
  const today = new Date();
  const hour = today.getHours();
  
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const firstName = displayName?.split(" ")[0] || "there";

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {format(today, "EEEE, MMM d")}
        </p>
        <h1 className="text-2xl font-semibold">
          {greeting}, {firstName}
        </h1>
      </div>
      <Link to="/settings">
        <Avatar className="h-10 w-10 border-2 border-[hsl(var(--accent-cyan))]/30">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback className="bg-secondary text-foreground">
            {firstName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
