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

export interface DishAnalysisResult {
  dishName: string;
  confidence: number;
  description: string;
  cuisine: string;
  mealType: string;
  ingredients: {
    primary: string[];
    secondary: string[];
    seasonings: string[];
  };
  nutritionalAnalysis: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
  };
  macroBreakdown: {
    name: string;
    percentage: number;
    color: string;
  }[];
  healthMetrics: {
    healthScore: number;
    nutritionGrade: string;
    dietaryFlags: string[];
    allergens: string[];
  };
  cookingAnalysis: {
    cookingMethod: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    estimatedCookTime: number;
    servingSize: number;
  };
  recommendations: {
    improvements: string[];
    pairings: string[];
    alternatives: string[];
  };
}

export const analyzeImage = async (imageFile: File): Promise<DishAnalysisResult> => {
  try {
    // Check if API key is configured before making the request
    if (!apiKey || apiKey === 'your_actual_openai_api_key_here') {
      throw new Error('OpenAI API key is not configured. Please add your API key to the .env file and restart the development server.');
    }

    // Convert image to base64
    const base64Image = await convertToBase64(imageFile);

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert food analyst, nutritionist, and culinary expert. Analyze food images with extreme precision and provide comprehensive analysis including:

1. DISH IDENTIFICATION: Identify the exact dish name, cuisine type, and meal category
2. INGREDIENT ANALYSIS: Break down all visible ingredients into primary, secondary, and seasonings
3. NUTRITIONAL ASSESSMENT: Provide detailed macro and micronutrient analysis
4. HEALTH EVALUATION: Score the dish's healthiness and identify dietary considerations
5. CULINARY ANALYSIS: Assess cooking methods, difficulty, and preparation details
6. RECOMMENDATIONS: Suggest improvements, pairings, and healthier alternatives

Be extremely detailed and accurate. Use your expertise to provide restaurant-quality food analysis.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this food image in extreme detail. Provide a comprehensive analysis including:

REQUIRED ANALYSIS:
1. Dish identification with confidence level (0-100%)
2. Complete ingredient breakdown (primary, secondary, seasonings)
3. Detailed nutritional analysis per serving
4. Health score and dietary flags
5. Cooking method analysis
6. Professional recommendations

FORMAT AS JSON:
{
  "dishName": "Exact dish name",
  "confidence": 95,
  "description": "Detailed description of the dish",
  "cuisine": "Cuisine type",
  "mealType": "breakfast/lunch/dinner/snack/dessert",
  "ingredients": {
    "primary": ["main ingredients"],
    "secondary": ["supporting ingredients"],
    "seasonings": ["herbs, spices, condiments"]
  },
  "nutritionalAnalysis": {
    "calories": 450,
    "protein": 25,
    "carbs": 35,
    "fat": 18,
    "fiber": 6,
    "sugar": 8,
    "sodium": 650,
    "cholesterol": 45
  },
  "macroBreakdown": [
    {"name": "Protein", "percentage": 35, "color": "bg-red-500"},
    {"name": "Carbohydrates", "percentage": 40, "color": "bg-yellow-500"},
    {"name": "Fats", "percentage": 25, "color": "bg-orange-500"}
  ],
  "healthMetrics": {
    "healthScore": 8.5,
    "nutritionGrade": "A-",
    "dietaryFlags": ["High Protein", "Low Sugar", "Gluten-Free"],
    "allergens": ["Dairy", "Nuts"]
  },
  "cookingAnalysis": {
    "cookingMethod": ["Grilled", "Sautéed"],
    "difficulty": "Medium",
    "estimatedCookTime": 25,
    "servingSize": 1
  },
  "recommendations": {
    "improvements": ["Add more vegetables", "Reduce sodium"],
    "pairings": ["Quinoa salad", "Steamed broccoli"],
    "alternatives": ["Baked version", "Plant-based protein"]
  }
}`
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.3
    });

    const analysisText = response.choices[0]?.message?.content;
    if (!analysisText) {
      throw new Error('No analysis received from OpenAI');
    }

    // Parse the JSON response
    const analysis = JSON.parse(analysisText);
    
    // Validate and return the analysis
    return {
      dishName: analysis.dishName || 'Unknown Dish',
      confidence: analysis.confidence || 0,
      description: analysis.description || 'No description available',
      cuisine: analysis.cuisine || 'Unknown',
      mealType: analysis.mealType || 'Unknown',
      ingredients: {
        primary: analysis.ingredients?.primary || [],
        secondary: analysis.ingredients?.secondary || [],
        seasonings: analysis.ingredients?.seasonings || []
      },
      nutritionalAnalysis: {
        calories: analysis.nutritionalAnalysis?.calories || 0,
        protein: analysis.nutritionalAnalysis?.protein || 0,
        carbs: analysis.nutritionalAnalysis?.carbs || 0,
        fat: analysis.nutritionalAnalysis?.fat || 0,
        fiber: analysis.nutritionalAnalysis?.fiber || 0,
        sugar: analysis.nutritionalAnalysis?.sugar || 0,
        sodium: analysis.nutritionalAnalysis?.sodium || 0,
        cholesterol: analysis.nutritionalAnalysis?.cholesterol || 0
      },
      macroBreakdown: analysis.macroBreakdown || [
        { name: 'Protein', percentage: 33, color: 'bg-red-500' },
        { name: 'Carbohydrates', percentage: 33, color: 'bg-yellow-500' },
        { name: 'Fats', percentage: 34, color: 'bg-orange-500' }
      ],
      healthMetrics: {
        healthScore: analysis.healthMetrics?.healthScore || 5.0,
        nutritionGrade: analysis.healthMetrics?.nutritionGrade || 'C',
        dietaryFlags: analysis.healthMetrics?.dietaryFlags || [],
        allergens: analysis.healthMetrics?.allergens || []
      },
      cookingAnalysis: {
        cookingMethod: analysis.cookingAnalysis?.cookingMethod || ['Unknown'],
        difficulty: analysis.cookingAnalysis?.difficulty || 'Medium',
        estimatedCookTime: analysis.cookingAnalysis?.estimatedCookTime || 30,
        servingSize: analysis.cookingAnalysis?.servingSize || 1
      },
      recommendations: {
        improvements: analysis.recommendations?.improvements || [],
        pairings: analysis.recommendations?.pairings || [],
        alternatives: analysis.recommendations?.alternatives || []
      }
    };

  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Helper function to get nutrition grade color
export const getNutritionGradeColor = (grade: string): string => {
  switch (grade.charAt(0).toUpperCase()) {
    case 'A': return 'text-green-400';
    case 'B': return 'text-blue-400';
    case 'C': return 'text-yellow-400';
    case 'D': return 'text-orange-400';
    case 'F': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

// Helper function to get health score color
export const getHealthScoreColor = (score: number): string => {
  if (score >= 8.5) return 'text-green-400';
  if (score >= 7.0) return 'text-blue-400';
  if (score >= 5.5) return 'text-yellow-400';
  if (score >= 4.0) return 'text-orange-400';
  return 'text-red-400';
};