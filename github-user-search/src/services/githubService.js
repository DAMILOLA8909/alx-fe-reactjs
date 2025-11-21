import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';

const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Fetch individual user data
export const fetchUserData = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Search GitHub users (multiple results)
export const searchUsers = async (query) => {
  try {
    const response = await githubAPI.get(`/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export default githubAPI;