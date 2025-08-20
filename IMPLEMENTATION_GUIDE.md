# City Pulse - Local Events Explorer Implementation Guide

## Overview
City Pulse is a React Native app that allows users to discover local events using the Ticketmaster Discovery API. The app features authentication, event search, favorites management, map integration, and multilingual support.

## Technologies Used

### Core Framework
- **React Native with Expo Router**: File-based navigation system for mobile app development
- **TypeScript**: Type-safe development with full IDE support
- **Expo SDK**: Simplified development and deployment for React Native

### State Management & Data Fetching
- **Zustand**: Lightweight state management for auth, favorites, and language preferences
- **React Query (@tanstack/react-query)**: Server state management with automatic caching, background updates, and error handling
- **Axios**: HTTP client with interceptors for API requests and response handling

### Form Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema validation for forms
- **Custom Input Components**: Reusable form inputs with Controller integration

### UI & Styling
- **React Native Elements (RNEUI)**: Themed UI component library
- **Custom Theming**: Consistent design system across the app
- **React Native Maps**: Map integration for event locations

### Authentication & Security
- **Expo Local Authentication**: Biometric authentication (fingerprint/face ID)
- **AsyncStorage**: Secure local storage for user preferences and authentication tokens

### Additional Features
- **Expo Location**: Location services for map functionality
- **React Native Toast Message**: User feedback and notifications
- **Internationalization (i18n)**: Arabic/English language support with RTL layout

## Project Structure

```
src/
├── api/                    # API layer with React Query hooks
│   ├── client.ts          # Axios instance with interceptors
│   ├── eventsApi.ts       # Events API hooks
│   └── venuesApi.ts       # Venues API hooks
├── components/            # Reusable UI components
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── inputs/            # Form input components with RHF integration
│   │   ├── EmailInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── TextInput.tsx
│   │   ├── SearchInput.tsx
│   │   └── index.ts
│   ├── maps/              # Map-related components
│   │   └── MapPreview.tsx
│   └── AuthGuard.tsx      # Route protection component
├── hooks/                 # Custom React hooks
│   ├── useToggleLanguage.ts
│   └── useExampleForm.ts
├── screens/               # Main screen components
│   ├── HomeScreen.tsx     # Event search and listing
│   ├── EventDetailScreen.tsx # Event details with map
│   ├── ProfileScreen.tsx  # User profile and settings
│   └── AuthScreen.tsx     # Authentication flow
├── services/              # Business logic and API services
│   ├── EventsService.ts   # Events business logic
│   ├── AuthService.ts     # Authentication service
│   └── VenuesService.ts   # Venues service
├── store/                 # Zustand state stores
│   ├── authStore.ts       # Authentication state
│   ├── favouritesStore.ts # Favorites management
│   └── languageStore.ts   # Language preferences
└── types/                 # TypeScript type definitions
    └── formTypes.ts
```

## Setup Guide

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Studio (for testing)

### Installation Steps

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd tctmstr
   npm install
   ```

2. **Install Additional Packages**
   ```bash
   npm install @tanstack/react-query zustand react-hook-form @hookform/resolvers zod
   npm install react-native-elements react-native-vector-icons
   npm install axios react-native-toast-message
   npm install expo-location react-native-maps expo-local-authentication
   npm install @react-native-async-storage/async-storage
   ```

3. **Environment Configuration**
   Create `.env` file with Ticketmaster API credentials:
   ```
   EXPO_PUBLIC_TICKETMASTER_API_KEY=your_api_key_here
   EXPO_PUBLIC_TICKETMASTER_BASE_URL=https://app.ticketmaster.com/discovery/v2
   ```

4. **Run the Application**
   ```bash
   npx expo start
   ```

## Key Implementation Details

### React Query Integration
- **Automatic Caching**: Events data is cached for 5 minutes to reduce API calls
- **Background Refetching**: Data automatically updates when app comes to foreground
- **Error Handling**: Centralized error handling with user-friendly messages
- **Loading States**: Built-in loading states for better UX

### React Hook Form Architecture
- **Controller Pattern**: All inputs use Controller for consistent form integration
- **Zod Validation**: Runtime validation with TypeScript integration
- **Reusable Components**: Shared input components that accept control and rules props
- **Error Display**: Automatic error message display within input components

### State Management Strategy
- **Zustand Stores**: Lightweight stores for client-side state
- **AsyncStorage Persistence**: User preferences persist across app restarts
- **Optimistic Updates**: Favorites are updated immediately with background sync

### API Layer Architecture
- **Axios Interceptors**: Request/response interceptors for authentication and error handling
- **Type Safety**: Full TypeScript coverage for API responses
- **Error Boundaries**: Graceful error handling throughout the app

## Assumptions Made

### Business Logic
1. **Authentication**: Mock authentication system (no real backend)
2. **User Accounts**: Basic user profile with email/password
3. **Event Data**: Relies on Ticketmaster API availability and rate limits
4. **Offline Support**: Limited offline capability (cached data only)

### Technical Decisions
1. **No Real Backend**: App uses local storage for user data
2. **API Rate Limits**: Assumed reasonable usage within Ticketmaster limits
3. **Platform Support**: Designed for iOS/Android with Expo compatibility
4. **Network Handling**: Basic error handling for network failures

### User Experience
1. **Language Support**: English and Arabic with RTL layout support
2. **Biometric Authentication**: Available on supported devices only
3. **Map Integration**: Requires location permissions for full functionality
4. **Search Functionality**: Basic keyword and city-based search

### Data & Privacy
1. **Local Storage**: User data stored locally on device
2. **API Keys**: Stored in environment variables (not in source code)
3. **User Consent**: Basic implementation of permission requests
4. **Data Retention**: Favorites and preferences persist until app deletion

## Performance Optimizations

### React Query Caching Strategy
- **Stale While Revalidate**: Shows cached data while fetching fresh data
- **Query Invalidation**: Smart cache invalidation on user actions
- **Background Sync**: Automatic data synchronization

### Component Optimization
- **Memoization**: Strategic use of React.memo for expensive components
- **Lazy Loading**: Dynamic imports for screens not immediately needed
- **Image Optimization**: Optimized image loading for event images

### State Management
- **Selective Subscriptions**: Components only subscribe to relevant state slices
- **Normalized Data**: Event and venue data properly normalized
- **Minimal Re-renders**: Zustand's selector pattern minimizes unnecessary renders

## Testing Strategy

### Unit Testing
- **Components**: Test individual component behavior
- **Hooks**: Test custom hooks in isolation
- **Services**: Test business logic and API services
- **Stores**: Test state management logic

### Integration Testing
- **Forms**: Test complete form submission flows
- **Navigation**: Test screen transitions and routing
- **API Integration**: Test API call patterns and error handling

### Manual Testing
- **Authentication Flow**: Complete auth journey testing
- **Event Search**: Search functionality across different scenarios
- **Biometric Features**: Test on physical devices with biometric capabilities
- **Language Toggle**: Test RTL/LTR switching and persistence

## Deployment Considerations

### Development
- **Expo Development Build**: For testing device-specific features
- **Hot Reloading**: Fast development iteration
- **Debugging**: Flipper integration for advanced debugging

### Production
- **Expo Application Services (EAS)**: For building and deployment
- **Store Deployment**: App Store and Google Play submission
- **Performance Monitoring**: Crash reporting and analytics integration

This implementation provides a solid foundation for a local events discovery app with modern React Native best practices, efficient state management, and excellent user experience.
