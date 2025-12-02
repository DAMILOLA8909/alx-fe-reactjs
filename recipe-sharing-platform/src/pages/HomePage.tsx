import React, { useState } from 'react';
import { ChefHat, TrendingUp, Clock, Award, Search, Filter } from 'lucide-react';
import RecipeCard from '../components/recipes/RecipeCard';
import { Recipe } from '../interfaces';
import { CATEGORIES } from '../constants/categories';

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - in real app, this would come from an API
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Mediterranean Sea Bass',
      description: 'Pan-seared sea bass with lemon herb sauce and seasonal vegetables',
      ingredients: ['Sea bass', 'Lemon', 'Herbs', 'Olive oil', 'Vegetables'],
      instructions: ['Prepare fish', 'Season', 'Pan sear', 'Make sauce', 'Serve'],
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: 'Intermediate',
      category: 'Seafood',
      tags: ['healthy', 'mediterranean', 'fish'],
      imageUrl: '',
      author: {
        id: '1',
        name: 'Marco Bianchi',
        email: 'marco@example.com',
        role: 'chef',
        recipes: ['1', '2'],
        favorites: [],
        joinedAt: new Date('2023-01-15'),
      },
      rating: 4.8,
      reviews: 124,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    // Add more mock recipes as needed
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/5' 
            : 'bg-gradient-to-br from-sky-200/30 via-transparent to-blue-100/20'
        }`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className={`bg-clip-text text-transparent ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-300' 
                  : 'bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-400'
              }`}>
                Discover Amazing
              </span>
              <br />
              <span className={darkMode ? 'text-white' : 'text-slate-900'}>
                Recipes
              </span>
            </h1>
            
            <p className={`text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Join thousands of passionate cooks sharing their favorite recipes. 
              From quick meals to gourmet dishes, find your next culinary adventure.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search for recipes, ingredients, or chefs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 text-lg ${
                    darkMode 
                      ? 'bg-slate-800/50 border border-blue-800/30 focus:ring-cyan-500/50' 
                      : 'bg-white/80 border border-sky-200 focus:ring-blue-300 shadow-lg'
                  }`}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: ChefHat, label: 'Active Chefs', value: '2.5k+' },
                { icon: TrendingUp, label: 'Recipes', value: '10k+' },
                { icon: Clock, label: 'Avg Prep', value: '28min' },
                { icon: Award, label: 'Rating', value: '4.8/5' },
              ].map((stat, index) => (
                <div key={index} className={`p-6 rounded-2xl ${
                  darkMode 
                    ? 'bg-gradient-to-br from-slate-800/40 to-blue-900/20 border border-blue-800/20' 
                    : 'bg-white/70 border border-sky-100 shadow-md'
                }`}>
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${
                    darkMode ? 'text-cyan-400' : 'text-blue-500'
                  }`} />
                  <div className={`text-2xl font-bold mb-1 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className={`text-3xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Browse Categories
              </h2>
              <p className={`${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Find recipes by category
              </p>
            </div>
            <button className={`flex items-center space-x-2 ${
              darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'
            }`}>
              <span>View All</span>
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? darkMode
                      ? 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-cyan-500/30'
                      : 'bg-gradient-to-br from-sky-100 to-blue-100 border border-blue-300'
                    : darkMode
                      ? 'bg-slate-800/40 border border-blue-800/20 hover:border-cyan-500/30'
                      : 'bg-white/70 border border-sky-100 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className={`font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {category.name}
                </h3>
                <div className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {category.recipeCount} recipes
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className={`text-3xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Featured Recipes
            </h2>
            <p className={`${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Handpicked by our culinary team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                darkMode={darkMode}
                onLike={() => {}}
                isLiked={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-blue-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20'
                : 'bg-gradient-to-br from-sky-400 to-blue-400 hover:shadow-lg hover:shadow-blue-400/30'
            } text-white`}>
              View All Recipes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;