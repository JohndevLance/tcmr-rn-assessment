import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://app.ticketmaster.com/discovery/v2',
  timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add API key to all requests
    config.params = {
      ...config.params,
      apikey: process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY || 'YOUR_API_KEY',
    };
    console.log(config, '<API Request Config>');
    // Log request for debugging
    if (process.env.EXPO_PUBLIC_ENABLE_API_LOGGING === 'true') {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    if (process.env.EXPO_PUBLIC_ENABLE_API_LOGGING === 'true') {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Handle common errors
    console.error('API Error:', error.response?.status, error.response?.data, error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access - check API key');
    } else if (error.response?.status === 429) {
      // Handle rate limiting
      console.error('Rate limit exceeded');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
