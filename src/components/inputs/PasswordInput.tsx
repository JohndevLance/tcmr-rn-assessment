import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Input } from 'react-native-elements';

interface PasswordInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export default function PasswordInput({
  control,
  name,
  label = "Password",
  placeholder = "Enter your password",
  rules
}: PasswordInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error?.message}
          secureTextEntry
          leftIcon={{ type: 'material', name: 'lock' }}
        />
      )}
    />
  );
}
