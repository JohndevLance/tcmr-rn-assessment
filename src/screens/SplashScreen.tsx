import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    // Navigate to Home after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#007AFF' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>
        City Pulse
      </Text>
      <Text style={{ fontSize: 16, color: 'white', marginBottom: 30 }}>
        Local Events Explorer
      </Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
