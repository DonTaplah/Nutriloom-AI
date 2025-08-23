export interface Recipe {
  id: string;
  name: string;
  cookingTime: number;
  prepTime: number;
  servings: number;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags: string[];
  description?: string;
}