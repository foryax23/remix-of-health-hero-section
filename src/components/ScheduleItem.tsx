import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
  cyan: "bg-[hsl(var(--accent-cyan))]/20 text-[hsl(var(--accent-cyan))] border-[hsl(var(--accent-cyan))]/30",
  green: "bg-accent/20 text-accent border-accent/30",
  purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
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
        "flex items-start gap-4 rounded-xl bg-card/50 p-4 transition-all hover:bg-card",
        completed && "opacity-60",
        className
      )}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={onToggle}
        className="mt-1 h-5 w-5 rounded-md border-muted-foreground/50 data-[state=checked]:border-[hsl(var(--accent-cyan))] data-[state=checked]:bg-[hsl(var(--accent-cyan))]"
      />
      <div className="flex-1 space-y-1">
        <p className="text-sm text-muted-foreground">{time}</p>
        <p className={cn("font-medium", completed && "line-through")}>{title}</p>
      </div>
      <Badge
        variant="outline"
        className={cn("text-xs font-medium", categoryColors[categoryColor])}
      >
        {category}
      </Badge>
    </div>
  );
}
