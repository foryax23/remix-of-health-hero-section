import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface Profile {
  display_name: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  gender: string | null;
  activity_level: string | null;
  fitness_goal: string | null;
}

interface NutritionTargets {
  calories_target: number;
  protein_target: number;
  carbs_target: number;
  fat_target: number;
}

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    height_cm: null,
    weight_kg: null,
    gender: null,
    activity_level: null,
    fitness_goal: null,
  });
  const [targets, setTargets] = useState<NutritionTargets>({
    calories_target: 2000,
    protein_target: 150,
    carbs_target: 200,
    fat_target: 65,
  });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  async function fetchData() {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();
    if (profileData) setProfile(profileData);

    const { data: targetsData } = await supabase
      .from("nutrition_targets")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();
    if (targetsData) setTargets(targetsData);

    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);

    // Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update(profile)
      .eq("user_id", user!.id);

    // Update nutrition targets
    const { error: targetsError } = await supabase
      .from("nutrition_targets")
      .update(targets)
      .eq("user_id", user!.id);

    setSaving(false);

    if (profileError || targetsError) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save settings" });
    } else {
      toast({ title: "Saved!", description: "Your settings have been updated" });
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate("/");
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

  return (
    <AppLayout>
      <div className="space-y-8 max-w-lg mx-auto">
        {/* Profile Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Profile</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Display Name</Label>
              <Input
                value={profile.display_name || ""}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                className="bg-secondary/50 border-0 rounded-xl h-12"
              />
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Height (cm)</Label>
                <Input
                  type="number"
                  value={profile.height_cm || ""}
                  onChange={(e) => setProfile({ ...profile, height_cm: Number(e.target.value) || null })}
                  className="bg-secondary/50 border-0 rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Weight (kg)</Label>
                <Input
                  type="number"
                  value={profile.weight_kg || ""}
                  onChange={(e) => setProfile({ ...profile, weight_kg: Number(e.target.value) || null })}
                  className="bg-secondary/50 border-0 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Gender</Label>
              <Select value={profile.gender || ""} onValueChange={(v) => setProfile({ ...profile, gender: v })}>
                <SelectTrigger className="bg-secondary/50 border-0 rounded-xl h-12">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Activity Level</Label>
              <Select value={profile.activity_level || ""} onValueChange={(v) => setProfile({ ...profile, activity_level: v })}>
                <SelectTrigger className="bg-secondary/50 border-0 rounded-xl h-12">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Lightly Active</SelectItem>
                  <SelectItem value="moderate">Moderately Active</SelectItem>
                  <SelectItem value="active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Fitness Goal</Label>
              <Select value={profile.fitness_goal || ""} onValueChange={(v) => setProfile({ ...profile, fitness_goal: v })}>
                <SelectTrigger className="bg-secondary/50 border-0 rounded-xl h-12">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="build_muscle">Build Muscle</SelectItem>
                  <SelectItem value="improve_health">Improve Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Nutrition Targets Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Daily Nutrition Targets</h2>
          
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Calories</Label>
              <Input
                type="number"
                value={targets.calories_target}
                onChange={(e) => setTargets({ ...targets, calories_target: Number(e.target.value) })}
                className="bg-secondary/50 border-0 rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Protein (g)</Label>
              <Input
                type="number"
                value={targets.protein_target}
                onChange={(e) => setTargets({ ...targets, protein_target: Number(e.target.value) })}
                className="bg-secondary/50 border-0 rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Carbs (g)</Label>
              <Input
                type="number"
                value={targets.carbs_target}
                onChange={(e) => setTargets({ ...targets, carbs_target: Number(e.target.value) })}
                className="bg-secondary/50 border-0 rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Fat (g)</Label>
              <Input
                type="number"
                value={targets.fat_target}
                onChange={(e) => setTargets({ ...targets, fat_target: Number(e.target.value) })}
                className="bg-secondary/50 border-0 rounded-xl h-12"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 h-12 rounded-xl bg-[hsl(var(--accent-cyan))] hover:bg-[hsl(var(--accent-cyan))]/90 text-background font-medium"
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="h-12 rounded-xl border-border/50 hover:bg-secondary/50"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
