import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header - Appears on all pages */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <span className="text-white text-xl">🍳</span>
                  </div>
                  <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    RecipeShare
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Recipes</a>
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Categories</a>
                <a href="/add-recipe" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Create</a>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area - Routes switch here */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/add-recipe" element={<AddRecipeForm />} />
          </Routes>
        </main>

        {/* Footer - Appears on all pages */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                    <span className="text-white text-xl">🍳</span>
                  </div>
                  <h2 className="text-2xl font-bold">RecipeShare</h2>
                </div>
                <p className="text-gray-400">
                  A community-driven platform for food enthusiasts to share, discover, and celebrate amazing recipes from around the world.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {['Browse Recipes', 'Submit Recipe', 'Popular Categories', 'Cooking Tips', 'Community Forum'].map((link) => (
                    <li key={link}>
                      <a href="/" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-6">Contact</h3>
                <p className="text-gray-400 mb-4">
                  Have questions or suggestions? We'd love to hear from you!
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
              <p>© 2024 RecipeShare. All rights reserved. Made with ❤️ for food lovers everywhere.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;