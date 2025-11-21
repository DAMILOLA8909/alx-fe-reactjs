import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Fetch individual user data
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};