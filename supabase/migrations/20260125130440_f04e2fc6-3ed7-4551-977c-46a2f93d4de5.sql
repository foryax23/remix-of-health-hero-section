-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('user', 'trainer', 'admin');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  date_of_birth DATE,
  gender TEXT,
  activity_level TEXT,
  fitness_goal TEXT,
  dietary_preferences TEXT[],
  allergies TEXT[],
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Create nutrition_targets table
CREATE TABLE public.nutrition_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  calories_target INTEGER DEFAULT 2000,
  protein_target INTEGER DEFAULT 150,
  carbs_target INTEGER DEFAULT 200,
  fat_target INTEGER DEFAULT 65,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create body_measurements table
CREATE TABLE public.body_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weight_kg NUMERIC,
  body_fat_percentage NUMERIC,
  muscle_mass_kg NUMERIC,
  waist_cm NUMERIC,
  chest_cm NUMERIC,
  arm_cm NUMERIC,
  measured_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER DEFAULT 1,
  difficulty TEXT DEFAULT 'easy',
  meal_type TEXT,
  diet_type TEXT[],
  ingredients JSONB,
  instructions JSONB,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meal_plans table
CREATE TABLE public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, plan_date)
);

-- Create meal_plan_items table
CREATE TABLE public.meal_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
  meal_slot TEXT NOT NULL, -- breakfast, lunch, dinner, snack
  servings NUMERIC DEFAULT 1,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  custom_meal_name TEXT,
  custom_calories INTEGER,
  custom_protein INTEGER,
  custom_carbs INTEGER,
  custom_fat INTEGER
);

-- Create workouts table
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  duration_minutes INTEGER,
  difficulty TEXT DEFAULT 'intermediate',
  workout_type TEXT,
  target_muscles TEXT[],
  equipment_needed TEXT[],
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets INTEGER,
  reps TEXT,
  duration_seconds INTEGER,
  rest_seconds INTEGER,
  notes TEXT,
  order_index INTEGER DEFAULT 0
);

-- Create workout_logs table
CREATE TABLE public.workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE SET NULL,
  plan_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Create pantry_items table
CREATE TABLE public.pantry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity_text TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;

-- Create has_role function for role-based access
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Nutrition targets policies
CREATE POLICY "Users can view their own nutrition targets"
  ON public.nutrition_targets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nutrition targets"
  ON public.nutrition_targets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrition targets"
  ON public.nutrition_targets FOR UPDATE
  USING (auth.uid() = user_id);

-- Body measurements policies
CREATE POLICY "Users can manage their own body measurements"
  ON public.body_measurements FOR ALL
  USING (auth.uid() = user_id);

-- Recipes policies (public recipes are viewable by all authenticated users)
CREATE POLICY "Anyone can view public recipes"
  ON public.recipes FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can manage their own recipes"
  ON public.recipes FOR ALL
  USING (auth.uid() = created_by);

-- Meal plans policies
CREATE POLICY "Users can manage their own meal plans"
  ON public.meal_plans FOR ALL
  USING (auth.uid() = user_id);

-- Meal plan items policies
CREATE POLICY "Users can manage their meal plan items"
  ON public.meal_plan_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.meal_plans mp
      WHERE mp.id = meal_plan_id AND mp.user_id = auth.uid()
    )
  );

-- Workouts policies (public workouts are viewable by all authenticated users)
CREATE POLICY "Anyone can view public workouts"
  ON public.workouts FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can manage their own workouts"
  ON public.workouts FOR ALL
  USING (auth.uid() = created_by);

-- Exercises policies
CREATE POLICY "Users can view exercises of public workouts"
  ON public.exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workouts w
      WHERE w.id = workout_id AND w.is_public = true
    )
  );

-- Workout logs policies
CREATE POLICY "Users can manage their own workout logs"
  ON public.workout_logs FOR ALL
  USING (auth.uid() = user_id);

-- Pantry items policies
CREATE POLICY "Users can manage their own pantry items"
  ON public.pantry_items FOR ALL
  USING (auth.uid() = user_id);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nutrition_targets_updated_at
  BEFORE UPDATE ON public.nutrition_targets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  INSERT INTO public.nutrition_targets (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();