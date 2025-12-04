import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { Search, ChefHat, Clock, Award, Users } from 'lucide-react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // IMPORTANT: Use the correct path for public folder
        const response = await fetch('/data.json');
        
        // Check if response is HTML (means file not found)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error('data.json file not found in public folder');
        }
        
        if (!response.ok) {
          throw new Error(`Failed to load recipes: ${response.status}`);
        }
        
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // If loading or error, show simple UI
  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          {loading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading recipes...</p>
            </>
          ) : (
            <>
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Temporary Display</h2>
              <p className="text-gray-600 mb-4">Using sample recipes while data.json loads</p>
              <p className="text-sm text-gray-500">Error: {error}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Use sample data if fetch fails
  const sampleRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      summary: "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2c5?w=400&h=300&fit=crop",
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: "Easy",
      rating: 4.5
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      summary: "Chunks of grilled chicken cooked in a smooth buttery & creamy tomato based gravy.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      prepTime: 30,
      cookTime: 40,
      servings: 6,
      difficulty: "Intermediate",
      rating: 4.8
    }
  ];

  const displayRecipes = recipes.length > 0 ? recipes : sampleRecipes;
  const filteredRecipes = displayRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🍳 Welcome to RecipeShare
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Discover, share, and cook amazing recipes
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Recipes'}
          </h2>
          <p className="text-gray-600">
            {searchTerm 
              ? `Found ${filteredRecipes.length} recipes`
              : 'Discover our collection of delicious recipes'
            }
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Info if no data.json */}
        {recipes.length === 0 && (
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-yellow-800">
              <strong>Note:</strong> Using sample data. Create <code>public/data.json</code> for your recipes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;