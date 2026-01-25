import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface PantryItem {
  id: string;
  item_name: string;
  quantity_text: string | null;
  category: string | null;
}

const CATEGORIES = ["Proteins", "Dairy", "Grains", "Vegetables", "Fruits", "Pantry Staples", "Other"];

const QUICK_ADD = [
  { name: "Eggs", category: "Proteins" },
  { name: "Chicken breast", category: "Proteins" },
  { name: "Salmon", category: "Proteins" },
  { name: "Milk", category: "Dairy" },
  { name: "Greek yogurt", category: "Dairy" },
  { name: "Cheese", category: "Dairy" },
  { name: "Rice", category: "Grains" },
  { name: "Pasta", category: "Grains" },
  { name: "Oats", category: "Grains" },
  { name: "Spinach", category: "Vegetables" },
  { name: "Broccoli", category: "Vegetables" },
  { name: "Bananas", category: "Fruits" },
  { name: "Apples", category: "Fruits" },
  { name: "Olive oil", category: "Pantry Staples" },
];

export default function Pantry() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (user) fetchItems();
  }, [user]);

  async function fetchItems() {
    const { data } = await supabase
      .from("pantry_items")
      .select("*")
      .eq("user_id", user!.id)
      .order("item_name");
    if (data) setItems(data);
    setLoading(false);
  }

  async function addItem(name: string, category?: string) {
    if (!user || !name.trim()) return;
    setAdding(true);

    const { data, error } = await supabase
      .from("pantry_items")
      .insert({ user_id: user.id, item_name: name.trim(), category })
      .select()
      .single();

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else if (data) {
      setItems([...items, data]);
      setNewItem("");
      toast({ title: "Added!", description: `${name} added to pantry` });
    }
    setAdding(false);
  }

  async function removeItem(id: string) {
    await supabase.from("pantry_items").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  }

  const itemNames = new Set(items.map((i) => i.item_name.toLowerCase()));
  const suggestions = QUICK_ADD.filter((q) => !itemNames.has(q.name.toLowerCase()));

  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter((i) => i.category === cat);
    return acc;
  }, {} as Record<string, PantryItem[]>);

  return (
    <AppLayout>
      {/* Add Item */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Add Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => { e.preventDefault(); addItem(newItem); }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter item name..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={adding || !newItem.trim()}>
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add
            </Button>
          </form>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 8).map((s) => (
                  <Badge
                    key={s.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onClick={() => addItem(s.name, s.category)}
                  >
                    + {s.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pantry Items */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Your pantry is empty. Add some items!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const categoryItems = groupedItems[category];
            if (categoryItems.length === 0) return null;

            return (
              <Card key={category}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categoryItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <span className="text-sm">{item.item_name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
