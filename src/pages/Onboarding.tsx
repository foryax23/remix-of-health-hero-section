import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const STEPS = [
  { id: "basics", title: "Basic Info", description: "Tell us about yourself" },
  { id: "goals", title: "Your Goals", description: "What do you want to achieve?" },
  { id: "nutrition", title: "Nutrition", description: "Set your daily targets" },
];

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    height_cm: "",
    weight_kg: "",
    gender: "",
    activity_level: "",
    fitness_goal: "",
  });
  
  const [targets, setTargets] = useState({
    calories_target: 2000,
    protein_target: 150,
    carbs_target: 200,
    fat_target: 65,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  async function handleComplete() {
    if (!user) return;
    setLoading(true);

    // Update profile
    await supabase.from("profiles").update({
      height_cm: profile.height_cm ? Number(profile.height_cm) : null,
      weight_kg: profile.weight_kg ? Number(profile.weight_kg) : null,
      gender: profile.gender || null,
      activity_level: profile.activity_level || null,
      fitness_goal: profile.fitness_goal || null,
      onboarding_completed: true,
    }).eq("user_id", user.id);

    // Update nutrition targets
    await supabase.from("nutrition_targets").update(targets).eq("user_id", user.id);

    setLoading(false);
    toast({ title: "Setup Complete!", description: "Welcome to NutriPlan!" });
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <Sparkles className="h-6 w-6 text-accent-foreground" />
          </div>
          <CardTitle>{STEPS[step].title}</CardTitle>
          <CardDescription>{STEPS[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step Indicator */}
          <div className="mb-6 flex justify-center gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${i <= step ? "bg-accent" : "bg-muted"}`}
              />
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Height (cm)</Label>
                  <Input
                    type="number"
                    placeholder="175"
                    value={profile.height_cm}
                    onChange={(e) => setProfile({ ...profile, height_cm: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    placeholder="70"
                    value={profile.weight_kg}
                    onChange={(e) => setProfile({ ...profile, weight_kg: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={profile.activity_level} onValueChange={(v) => setProfile({ ...profile, activity_level: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fitness Goal</Label>
                <Select value={profile.fitness_goal} onValueChange={(v) => setProfile({ ...profile, fitness_goal: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose_weight">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="build_muscle">Build Muscle</SelectItem>
                    <SelectItem value="improve_health">Improve Overall Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Nutrition Targets */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Daily Calories</Label>
                  <Input
                    type="number"
                    value={targets.calories_target}
                    onChange={(e) => setTargets({ ...targets, calories_target: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Protein (g)</Label>
                  <Input
                    type="number"
                    value={targets.protein_target}
                    onChange={(e) => setTargets({ ...targets, protein_target: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Carbs (g)</Label>
                  <Input
                    type="number"
                    value={targets.carbs_target}
                    onChange={(e) => setTargets({ ...targets, carbs_target: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fat (g)</Label>
                  <Input
                    type="number"
                    value={targets.fat_target}
                    onChange={(e) => setTargets({ ...targets, fat_target: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={step === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
