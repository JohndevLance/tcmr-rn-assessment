import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { Input } from 'react-native-elements';

interface EmailInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export default function EmailInput({
  control,
  name,
  label = "Email",
  placeholder = "Enter your email",
  rules
}: EmailInputProps) {
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
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={{ type: 'material', name: 'email' }}
        />
      )}
    />
  );
}
