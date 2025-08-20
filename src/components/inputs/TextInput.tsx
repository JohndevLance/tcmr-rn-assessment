import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { Input } from 'react-native-elements';

interface TextInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  leftIcon?: { type: string; name: string };
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
}

export default function TextInput({
  control,
  name,
  label,
  placeholder,
  rules,
  leftIcon,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines
}: TextInputProps) {
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
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          leftIcon={leftIcon}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      )}
    />
  );
}
