import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const router = useRouter();
  const { login, loginWithBiometric, isLoading, biometricEnabled, checkBiometricAvailability } = useAuthStore();
  const [showBiometric, setShowBiometric] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  React.useEffect(() => {
    checkBiometricAvailability().then(available => {
      setShowBiometric(available && biometricEnabled);
    });
  }, [biometricEnabled, checkBiometricAvailability]);

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
      router.replace('/(tabs)');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid email or password',
      });
    }
  };

  const handleBiometricLogin = async () => {
    const success = await loginWithBiometric();
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
      router.replace('/(tabs)');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Biometric Login Failed',
        text2: 'Please try again',
      });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text h3 style={{ textAlign: 'center', marginBottom: 30 }}>
        Login to City Pulse
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={{ type: 'material', name: 'email' }}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.password?.message}
            secureTextEntry
            leftIcon={{ type: 'material', name: 'lock' }}
          />
        )}
      />

      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        containerStyle={{ marginVertical: 10 }}
      />

      {showBiometric && (
        <Button
          title="Login with Biometric"
          onPress={handleBiometricLogin}
          type="outline"
          icon={{ type: 'material', name: 'fingerprint' }}
          containerStyle={{ marginVertical: 10 }}
        />
      )}

      <Button
        title="Don't have an account? Sign Up"
        onPress={onSwitchToSignup}
        type="clear"
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}
