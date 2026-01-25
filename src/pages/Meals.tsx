import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Search, Clock, Flame, Loader2 } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  calories: number | null;
  meal_type: string | null;
  diet_type: string[] | null;
  difficulty: string | null;
}

export default function Meals() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterMealType, setFilterMealType] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data } = await supabase
      .from("recipes")
      .select("*")
      .eq("is_public", true)
      .order("title");
    setRecipes(data || []);
    setLoading(false);
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(search.toLowerCase());
    const matchesMealType = !filterMealType || recipe.meal_type === filterMealType;
    return matchesSearch && matchesMealType;
  });

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={filterMealType === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterMealType(null)}
            >
              All
            </Badge>
            {mealTypes.map((type) => (
              <Badge
                key={type}
                variant={filterMealType === type ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setFilterMealType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recipes found. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/meals/${recipe.id}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {recipe.image_url ? (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    {recipe.meal_type && (
                      <Badge className="absolute top-2 left-2 capitalize">
                        {recipe.meal_type}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">{recipe.title}</h3>
                    {recipe.description && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {recipe.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      {(recipe.prep_time_minutes || recipe.cook_time_minutes) && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {(recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0)} min
                        </span>
                      )}
                      {recipe.calories && (
                        <span className="flex items-center gap-1">
                          <Flame className="h-4 w-4" />
                          {recipe.calories} kcal
                        </span>
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
