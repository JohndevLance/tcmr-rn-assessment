import React from 'react';
import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { SharedInput } from '../components/SharedInput';
import { useExampleForm } from '../hooks/useExampleForm';

export default function ExampleScreen() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useExampleForm();

  const onSubmit = (data: any) => {
    Toast.show({
      type: 'success',
      text1: 'Form Submitted',
      text2: `Hello, ${data.name}`,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <SharedInput
        control={control}
        name="name"
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
      />
      <Button title={isSubmitting ? 'Submitting...' : 'Submit'} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
      <Toast />
    </View>
  );
}
