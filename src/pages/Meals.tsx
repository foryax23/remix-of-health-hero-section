import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Search, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

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

function RecipeCardSkeleton() {
  return (
    <Card variant="bordered" className="overflow-hidden">
      <Skeleton className="aspect-video w-full rounded-none" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
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
    const matchesMealType =
      !filterMealType || recipe.meal_type === filterMealType;
    return matchesSearch && matchesMealType;
  });

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-medium text-foreground">Recipes</h1>
          <p className="text-sm text-muted-foreground">
            Browse and discover healthy meal ideas
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <Badge
              variant={filterMealType === null ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-150",
                filterMealType === null && "shadow-soft-xs"
              )}
              onClick={() => setFilterMealType(null)}
            >
              All
            </Badge>
            {mealTypes.map((type) => (
              <Badge
                key={type}
                variant={filterMealType === type ? "default" : "outline"}
                className={cn(
                  "cursor-pointer capitalize transition-all duration-150",
                  filterMealType === type && "shadow-soft-xs"
                )}
                onClick={() => setFilterMealType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No recipes found. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/meals/${recipe.id}`}>
                <Card
                  variant="bordered"
                  className="group overflow-hidden transition-all duration-200 hover:shadow-soft hover:border-border/80"
                >
                  <div className="aspect-video bg-secondary relative overflow-hidden">
                    {recipe.image_url ? (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                    {recipe.meal_type && (
                      <Badge className="absolute top-2.5 left-2.5 capitalize shadow-soft-sm">
                        {recipe.meal_type}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-1">
                      {recipe.title}
                    </h3>
                    {recipe.description && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {recipe.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      {(recipe.prep_time_minutes || recipe.cook_time_minutes) && (
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3.5 w-3.5" />
                          {(recipe.prep_time_minutes || 0) +
                            (recipe.cook_time_minutes || 0)}
                          m
                        </span>
                      )}
                      {recipe.calories && (
                        <span className="flex items-center gap-1 font-mono">
                          <Flame className="h-3.5 w-3.5" />
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
