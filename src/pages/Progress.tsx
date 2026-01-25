import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TrendingUp, TrendingDown, Scale, Ruler, Dumbbell } from "lucide-react";
import { format } from "date-fns";

interface BodyMeasurement {
  id: string;
  weight_kg: number | null;
  body_fat_percentage: number | null;
  measured_at: string;
}

interface WorkoutLog {
  id: string;
  plan_date: string;
  is_completed: boolean;
}

export default function Progress() {
  const { user } = useAuth();
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchProgress();
  }, [user]);

  async function fetchProgress() {
    // Fetch body measurements
    const { data: measurementsData } = await supabase
      .from("body_measurements")
      .select("id, weight_kg, body_fat_percentage, measured_at")
      .eq("user_id", user!.id)
      .order("measured_at", { ascending: false })
      .limit(10);
    setMeasurements(measurementsData || []);

    // Fetch workout logs (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: logsData } = await supabase
      .from("workout_logs")
      .select("id, plan_date, is_completed")
      .eq("user_id", user!.id)
      .eq("is_completed", true)
      .gte("plan_date", format(thirtyDaysAgo, "yyyy-MM-dd"))
      .order("plan_date", { ascending: false });
    setWorkoutLogs(logsData || []);

    setLoading(false);
  }

  const latestWeight = measurements[0]?.weight_kg;
  const previousWeight = measurements[1]?.weight_kg;
  const weightChange = latestWeight && previousWeight ? latestWeight - previousWeight : null;

  const completedWorkouts = workoutLogs.filter(log => log.is_completed).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Weight
              </CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestWeight ? `${latestWeight} kg` : "—"}
              </div>
              {weightChange !== null && (
                <p className={`text-sm flex items-center gap-1 ${weightChange < 0 ? "text-accent" : "text-destructive"}`}>
                  {weightChange < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                  {Math.abs(weightChange).toFixed(1)} kg
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Body Fat
              </CardTitle>
              <Ruler className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {measurements[0]?.body_fat_percentage
                  ? `${measurements[0].body_fat_percentage}%`
                  : "—"}
              </div>
              <p className="text-sm text-muted-foreground">Last recorded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Workouts (30 days)
              </CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedWorkouts}</div>
              <p className="text-sm text-muted-foreground">completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Weight History */}
        <Card>
          <CardHeader>
            <CardTitle>Weight History</CardTitle>
          </CardHeader>
          <CardContent>
            {measurements.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No measurements recorded yet. Start tracking your progress!
              </p>
            ) : (
              <div className="space-y-3">
                {measurements.map((m) => (
                  <div key={m.id} className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(m.measured_at), "MMM d, yyyy")}
                    </span>
                    <span className="font-medium">{m.weight_kg} kg</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {workoutLogs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No workouts completed yet. Get moving!
              </p>
            ) : (
              <div className="space-y-3">
                {workoutLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(log.plan_date), "MMM d, yyyy")}
                    </span>
                    <span className="text-accent">✓ Completed</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
