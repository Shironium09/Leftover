-- Minimal setup needed for the app to work correctly.
-- Run in: https://supabase.com/dashboard/project/jzswtyrvbuwmnszsxelo/sql

-- 1. Unique constraint on recipes so upsert by (user_id, name) works
ALTER TABLE public.recipes
  DROP CONSTRAINT IF EXISTS recipes_user_id_name_key;

ALTER TABLE public.recipes
  ADD CONSTRAINT recipes_user_id_name_key UNIQUE (user_id, name);

-- 2. Unique constraint on favorites so upsert by (user_id, recipe_id) works
ALTER TABLE public.favorites
  DROP CONSTRAINT IF EXISTS favorites_user_id_recipe_id_key;

ALTER TABLE public.favorites
  ADD CONSTRAINT favorites_user_id_recipe_id_key UNIQUE (user_id, recipe_id);
