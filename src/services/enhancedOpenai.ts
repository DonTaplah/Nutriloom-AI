import OpenAI from 'openai';
import { createAPIError, createNetworkError, handleGlobalError } from '../utils/errorHandler';
import { apiClient } from '../utils/apiClient';

// Enhanced OpenAI service with error handling
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || apiKey === 'your_actual_openai_api_key_here') {
  console.error('OpenAI API key is not configured. Please add your API key to the .env file.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
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
  
  try {
    // Check API key configuration
    if (!apiKey || apiKey === 'your_actual_openai_api_key_here') {
      const configError = createAPIError(
        'OpenAI API key not configured',
        500,
        { service: 'openai', action: 'generateRecipes' }
      );
      throw configError;
    }

    // Validate input parameters
    if (!ingredients || ingredients.length === 0) {
      const validationError = createAPIError(
        'No ingredients provided',
        400,
        { ingredients, action: 'generateRecipes' }
      );
      validationError.userMessage = 'Please provide at least one ingredient to generate recipes.';
      throw validationError;
    }

    const skillLevelPrompts = {
      beginner: "Create simple, easy-to-follow recipes with basic cooking techniques. Use common ingredients and straightforward methods. Perfect for cooking novices.",
      pro: "Create intermediate to advanced recipes with more complex techniques, flavor combinations, and cooking methods. Include professional tips and techniques.",
      legendary: "Create masterpiece recipes with advanced culinary techniques, unique flavor profiles, and restaurant-quality presentations. Include molecular gastronomy, advanced knife skills, and professional plating techniques."
    };

    const cuisineFilter = cuisine && cuisine !== '' ? `Focus on ${cuisine} cuisine.` : '';
    const dishTypeFilter = dishType && dishType !== 'any' ? `Create ${dishType.replace('-', ' ')} recipes.` : '';
    
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
4. ${cuisineFilter ? `Follow ${cuisine} cuisine style` : 'Use diverse cuisine styles from around the world'}
5. ${dishTypeFilter ? `Be ${dishType.replace('-', ' ')} type dishes` : 'Include various dish types (appetizers, mains, sides, desserts)'}
6. Include common pantry staples (salt, pepper, oil, basic spices, flour, sugar, etc.) as needed

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
      const noResponseError = createAPIError(
        'No response from OpenAI API',
        500,
        { service: 'openai', action: 'generateRecipes' }
      );
      noResponseError.userMessage = 'Failed to generate recipes. Please try again.';
      throw noResponseError;
    }

    // Clean and parse JSON response
    let cleanedResponse = response.trim();
    
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '');
    }
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '');
    }
    if (cleanedResponse.endsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/\s*```$/, '');
    }
    
    const jsonStart = cleanedResponse.indexOf('[');
    const jsonEnd = cleanedResponse.lastIndexOf(']');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
    }

    let recipes;
    try {
      recipes = JSON.parse(cleanedResponse);
    } catch (parseError) {
      const jsonError = createAPIError(
        `Failed to parse OpenAI response: ${parseError}`,
        500,
        { response: cleanedResponse, parseError }
      );
      jsonError.userMessage = 'Failed to process the generated recipes. Please try again.';
      throw jsonError;
    }

    if (!Array.isArray(recipes)) {
      const formatError = createAPIError(
        'OpenAI response is not an array',
        500,
        { response: recipes }
      );
      formatError.userMessage = 'Received invalid recipe format. Please try again.';
      throw formatError;
    }

    // Transform to our Recipe interface format
    return recipes.map((recipe: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      name: recipe.name || 'Untitled Recipe',
      cookingTime: recipe.cookingTime || 30,
      prepTime: recipe.prepTime || 15,
      servings: recipe.servings || servings,
      cuisine: recipe.cuisine || 'International',
      difficulty: recipe.difficulty || 'Medium',
      image: getRecipeImage(recipe.imageDescription || recipe.name),
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      nutrition: {
        calories: recipe.nutrition?.calories || 300,
        protein: recipe.nutrition?.protein || 20,
        carbs: recipe.nutrition?.carbs || 30,
        fat: recipe.nutrition?.fat || 15,
        fiber: recipe.nutrition?.fiber || 5
      },
      tags: recipe.tags || []
    }));

  } catch (error) {
    if ('type' in error) {
      // Already an AppError, re-throw
      throw error;
    }

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        const networkError = createNetworkError(
          `Network error during recipe generation: ${error.message}`,
          { service: 'openai', action: 'generateRecipes' }
        );
        throw networkError;
      }

      if (error.message.includes('API key')) {
        const apiKeyError = createAPIError(
          'Invalid or missing OpenAI API key',
          401,
          { service: 'openai', action: 'generateRecipes' }
        );
        apiKeyError.userMessage = 'API configuration error. Please contact support.';
        throw apiKeyError;
      }
    }

    // Generic error fallback
    const genericError = createAPIError(
      `Recipe generation failed: ${error}`,
      500,
      { service: 'openai', action: 'generateRecipes', originalError: error }
    );
    throw genericError;
  }
};

// Recipe image mapping (keeping existing logic)
const recipeImages = {
  chicken: [
    'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  pasta: [
    'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  default: [
    'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};

const getRecipeImage = (recipeName: string) => {
  const name = recipeName.toLowerCase();
  
  if (name.includes('chicken')) {
    const images = recipeImages.chicken;
    return images[Math.floor(Math.random() * images.length)];
  }
  if (name.includes('pasta')) {
    const images = recipeImages.pasta;
    return images[Math.floor(Math.random() * images.length)];
  }
  
  const images = recipeImages.default;
  return images[Math.floor(Math.random() * images.length)];
};