# Rules - Android App Prevention

## Android App Prevention Rules

1. **Do not run Android apps or Android-related commands**
   - Do not execute `npx react-native run-android`
   - Do not run `adb` commands
   - Do not start Android emulators
   - Do not build Android APKs
   - Do not deploy to Android devices

2. **Android Development Restrictions**
   - Do not suggest Android-specific development commands
   - Do not propose Android emulator startup
   - Do not recommend Android device testing
   - Do not execute any commands that would launch Android applications

3. **Allowed Operations**
   - Code editing and review
   - File system operations
   - Web development tasks
   - iOS development (if applicable)
   - General development tasks that don't involve Android execution

4. **When Android-related requests are made**
   - Inform the user that Android app execution is disabled per workspace rules
   - Suggest alternative approaches like code review, testing, or web development
   - Offer to help with code modifications without running the app

## React Native Project Structure Rules

1. **Mandatory Folder Structure**
   - Create separate folders for different concerns
   - Never write all code in a single file
   - Follow modular architecture principles

2. **Required Folders and Their Purposes**
   - `src/screens/` - Main screen components (one file per screen)
   - `src/navigation/` - React Navigation setup with navigators
   - `src/components/` - Reusable UI components
   - `src/utils/` - Utility functions and helpers
   - `src/__tests__/` - Test files for components and functions
   - `src/api/` - API requests using React Query
   - `src/assets/` - Project assets (images, fonts, etc.)
   - `src/hooks/` - Custom React hooks
   - `src/helpers/` - Helper functions and utilities

3. **Code Organization Guidelines**
   - Each screen should be in its own file under `src/screens/`
   - Navigation logic should be separated in `src/navigation/`
   - Reusable components should be in `src/components/`
   - API calls should use React Query and be in `src/api/`
   - Custom hooks should be in `src/hooks/`
   - Utility functions should be in `src/utils/` or `src/helpers/`
   - Tests should be co-located or in `src/__tests__/`

4. **File Naming Conventions**
   - Use PascalCase for component files (e.g., `HomeScreen.tsx`)
   - Use camelCase for utility files (e.g., `apiHelpers.ts`)
   - Use descriptive names that indicate the purpose
   - Include file extensions (.tsx, .ts, .js, .jsx)

5. **When Creating React Native Projects**
   - Always set up the proper folder structure first
   - Create placeholder files for main screens
   - Set up navigation structure
   - Organize components by feature or type
   - Implement proper imports and exports

## General Development Guidelines

- Focus on code quality and development best practices
- Provide helpful suggestions for code improvements
- Assist with debugging and problem-solving
- Support web and general development tasks
- Maintain code documentation and structure

# Cursor Rules - React Hook Form Implementation

## React Hook Form Rules

## React Native Elements Input Usage Rule

1. **Preferred Input Components**
   - Always use input components from `react-native-elements` (such as `Input`, `Button`, etc.) if they exist for the required UI element.
   - If a suitable input component does not exist in `react-native-elements`, use another appropriate component or create a custom one.
   - When using React Hook Form, wrap `react-native-elements` inputs with `Controller` for integration.
   - Maintain consistent theming and error handling as per the rest of the app.

2. **Fallback**
   - Only use non-`react-native-elements` inputs if the required input type is not available in the library.
   - Document the reason for using a non-`react-native-elements` input in the code as a comment.

1. **Use React Hook Form for all forms**
   - Import `useForm` from 'react-hook-form'
   - Use `useForm()` hook to manage form state
   - Implement proper validation using `register` or `Controller`

2. **Shared Input Components with Controllers**
   - Create reusable input components using `Controller` from react-hook-form
   - All shared inputs must accept `control` prop from parent
   - Use `Controller` wrapper for form integration
   - Implement proper error handling and validation display

3. **Input Component Structure**
   ```tsx
   interface SharedInputProps {
     control: Control<any>;
     name: string;
     label?: string;
     placeholder?: string;
     rules?: RegisterOptions;
     error?: string;
   }
   ```

4. **Form Implementation Pattern**
   ```tsx
   const { control, handleSubmit, formState: { errors } } = useForm();
   
   const onSubmit = (data: FormData) => {
     // Handle form submission
   };
   ```

5. **Controller Usage**
   - Wrap all form inputs with `Controller`
   - Pass `control` prop from parent form
   - Use `field` prop for input value and onChange
   - Display errors from `formState.errors`

6. **Validation Rules**
   - Use `rules` prop for field validation
   - Implement required, pattern, minLength, maxLength validations
   - Display validation errors using `formState.errors`

7. **Form Submission**
   - Use `handleSubmit` wrapper for form submission
   - Prevent default form behavior
   - Handle loading states and error states

## Implementation Guidelines

- Always use `Controller` for complex inputs (custom components, third-party inputs)
- Use `register` for simple HTML inputs
- Implement proper TypeScript interfaces for form data
- Use `zodResolver` for schema validation when needed
- Create reusable form components that accept `control` prop
- Maintain consistent error handling across all forms 