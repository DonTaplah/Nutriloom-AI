import OpenAI from 'openai';

// Check if API key is properly configured
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || apiKey === 'your_actual_openai_api_key_here') {
  console.error('OpenAI API key is not configured. Please add your API key to the .env file.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export interface RecipeGenerationParams {
  ingredients: string[];
  cuisine: string;
  dishType?: string;
  skillLevel: 'beginner' | 'pro' | 'legendary';
  servings?: number;
}

export const generateRecipesWithAI = async (params: RecipeGenerationParams) => {
  const { ingredients, cuisine, dishType, skillLevel, servings = 4 } = params;
  
  const skillLevelPrompts = {
    beginner: "Create simple, easy-to-follow recipes with basic cooking techniques. Use common ingredients and straightforward methods. Perfect for cooking novices.",
    pro: "Create intermediate to advanced recipes with more complex techniques, flavor combinations, and cooking methods. Include professional tips and techniques.",
    legendary: "Create masterpiece recipes with advanced culinary techniques, unique flavor profiles, and restaurant-quality presentations. Include molecular gastronomy, advanced knife skills, and professional plating techniques."
  };

  const cuisineFilter = cuisine === 'all' ? '' : `Focus on ${cuisine} cuisine.`;
  const dishTypeFilter = dishType && dishType !== 'any' ? `Create ${dishType} recipes.` : '';
  
  const prompt = `You are a professional chef and recipe developer. ${skillLevelPrompts[skillLevel]}

MANDATORY REQUIREMENTS - ALL recipes must include these specifications:
- Available ingredients: ${ingredients.join(', ')}
- Skill level: ${skillLevel}
- Servings: ${servings} people
${cuisineFilter}
${dishTypeFilter}

Generate 12-15 unique and diverse recipes that MUST:
1. Use PRIMARILY the provided ingredients: ${ingredients.join(', ')}
2. Match the ${skillLevel} skill level exactly
3. Serve exactly ${servings} people
4. ${cuisineFilter ? `Follow ${cuisine} cuisine style` : 'Use diverse cuisine styles'}
5. ${dishTypeFilter ? `Be ${dishType} type dishes` : 'Include various dish types'}
6. Include common pantry staples (salt, pepper, oil, basic spices, flour, sugar, etc.) as needed

Make sure each recipe is distinctly different in:
- Cooking method (baking, frying, grilling, steaming, etc.)
- Flavor profile (spicy, sweet, savory, tangy, etc.)
- Meal type (breakfast, lunch, dinner, snack, dessert)
- Cuisine style (${cuisine !== 'all' ? cuisine : 'varied'})
- Difficulty level (${skillLevel})

For each recipe, provide:
1. Creative recipe name
2. Difficulty level (Easy/Medium/Hard matching ${skillLevel} level)
3. Prep time and cooking time
4. Complete ingredient list with measurements (featuring the selected ingredients: ${ingredients.join(', ')})
5. Step-by-step instructions
6. Estimated nutrition per serving (calories, protein, carbs, fat, fiber)
7. 3-4 relevant tags
8. Brief description
9. Suggested dish image description for photo matching

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
    "imageDescription": "Description of how the finished dish should look",
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
    // Check if API key is configured before making the request
    if (!apiKey || apiKey === 'your_actual_openai_api_key_here') {
      throw new Error('OpenAI API key is not configured. Please add your API key to the .env file and restart the development server.');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional chef and recipe developer. Always respond with valid JSON only. Generate 12-15 diverse recipes that showcase different cooking techniques and flavor profiles."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000
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
      image: getRecipeImage(recipe.imageDescription || recipe.name),
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

// Recipe-specific images from Pexels based on dish type
const recipeImages = {
  // Chicken dishes
  chicken: [
    'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Pasta dishes
  pasta: [
    'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Asian dishes
  asian: [
    'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Salads
  salad: [
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Soups
  soup: [
    'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Rice dishes
  rice: [
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Seafood
  seafood: [
    'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  // Default fallback
  default: [
    'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};

const getRecipeImage = (recipeName: string) => {
  const name = recipeName.toLowerCase();
  
  // Match recipe name to appropriate image category
  if (name.includes('chicken') || name.includes('poultry')) {
    const images = recipeImages.chicken;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('noodle')) {
    const images = recipeImages.pasta;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('stir') || name.includes('asian') || name.includes('thai') || name.includes('chinese')) {
    const images = recipeImages.asian;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('salad') || name.includes('greens')) {
    const images = recipeImages.salad;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('soup') || name.includes('broth') || name.includes('stew')) {
    const images = recipeImages.soup;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('rice') || name.includes('risotto') || name.includes('pilaf')) {
    const images = recipeImages.rice;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('fish') || name.includes('salmon') || name.includes('shrimp') || name.includes('seafood')) {
    const images = recipeImages.seafood;
    return images[Math.floor(Math.random() * images.length)];
  }
  
  // Default fallback
  const images = recipeImages.default;
  return images[Math.floor(Math.random() * images.length)];
};