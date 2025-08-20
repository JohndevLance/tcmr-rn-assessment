
import { Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';
import { SharedInputProps } from '../types/formTypes';

export function SharedInput({ control, name, label, placeholder, rules, error }: SharedInputProps) {
  // Uses Input from react-native-elements as per project rules
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error}
          autoCapitalize="none"
        />
      )}
    />
  );
}
