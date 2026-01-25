import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealPlanItem {
  id: string;
  meal_slot: string;
  is_completed: boolean;
  custom_meal_name: string | null;
  recipe_id: string | null;
}

interface WorkoutLog {
  id: string;
  is_completed: boolean;
  workout_id: string | null;
}

export default function Planner() {
  const { user } = useAuth();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [mealPlans, setMealPlans] = useState<Record<string, MealPlanItem[]>>({});
  const [workoutLogs, setWorkoutLogs] = useState<Record<string, WorkoutLog>>({});
  const [loading, setLoading] = useState(true);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  useEffect(() => {
    if (user) fetchWeekData();
  }, [user, weekStart]);

  async function fetchWeekData() {
    setLoading(true);
    const startDate = format(weekStart, "yyyy-MM-dd");
    const endDate = format(addDays(weekStart, 6), "yyyy-MM-dd");

    // Fetch meal plans for the week
    const { data: plans } = await supabase
      .from("meal_plans")
      .select("id, plan_date")
      .eq("user_id", user!.id)
      .gte("plan_date", startDate)
      .lte("plan_date", endDate);

    const plansByDate: Record<string, MealPlanItem[]> = {};
    
    if (plans && plans.length > 0) {
      const planIds = plans.map(p => p.id);
      const { data: items } = await supabase
        .from("meal_plan_items")
        .select("*")
        .in("meal_plan_id", planIds);

      plans.forEach(plan => {
        const dateKey = plan.plan_date;
        plansByDate[dateKey] = (items || []).filter(
          item => item.meal_plan_id === plan.id
        );
      });
    }
    setMealPlans(plansByDate);

    // Fetch workout logs for the week
    const { data: logs } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", user!.id)
      .gte("plan_date", startDate)
      .lte("plan_date", endDate);

    const logsByDate: Record<string, WorkoutLog> = {};
    (logs || []).forEach(log => {
      logsByDate[log.plan_date] = log;
    });
    setWorkoutLogs(logsByDate);
    
    setLoading(false);
  }

  const prevWeek = () => setWeekStart(addDays(weekStart, -7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
          </h2>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-7">
            {weekDays.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const isToday = format(new Date(), "yyyy-MM-dd") === dateKey;
              const dayMeals = mealPlans[dateKey] || [];
              const dayWorkout = workoutLogs[dateKey];

              return (
                <Card key={dateKey} className={cn(isToday && "ring-2 ring-accent")}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <span className="block text-muted-foreground">{format(day, "EEE")}</span>
                      <span className={cn(isToday && "text-accent")}>{format(day, "d")}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {/* Meals */}
                    {dayMeals.length > 0 ? (
                      dayMeals.slice(0, 3).map((meal) => (
                        <div
                          key={meal.id}
                          className={cn(
                            "text-xs p-1.5 rounded",
                            meal.is_completed ? "bg-accent/20" : "bg-muted"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            {meal.is_completed && <Check className="h-3 w-3 text-accent" />}
                            <span className="capitalize truncate">{meal.meal_slot}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">No meals</p>
                    )}

                    {/* Workout */}
                    {dayWorkout && (
                      <Badge
                        variant={dayWorkout.is_completed ? "default" : "outline"}
                        className="text-xs w-full justify-center"
                      >
                        {dayWorkout.is_completed ? "✓ Workout" : "Workout"}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
