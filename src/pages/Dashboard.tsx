import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Flame, Drumstick, Wheat, Droplets, Calendar, Dumbbell } from "lucide-react";
import { format } from "date-fns";

interface NutritionTargets {
  calories_target: number;
  protein_target: number;
  carbs_target: number;
  fat_target: number;
}

interface Profile {
  display_name: string | null;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [targets, setTargets] = useState<NutritionTargets | null>(null);
  const [todayMeals, setTodayMeals] = useState<number>(0);
  const [todayWorkout, setTodayWorkout] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    const today = format(new Date(), "yyyy-MM-dd");

    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user!.id)
      .maybeSingle();
    setProfile(profileData);

    // Fetch nutrition targets
    const { data: targetsData } = await supabase
      .from("nutrition_targets")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();
    setTargets(targetsData);

    // Fetch today's meal plan items count
    const { data: mealPlan } = await supabase
      .from("meal_plans")
      .select("id")
      .eq("user_id", user!.id)
      .eq("plan_date", today)
      .maybeSingle();

    if (mealPlan) {
      const { count } = await supabase
        .from("meal_plan_items")
        .select("*", { count: "exact", head: true })
        .eq("meal_plan_id", mealPlan.id)
        .eq("is_completed", true);
      setTodayMeals(count || 0);
    }

    // Check for today's workout
    const { data: workoutLog } = await supabase
      .from("workout_logs")
      .select("is_completed")
      .eq("user_id", user!.id)
      .eq("plan_date", today)
      .eq("is_completed", true)
      .maybeSingle();
    setTodayWorkout(!!workoutLog);
  }

  // Mock consumed values for demo
  const consumed = {
    calories: 1450,
    protein: 95,
    carbs: 120,
    fat: 45,
  };

  const getProgress = (consumed: number, target: number) =>
    Math.min(Math.round((consumed / target) * 100), 100);

  return (
    <AppLayout title="Dashboard" description={`Welcome back${profile?.display_name ? `, ${profile.display_name}` : ""}!`}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Calories
              </CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consumed.calories} <span className="text-sm font-normal text-muted-foreground">/ {targets?.calories_target || 2000}</span>
              </div>
              <Progress
                value={getProgress(consumed.calories, targets?.calories_target || 2000)}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Protein
              </CardTitle>
              <Drumstick className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consumed.protein}g <span className="text-sm font-normal text-muted-foreground">/ {targets?.protein_target || 150}g</span>
              </div>
              <Progress
                value={getProgress(consumed.protein, targets?.protein_target || 150)}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Carbs
              </CardTitle>
              <Wheat className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consumed.carbs}g <span className="text-sm font-normal text-muted-foreground">/ {targets?.carbs_target || 200}g</span>
              </div>
              <Progress
                value={getProgress(consumed.carbs, targets?.carbs_target || 200)}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Fat
              </CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consumed.fat}g <span className="text-sm font-normal text-muted-foreground">/ {targets?.fat_target || 65}g</span>
              </div>
              <Progress
                value={getProgress(consumed.fat, targets?.fat_target || 65)}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Today's Overview */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Meals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{todayMeals}</p>
              <p className="text-sm text-muted-foreground">meals completed today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Today's Workout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{todayWorkout ? "✅ Done" : "⏳ Pending"}</p>
              <p className="text-sm text-muted-foreground">
                {todayWorkout ? "Great job!" : "Don't forget to exercise!"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
