import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
  },
];

export class AuthService {
  private static readonly STORAGE_KEYS = {
    USER: '@user',
    TOKEN: '@token',
    BIOMETRIC_ENABLED: '@biometric_enabled',
  };

  // Mock login
  static async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user || password !== 'password123') {
      throw new Error('Invalid email or password');
    }

    const token = `mock_token_${Date.now()}`;
    const authResponse = { user, token };

    // Store in async storage
    await AsyncStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
    await AsyncStorage.setItem(this.STORAGE_KEYS.TOKEN, token);

    return authResponse;
  }

  // Mock signup
  static async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email,
      name,
      avatar: 'https://via.placeholder.com/150',
    };

    // Add to mock users
    MOCK_USERS.push(newUser);

    const token = `mock_token_${Date.now()}`;
    const authResponse = { user: newUser, token };

    // Store in async storage
    await AsyncStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(newUser));
    await AsyncStorage.setItem(this.STORAGE_KEYS.TOKEN, token);

    return authResponse;
  }

  // Logout
  static async logout(): Promise<void> {
    await AsyncStorage.multiRemove([
      this.STORAGE_KEYS.USER,
      this.STORAGE_KEYS.TOKEN,
    ]);
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(this.STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  // Check if authenticated
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(this.STORAGE_KEYS.TOKEN);
      return !!token;
    } catch {
      return false;
    }
  }

  // Biometric authentication
  static async isBiometricSupported(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  }

  static async enableBiometric(): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEYS.BIOMETRIC_ENABLED, 'true');
  }

  static async disableBiometric(): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEYS.BIOMETRIC_ENABLED, 'false');
  }

  static async isBiometricEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem(this.STORAGE_KEYS.BIOMETRIC_ENABLED);
      return enabled === 'true';
    } catch {
      return false;
    }
  }

  static async authenticateWithBiometric(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
        fallbackLabel: 'Use password instead',
      });
      return result.success;
    } catch {
      return false;
    }
  }
}
