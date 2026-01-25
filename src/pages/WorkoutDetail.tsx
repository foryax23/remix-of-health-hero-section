import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, Dumbbell, Loader2 } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number | null;
  reps: string | null;
  duration_seconds: number | null;
  rest_seconds: number | null;
  notes: string | null;
  order_index: number;
}

interface Workout {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  duration_minutes: number | null;
  difficulty: string | null;
  workout_type: string | null;
  target_muscles: string[] | null;
  equipment_needed: string[] | null;
}

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchWorkout();
  }, [id]);

  async function fetchWorkout() {
    const { data: workoutData } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    setWorkout(workoutData);

    if (workoutData) {
      const { data: exercisesData } = await supabase
        .from("exercises")
        .select("*")
        .eq("workout_id", id)
        .order("order_index");
      setExercises(exercisesData || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }

  if (!workout) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Workout not found</p>
          <Button variant="link" onClick={() => navigate("/workouts")}>
            Back to Workouts
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/workouts")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Workouts
        </Button>

        {/* Hero Image */}
        {workout.image_url ? (
          <div className="aspect-video rounded-xl overflow-hidden bg-muted">
            <img src={workout.image_url} alt={workout.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
            <Dumbbell className="h-16 w-16 text-muted-foreground" />
          </div>
        )}

        {/* Title & Meta */}
        <div>
          <div className="flex gap-2 mb-2">
            {workout.difficulty && <Badge className="capitalize">{workout.difficulty}</Badge>}
            {workout.workout_type && <Badge variant="outline" className="capitalize">{workout.workout_type}</Badge>}
          </div>
          <h1 className="text-3xl font-bold">{workout.title}</h1>
          {workout.description && (
            <p className="mt-2 text-muted-foreground">{workout.description}</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4">
          {workout.duration_minutes && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{workout.duration_minutes} min</span>
            </div>
          )}
          {workout.target_muscles && workout.target_muscles.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {workout.target_muscles.map((muscle) => (
                <Badge key={muscle} variant="secondary" className="text-xs capitalize">
                  {muscle}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Equipment */}
        {workout.equipment_needed && workout.equipment_needed.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Equipment Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {workout.equipment_needed.map((eq) => (
                  <Badge key={eq} variant="outline" className="capitalize">
                    {eq}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exercises */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            {exercises.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No exercises added yet</p>
            ) : (
              <div className="space-y-4">
                {exercises.map((exercise, i) => (
                  <div key={exercise.id} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                        {exercise.sets && <span>{exercise.sets} sets</span>}
                        {exercise.reps && <span>{exercise.reps} reps</span>}
                        {exercise.duration_seconds && <span>{exercise.duration_seconds}s</span>}
                        {exercise.rest_seconds && <span>{exercise.rest_seconds}s rest</span>}
                      </div>
                      {exercise.notes && (
                        <p className="mt-1 text-sm text-muted-foreground">{exercise.notes}</p>
                      )}
                    </div>
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
