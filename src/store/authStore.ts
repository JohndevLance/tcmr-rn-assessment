import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricEnabled: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithBiometric: () => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  enableBiometric: () => Promise<boolean>;
  disableBiometric: () => Promise<void>;
  checkBiometricAvailability: () => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
}

// Mock user data
const MOCK_USERS = [
  { id: '1', email: 'user@example.com', password: 'password123', name: 'John Doe' },
  { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  biometricEnabled: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const user = { id: mockUser.id, email: mockUser.email, name: mockUser.name };
      
      // Store user data securely
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      await SecureStore.setItemAsync('userCredentials', JSON.stringify({ email, password }));
      
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } else {
      set({ isLoading: false });
      return false;
    }
  },

  loginWithBiometric: async () => {
    const biometricEnabled = get().biometricEnabled;
    if (!biometricEnabled) return false;

    set({ isLoading: true });

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access City Pulse',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use Password',
      });

      if (result.success) {
        // Get stored credentials
        const credentialsStr = await SecureStore.getItemAsync('userCredentials');
        if (credentialsStr) {
          const credentials = JSON.parse(credentialsStr);
          return await get().login(credentials.email, credentials.password);
        }
      }
      
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      set({ isLoading: false });
      return false;
    }
  },

  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      set({ isLoading: false });
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    
    // In a real app, you'd send this to your backend
    MOCK_USERS.push({ ...newUser, password });
    
    // Store user data securely
    await SecureStore.setItemAsync('user', JSON.stringify(newUser));
    await SecureStore.setItemAsync('userCredentials', JSON.stringify({ email, password }));
    
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    return true;
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('user');
    await SecureStore.deleteItemAsync('userCredentials');
    set({ user: null, isAuthenticated: false, biometricEnabled: false });
  },

  enableBiometric: async () => {
    const isAvailable = await get().checkBiometricAvailability();
    if (!isAvailable) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Enable biometric authentication',
      cancelLabel: 'Cancel',
    });

    if (result.success) {
      await SecureStore.setItemAsync('biometricEnabled', 'true');
      set({ biometricEnabled: true });
      return true;
    }
    
    return false;
  },

  disableBiometric: async () => {
    await SecureStore.deleteItemAsync('biometricEnabled');
    set({ biometricEnabled: false });
  },

  checkBiometricAvailability: async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const userStr = await SecureStore.getItemAsync('user');
      const biometricEnabledStr = await SecureStore.getItemAsync('biometricEnabled');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        const biometricEnabled = biometricEnabledStr === 'true';
        set({ 
          user, 
          isAuthenticated: true, 
          biometricEnabled,
          isLoading: false 
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false, 
          biometricEnabled: false,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        biometricEnabled: false,
        isLoading: false 
      });
    }
  },
}));
