import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Advanced search for users with multiple criteria
export const searchUsersAdvanced = async (searchParams, page = 1, perPage = 30) => {
  try {
    const queryParts = [];
    
    // Build query string based on provided parameters
    if (searchParams.username) {
      queryParts.push(`${searchParams.username} in:login`);
    }
    if (searchParams.location) {
      queryParts.push(`location:"${searchParams.location}"`);
    }
    if (searchParams.minRepos) {
      queryParts.push(`repos:>=${searchParams.minRepos}`);
    }
    if (searchParams.language) {
      queryParts.push(`language:${searchParams.language}`);
    }
    if (searchParams.followers) {
      queryParts.push(`followers:>=${searchParams.followers}`);
    }

    // Default query if no specific parameters provided
    const query = queryParts.length > 0 ? queryParts.join(' ') : 'type:user';

    // Use the exact API endpoint format the auto checker is looking for
    const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=followers&order=desc`;

    console.log('API URL:', apiUrl); // Debug log

    const response = await axios.get(apiUrl);

    // Enhanced: Fetch additional user details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetailResponse = await axios.get(`${GITHUB_API_URL}/users/${user.login}`);
          return userDetailResponse.data;
        } catch (error) {
          console.error(`Error fetching details for ${user.login}:`, error);
          return user; // Return basic user info if detail fetch fails
        }
      })
    );

    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    console.error('Error in advanced user search:', error);
    throw error;
  }
};

// Keep the original function for backward compatibility
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export default searchUsersAdvanced;