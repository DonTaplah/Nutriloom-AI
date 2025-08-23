// Comprehensive ingredient database for unlimited refresh
export const ingredientSets = [
  // Set 1 - Popular basics
  ['Chicken', 'Rice', 'Tomatoes', 'Onions', 'Garlic', 'Olive Oil', 'Pasta', 'Cheese', 'Bell Peppers', 'Mushrooms', 'Eggs', 'Potatoes'],
  
  // Set 2 - Healthy alternatives
  ['Salmon', 'Quinoa', 'Spinach', 'Avocado', 'Lemon', 'Ginger', 'Broccoli', 'Sweet Potato', 'Black Beans', 'Coconut Milk', 'Tofu', 'Carrots'],
  
  // Set 3 - Mediterranean
  ['Feta Cheese', 'Olives', 'Cucumber', 'Oregano', 'Basil', 'Zucchini', 'Eggplant', 'Pine Nuts', 'Sun-dried Tomatoes', 'Artichokes', 'Lamb', 'Yogurt'],
  
  // Set 4 - Asian ingredients
  ['Soy Sauce', 'Sesame Oil', 'Bok Choy', 'Shiitake Mushrooms', 'Rice Noodles', 'Miso Paste', 'Seaweed', 'Edamame', 'Wasabi', 'Mirin', 'Beef', 'Cabbage'],
  
  // Set 5 - Mexican/Latin
  ['Black Beans', 'Corn', 'Cilantro', 'Lime', 'Jalapeños', 'Cumin', 'Paprika', 'Tortillas', 'Avocado', 'Red Onion', 'Pork', 'Peppers'],
  
  // Set 6 - Indian spices & ingredients
  ['Turmeric', 'Curry Powder', 'Coconut', 'Chickpeas', 'Basmati Rice', 'Cardamom', 'Cinnamon', 'Lentils', 'Cauliflower', 'Paneer', 'Naan', 'Mint'],
  
  // Set 7 - Comfort food
  ['Ground Beef', 'Cheddar Cheese', 'Bacon', 'Butter', 'Cream', 'Flour', 'Milk', 'Bread', 'Lettuce', 'Pickles', 'Mayo', 'Ketchup'],
  
  // Set 8 - Seafood & coastal
  ['Shrimp', 'Cod', 'Mussels', 'Capers', 'White Wine', 'Parsley', 'Dill', 'Celery', 'Leeks', 'Fennel', 'Saffron', 'Bay Leaves'],
  
  // Set 9 - Vegetarian protein
  ['Tempeh', 'Nutritional Yeast', 'Cashews', 'Almonds', 'Hemp Seeds', 'Tahini', 'Hummus', 'Sprouts', 'Kale', 'Beets', 'Walnuts', 'Chia Seeds'],
  
  // Set 10 - Baking & desserts
  ['Vanilla', 'Cocoa Powder', 'Honey', 'Maple Syrup', 'Berries', 'Bananas', 'Oats', 'Coconut Flakes', 'Dark Chocolate', 'Cream Cheese', 'Pecans', 'Dates'],
  
  // Set 11 - Exotic & gourmet
  ['Truffle Oil', 'Prosciutto', 'Arugula', 'Brie', 'Fig', 'Pomegranate', 'Duck', 'Quinoa', 'Goat Cheese', 'Endive', 'Radicchio', 'Balsamic'],
  
  // Set 12 - Breakfast & brunch
  ['Pancake Mix', 'Blueberries', 'Strawberries', 'Greek Yogurt', 'Granola', 'Coffee', 'Orange Juice', 'Smoked Salmon', 'Bagels', 'Cream Cheese', 'Capers', 'Dill']
];

export const getRandomIngredientSet = (): string[] => {
  const randomIndex = Math.floor(Math.random() * ingredientSets.length);
  return ingredientSets[randomIndex];
};

export const getShuffledIngredients = (ingredients: string[]): string[] => {
  const shuffled = [...ingredients];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};