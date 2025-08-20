import React from 'react';
import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { TextInput } from '../components/inputs';
import { useExampleForm } from '../hooks/useExampleForm';

export default function ExampleScreen() {
  const { control, handleSubmit, formState: { isSubmitting } } = useExampleForm();

  const onSubmit = (data: any) => {
    Toast.show({
      type: 'success',
      text1: 'Form Submitted',
      text2: `Hello, ${data.name}`,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        control={control}
        name="name"
        label="Name"
        placeholder="Enter your name"
        rules={{ required: 'Name is required' }}
        leftIcon={{ type: 'material', name: 'person' }}
      />
      <Button title={isSubmitting ? 'Submitting...' : 'Submit'} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
      <Toast />
    </View>
  );
}
