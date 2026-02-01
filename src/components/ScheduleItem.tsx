import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

/**
 * Linear-style Schedule Item
 *
 * Design principles:
 * - Clean card with subtle hover state
 * - Monospace time for precision feel
 * - Subtle category badges
 * - Smooth check animations
 */

interface ScheduleItemProps {
  time: string;
  title: string;
  category: string;
  categoryColor?: "cyan" | "green" | "purple" | "orange";
  completed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const categoryColors = {
  cyan: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  purple: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  orange: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

export function ScheduleItem({
  time,
  title,
  category,
  categoryColor = "cyan",
  completed = false,
  onToggle,
  className,
}: ScheduleItemProps) {
  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-transparent bg-card p-3.5 shadow-soft-xs transition-all duration-150 hover:border-border hover:shadow-soft-sm",
        completed && "opacity-50",
        className
      )}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={onToggle}
        className="mt-0.5 h-4 w-4 rounded border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      />
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="font-mono text-xs text-muted-foreground">{time}</p>
        <p
          className={cn(
            "text-sm font-medium text-foreground transition-all duration-150",
            completed && "line-through text-muted-foreground"
          )}
        >
          {title}
        </p>
      </div>
      <Badge
        variant="outline"
        className={cn(
          "shrink-0 text-[10px] font-medium uppercase tracking-wider",
          categoryColors[categoryColor]
        )}
      >
        {category}
      </Badge>
    </div>
  );
}
