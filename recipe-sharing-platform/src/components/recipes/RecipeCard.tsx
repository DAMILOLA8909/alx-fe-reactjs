import React from 'react';
import { Clock, Users, Star, Heart, ChefHat } from 'lucide-react';
import { Recipe } from '../../interfaces';

interface RecipeCardProps {
  recipe: Recipe;
  darkMode: boolean;
  onLike: (id: string) => void;
  isLiked: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, darkMode, onLike, isLiked }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="group relative">
      <div className={`absolute inset-0 rounded-2xl transform group-hover:scale-105 transition-transform duration-500 ${
        darkMode ? 'bg-gradient-to-br from-slate-900 to-blue-900/20' : 'bg-gradient-to-br from-white to-sky-50'
      }`}></div>
      
      <article className={`relative backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-xl ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-800/30 to-blue-900/10 border-blue-800/30 group-hover:border-cyan-500/40' 
          : 'bg-white/90 border-sky-100 group-hover:border-blue-300 shadow-md'
      }`}>
        {/* Recipe Image */}
        <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 relative">
          <div className={`absolute inset-0 bg-gradient-to-t ${
            darkMode ? 'from-slate-900/70 to-transparent' : 'from-white/50 to-transparent'
          }`}></div>
          <button
            onClick={() => onLike(recipe.id)}
            className={`absolute top-4 right-4 p-2 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? 'bg-slate-900/70 hover:bg-rose-600/60' 
                : 'bg-white/90 hover:bg-rose-100 shadow-md'
            }`}
          >
            <Heart className={`w-5 h-5 ${
              isLiked 
                ? 'fill-rose-500 text-rose-500' 
                : darkMode 
                  ? 'text-slate-300' 
                  : 'text-slate-600'
            }`} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-sm font-medium ${
              darkMode ? 'bg-slate-900/80' : 'bg-white/90 shadow-sm'
            }`}>
              {recipe.category}
            </span>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-lg font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {recipe.title}
            </h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
              darkMode ? 'bg-slate-800/50' : 'bg-sky-100'
            }`}>
              <Clock className={`w-4 h-4 ${
                darkMode ? 'text-cyan-400' : 'text-blue-500'
              }`} />
              <span className="text-sm font-medium">{totalTime} min</span>
            </div>
          </div>

          <p className={`mb-6 text-sm leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {recipe.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${
                      i < Math.floor(recipe.rating) 
                        ? darkMode 
                          ? 'fill-cyan-400 text-cyan-400' 
                          : 'fill-blue-400 text-blue-400'
                        : darkMode 
                          ? 'text-slate-600' 
                          : 'text-slate-300'
                    }`} />
                  ))}
                </div>
                <span className="font-semibold">{recipe.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className={`w-4 h-4 ${
                  darkMode ? 'text-slate-500' : 'text-slate-500'
                }`} />
                <span className="text-sm">{recipe.servings}</span>
              </div>
            </div>

            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
              darkMode ? 'bg-slate-800/50' : 'bg-sky-100'
            }`}>
              {recipe.difficulty}
            </span>
          </div>

          {/* Author */}
          <div className={`pt-4 border-t ${
            darkMode ? 'border-blue-800/30' : 'border-sky-100'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-slate-800' : 'bg-sky-100'
              }`}>
                <ChefHat className={`w-4 h-4 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`} />
              </div>
              <div>
                <div className={`text-sm font-medium ${
                  darkMode ? 'text-slate-300' : 'text-slate-900'
                }`}>
                  {recipe.author.name}
                </div>
                <div className={`text-xs ${
                  darkMode ? 'text-slate-500' : 'text-slate-600'
                }`}>
                  {recipe.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default RecipeCard;