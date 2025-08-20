import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { EmailInput, PasswordInput, TextInput } from '../inputs';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();

  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignupFormData) => {
    const success = await signup(data.email, data.password, data.name);
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Welcome to City Pulse!',
      });
      router.replace('/(tabs)');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Email already exists',
      });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text h3 style={{ textAlign: 'center', marginBottom: 30 }}>
        Create Account
      </Text>

      <TextInput
        control={control}
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={{ type: 'material', name: 'person' }}
        rules={{ required: 'Name is required' }}
      />

      <EmailInput
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
      />

      <PasswordInput
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
      />

      <PasswordInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        rules={{ required: 'Please confirm your password' }}
      />

      <Button
        title={isLoading ? 'Creating Account...' : 'Sign Up'}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        containerStyle={{ marginVertical: 10 }}
      />

      <Button
        title="Already have an account? Login"
        onPress={onSwitchToLogin}
        type="clear"
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}
