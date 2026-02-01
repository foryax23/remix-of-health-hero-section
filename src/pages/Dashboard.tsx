import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CircularProgress } from "@/components/CircularProgress";
import { ScheduleItem } from "@/components/ScheduleItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Edit2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
}

interface ScheduleTask {
  id: string;
  time: string;
  title: string;
  category: string;
  categoryColor: "cyan" | "green" | "purple" | "orange";
  completed: boolean;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [readinessScore, setReadinessScore] = useState(75);
  const [schedule, setSchedule] = useState<ScheduleTask[]>([
    {
      id: "1",
      time: "07:00 - 08:00",
      title: "Morning Light Exposure",
      category: "recovery",
      categoryColor: "cyan",
      completed: false,
    },
    {
      id: "2",
      time: "08:30 - 09:30",
      title: "Deep Work Session",
      category: "focus",
      categoryColor: "purple",
      completed: false,
    },
    {
      id: "3",
      time: "12:00 - 12:45",
      title: "Recovery Walk",
      category: "workout",
      categoryColor: "green",
      completed: false,
    },
    {
      id: "4",
      time: "13:00 - 13:30",
      title: "Lunch: Grilled Chicken Salad",
      category: "meal",
      categoryColor: "orange",
      completed: false,
    },
  ]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("user_id", user!.id)
      .maybeSingle();
    setProfile(profileData);
  }

  const toggleTask = (taskId: string) => {
    setSchedule((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getReadinessMessage = (score: number) => {
    if (score >= 80)
      return {
        title: "High Readiness",
        message:
          "Your recovery is excellent. Great day for high-intensity activities.",
      };
    if (score >= 60)
      return {
        title: "Good Readiness",
        message: "You're well recovered. A solid workout session is recommended.",
      };
    if (score >= 40)
      return {
        title: "Moderate Readiness",
        message: "Consider a lighter workout or active recovery today.",
      };
    return {
      title: "Low Readiness",
      message: "Focus on rest and recovery. Light stretching recommended.",
    };
  };

  const readinessInfo = getReadinessMessage(readinessScore);
  const completedCount = schedule.filter((t) => t.completed).length;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <DashboardHeader
          displayName={profile?.display_name}
          avatarUrl={profile?.avatar_url}
        />

        {/* Readiness Score Card */}
        <Card variant="bordered" className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <CircularProgress
                value={readinessScore}
                max={100}
                size={160}
                strokeWidth={10}
                sublabel="READINESS"
              />
              <div className="text-center space-y-1">
                <h2 className="text-base font-medium text-foreground">
                  {readinessInfo.title}
                </h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {readinessInfo.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-medium text-foreground">
                Today's Schedule
              </h2>
              <p className="text-xs text-muted-foreground">
                {completedCount} of {schedule.length} completed
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground -mr-2"
            >
              <Link to="/planner">
                Edit
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-2">
            {schedule.map((task) => (
              <ScheduleItem
                key={task.id}
                time={task.time}
                title={task.title}
                category={task.category}
                categoryColor={task.categoryColor}
                completed={task.completed}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
