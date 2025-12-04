import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft, Star, Printer, Share2, Bookmark, Utensils, Flame, Droplets } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to load recipes');
        }
        
        const data = await response.json();
        const foundRecipe = data.find(r => r.id === parseInt(id));
        
        if (!foundRecipe) {
          throw new Error('Recipe not found');
        }
        
        // Add detailed information for the recipe
        const enhancedRecipe = {
          ...foundRecipe,
          ingredients: [
            '2 cups all-purpose flour',
            '1 cup sugar',
            '3 large eggs',
            '1 cup milk',
            '1/2 cup butter, melted',
            '2 tsp baking powder',
            '1 tsp vanilla extract',
            '1/2 tsp salt'
          ],
          instructions: [
            'Preheat oven to 350°F (175°C). Grease and flour a 9-inch round cake pan.',
            'In a medium bowl, whisk together flour, baking powder, and salt.',
            'In a large bowl, beat eggs and sugar until light and fluffy.',
            'Add melted butter and vanilla extract, mix well.',
            'Gradually add flour mixture alternately with milk, beginning and ending with flour.',
            'Pour batter into prepared pan and smooth the top.',
            'Bake for 30-35 minutes or until a toothpick inserted comes out clean.',
            'Let cool in pan for 10 minutes, then transfer to wire rack to cool completely.'
          ],
          nutrition: {
            calories: 350,
            protein: '6g',
            carbs: '45g',
            fat: '15g',
            fiber: '2g'
          },
          tags: ['Dinner', 'Italian', 'Pasta', 'Comfort Food'],
          author: 'Chef Marco',
          date: 'November 15, 2024'
        };
        
        setRecipe(enhancedRecipe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The recipe you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </button>
        </div>

        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Recipe Image */}
            <div className="md:w-2/5">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            {/* Recipe Info */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
                    {recipe.difficulty}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                  <p className="text-gray-600">{recipe.summary}</p>
                </div>
              </div>

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-sm text-gray-600">Prep Time</div>
                  <div className="font-bold text-gray-900">{recipe.prepTime} min</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-600 mb-2" />
                  <div className="text-sm text-gray-600">Cook Time</div>
                  <div className="font-bold text-gray-900">{recipe.cookTime} min</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 mb-2" />
                  <div className="text-sm text-gray-600">Servings</div>
                  <div className="font-bold text-gray-900">{recipe.servings}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600 mb-2" />
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="font-bold text-gray-900">{recipe.rating}/5</div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ingredients Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
              </div>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              {/* Nutrition Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Calories</div>
                    <div className="font-bold text-gray-900">{recipe.nutrition.calories}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Protein</div>
                    <div className="font-bold text-gray-900">{recipe.nutrition.protein}</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Carbs</div>
                    <div className="font-bold text-gray-900">{recipe.nutrition.carbs}</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Fat</div>
                    <div className="font-bold text-gray-900">{recipe.nutrition.fat}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <ChefHat className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
              </div>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-blue-600" />
                    Recipe Notes
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Store in an airtight container for up to 3 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Can be frozen for up to 1 month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Best served warm</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-green-600" />
                    Tips & Variations
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>Add nuts or chocolate chips for extra flavor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>Use gluten-free flour for dietary restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>Top with fresh fruit or whipped cream</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex-1 max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Printer className="w-5 h-5" />
            Print Recipe
          </button>
          <button className="flex-1 max-w-md bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Recipe
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 max-w-md bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;