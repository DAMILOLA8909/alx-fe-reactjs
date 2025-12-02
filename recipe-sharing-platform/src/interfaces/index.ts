export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  imageUrl?: string;
  author: User;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'chef' | 'admin';
  recipes: string[];
  favorites: string[];
  joinedAt: Date;
}

export interface Review {
  id: string;
  recipeId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  recipeCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}