import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, AlertCircle, CheckCircle, ChefHat, Clock, Users } from 'lucide-react';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    ingredients: [''],
    instructions: [''],
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy'
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle array field changes (ingredients, instructions)
  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  // Add new ingredient or instruction field
  const addArrayField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  // Remove ingredient or instruction field
  const removeArrayField = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({
        ...formData,
        [field]: newArray
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Recipe summary is required';
    if (!formData.prepTime) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime) newErrors.cookTime = 'Cook time is required';
    if (!formData.servings) newErrors.servings = 'Number of servings is required';

    // Validate ingredients
    const validIngredients = formData.ingredients.filter(ing => ing.trim() !== '');
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    }

    // Validate instructions
    const validInstructions = formData.instructions.filter(inst => inst.trim() !== '');
    if (validInstructions.length === 0) {
      newErrors.instructions = 'At least one instruction step is required';
    }

    // Numeric validations
    if (formData.prepTime && (formData.prepTime < 1 || formData.prepTime > 999)) {
      newErrors.prepTime = 'Prep time must be between 1 and 999 minutes';
    }
    if (formData.cookTime && (formData.cookTime < 1 || formData.cookTime > 999)) {
      newErrors.cookTime = 'Cook time must be between 1 and 999 minutes';
    }
    if (formData.servings && (formData.servings < 1 || formData.servings > 99)) {
      newErrors.servings = 'Servings must be between 1 and 99';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send this data to an API
      console.log('Form submitted:', formData);
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      summary: '',
      ingredients: [''],
      instructions: [''],
      prepTime: '',
      cookTime: '',
      servings: '',
      difficulty: 'Easy'
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-1">Recipe Submitted Successfully!</h3>
              <p className="text-green-700">Your recipe has been added. Redirecting to home page...</p>
            </div>
          </div>
        )}

        {/* Form Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Share Your Recipe</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in the details below to share your delicious recipe with our community
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Basic Information */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Basic Information
              </h2>
              
              <div className="space-y-6">
                {/* Recipe Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="e.g., Grandma's Chocolate Chip Cookies"
                  />
                  {errors.title && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.title}</span>
                    </div>
                  )}
                </div>

                {/* Recipe Summary */}
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.summary ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="Briefly describe your recipe..."
                  />
                  {errors.summary && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.summary}</span>
                    </div>
                  )}
                </div>

                {/* Cooking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prep Time */}
                  <div>
                    <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-1 text-blue-600" />
                      Prep Time (minutes) *
                    </label>
                    <input
                      type="number"
                      id="prepTime"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      min="1"
                      max="999"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.prepTime ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="15"
                    />
                    {errors.prepTime && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.prepTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Cook Time */}
                  <div>
                    <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-1 text-green-600" />
                      Cook Time (minutes) *
                    </label>
                    <input
                      type="number"
                      id="cookTime"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleInputChange}
                      min="1"
                      max="999"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.cookTime ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="30"
                    />
                    {errors.cookTime && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.cookTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Servings */}
                  <div>
                    <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline w-4 h-4 mr-1 text-purple-600" />
                      Servings *
                    </label>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      min="1"
                      max="99"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.servings ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="4"
                    />
                    {errors.servings && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.servings}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Easy', 'Intermediate', 'Advanced'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, difficulty: level })}
                        className={`py-3 px-4 rounded-lg border transition-colors ${
                          formData.difficulty === level
                            ? level === 'Easy'
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : level === 'Intermediate'
                              ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                              : 'bg-red-100 border-red-500 text-red-800'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Ingredients *</h2>
                <button
                  type="button"
                  onClick={() => addArrayField('ingredients')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Ingredient
                </button>
              </div>

              {errors.ingredients && (
                <div className="flex items-center gap-1 mb-4 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errors.ingredients}</span>
                </div>
              )}

              <div className="space-y-4">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                      />
                    </div>
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('ingredients', index)}
                        className="p-3 text-gray-400 hover:text-red-600 transition-colors group-hover:opacity-100 opacity-0"
                        aria-label="Remove ingredient"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Instructions *</h2>
                <button
                  type="button"
                  onClick={() => addArrayField('instructions')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Step
                </button>
              </div>

              {errors.instructions && (
                <div className="flex items-center gap-1 mb-4 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errors.instructions}</span>
                </div>
              )}

              <div className="space-y-4">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={instruction}
                        onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder={`Step ${index + 1}...`}
                      />
                    </div>
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('instructions', index)}
                        className="p-3 text-gray-400 hover:text-red-600 transition-colors group-hover:opacity-100 opacity-0"
                        aria-label="Remove step"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Submit Recipe
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Required fields note */}
            <div className="mt-6 text-sm text-gray-500 text-center">
              <p>Fields marked with * are required</p>
            </div>
          </form>
        </div>

        {/* Form Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">📝 Tips for a Great Recipe Submission</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Be specific with measurements (cups, tablespoons, grams)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>List ingredients in the order they're used</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Write clear, step-by-step instructions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Include preparation and cooking times for better planning</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;