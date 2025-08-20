import LoginForm from '@/src/components/auth/LoginForm';
import SignupForm from '@/src/components/auth/SignupForm';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingTop: 50 }}>
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </View>
    </ScrollView>
  );
}
