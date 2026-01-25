import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Search, Clock, Dumbbell, Loader2 } from "lucide-react";

interface Workout {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  duration_minutes: number | null;
  difficulty: string | null;
  workout_type: string | null;
  target_muscles: string[] | null;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("is_public", true)
      .order("title");
    setWorkouts(data || []);
    setLoading(false);
  }

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(search.toLowerCase()) ||
      workout.description?.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = !filterDifficulty || workout.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = ["beginner", "intermediate", "advanced"];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search workouts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={filterDifficulty === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterDifficulty(null)}
            >
              All
            </Badge>
            {difficulties.map((diff) => (
              <Badge
                key={diff}
                variant={filterDifficulty === diff ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setFilterDifficulty(diff)}
              >
                {diff}
              </Badge>
            ))}
          </div>
        </div>

        {/* Workout Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No workouts found. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkouts.map((workout) => (
              <Link key={workout.id} to={`/workouts/${workout.id}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {workout.image_url ? (
                      <img
                        src={workout.image_url}
                        alt={workout.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Dumbbell className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    {workout.difficulty && (
                      <Badge className="absolute top-2 left-2 capitalize">
                        {workout.difficulty}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">{workout.title}</h3>
                    {workout.description && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {workout.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      {workout.duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {workout.duration_minutes} min
                        </span>
                      )}
                      {workout.workout_type && (
                        <span className="capitalize">{workout.workout_type}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
