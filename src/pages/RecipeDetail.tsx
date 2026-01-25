import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, Flame, Drumstick, Wheat, Droplets, Loader2 } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  servings: number | null;
  difficulty: string | null;
  meal_type: string | null;
  diet_type: string[] | null;
  ingredients: unknown;
  instructions: unknown;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
}

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchRecipe();
  }, [id]);

  async function fetchRecipe() {
    const { data } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    setRecipe(data);
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

  if (!recipe) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Recipe not found</p>
          <Button variant="link" onClick={() => navigate("/meals")}>
            Back to Meals
          </Button>
        </div>
      </AppLayout>
    );
  }

  const ingredients = recipe.ingredients as { name: string; amount: string }[] | null;
  const instructions = recipe.instructions as string[] | null;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/meals")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Meals
        </Button>

        {/* Hero Image */}
        {recipe.image_url && (
          <div className="aspect-video rounded-xl overflow-hidden bg-muted">
            <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Title & Meta */}
        <div>
          <div className="flex gap-2 mb-2">
            {recipe.meal_type && <Badge className="capitalize">{recipe.meal_type}</Badge>}
            {recipe.difficulty && <Badge variant="outline" className="capitalize">{recipe.difficulty}</Badge>}
          </div>
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          {recipe.description && (
            <p className="mt-2 text-muted-foreground">{recipe.description}</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4">
          {(recipe.prep_time_minutes || recipe.cook_time_minutes) && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{(recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0)} min total</span>
            </div>
          )}
          {recipe.servings && (
            <div className="text-sm text-muted-foreground">{recipe.servings} servings</div>
          )}
        </div>

        {/* Nutrition */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nutrition (per serving)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                <p className="text-lg font-semibold">{recipe.calories || "—"}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
              <div>
                <Drumstick className="h-5 w-5 mx-auto mb-1 text-red-500" />
                <p className="text-lg font-semibold">{recipe.protein || "—"}g</p>
                <p className="text-xs text-muted-foreground">protein</p>
              </div>
              <div>
                <Wheat className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                <p className="text-lg font-semibold">{recipe.carbs || "—"}g</p>
                <p className="text-xs text-muted-foreground">carbs</p>
              </div>
              <div>
                <Droplets className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                <p className="text-lg font-semibold">{recipe.fat || "—"}g</p>
                <p className="text-xs text-muted-foreground">fat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        {ingredients && ingredients.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span>{ing.name}</span>
                    <span className="text-muted-foreground">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {instructions && instructions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </span>
                    <p className="text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
