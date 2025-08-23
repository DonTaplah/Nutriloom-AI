import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export interface RecipeGenerationParams {
  ingredients: string[];
  cuisine: string;
  skillLevel: 'beginner' | 'pro' | 'legendary';
  servings?: number;
}

export const generateRecipesWithAI = async (params: RecipeGenerationParams) => {
  const { ingredients, cuisine, skillLevel, servings = 4 } = params;
  
  const skillLevelPrompts = {
    beginner: "Create simple, easy-to-follow recipes with basic cooking techniques. Use common ingredients and straightforward methods. Perfect for cooking novices.",
    pro: "Create intermediate to advanced recipes with more complex techniques, flavor combinations, and cooking methods. Include professional tips and techniques.",
    legendary: "Create masterpiece recipes with advanced culinary techniques, unique flavor profiles, and restaurant-quality presentations. Include molecular gastronomy, advanced knife skills, and professional plating techniques."
  };

  const cuisineFilter = cuisine === 'all' ? '' : `Focus on ${cuisine} cuisine.`;
  
  const prompt = `You are a professional chef and recipe developer. ${skillLevelPrompts[skillLevel]}

Available ingredients: ${ingredients.join(', ')}
${cuisineFilter}
Servings: ${servings}

Generate 3 unique recipes using ONLY the provided ingredients plus common pantry staples (salt, pepper, oil, basic spices, flour, sugar, etc.).

For each recipe, provide:
1. Creative recipe name
2. Difficulty level (Easy/Medium/Hard based on skill level)
3. Prep time and cooking time
4. Complete ingredient list with measurements
5. Step-by-step instructions
6. Estimated nutrition per serving (calories, protein, carbs, fat, fiber)
7. 3-4 relevant tags
8. Brief description

Format as JSON array with this structure:
[
  {
    "name": "Recipe Name",
    "difficulty": "Easy|Medium|Hard",
    "prepTime": 15,
    "cookingTime": 30,
    "servings": ${servings},
    "cuisine": "Cuisine Type",
    "description": "Brief description",
    "ingredients": ["ingredient with measurement", ...],
    "instructions": ["step 1", "step 2", ...],
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbs": 30,
      "fat": 15,
      "fiber": 5
    },
    "tags": ["tag1", "tag2", "tag3"]
  }
]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional chef and recipe developer. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 3000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const recipes = JSON.parse(response);
    
    // Transform to our Recipe interface format
    return recipes.map((recipe: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      name: recipe.name,
      cookingTime: recipe.cookingTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
      image: getRandomFoodImage(),
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      nutrition: recipe.nutrition,
      tags: recipe.tags
    }));

  } catch (error) {
    console.error('Error generating recipes:', error);
    throw new Error('Failed to generate recipes. Please try again.');
  }
};

// Random food images from Pexels
const foodImages = [
  'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const getRandomFoodImage = () => {
  return foodImages[Math.floor(Math.random() * foodImages.length)];
};