import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { Input } from 'react-native-elements';

interface SearchInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  onSubmitEditing?: () => void;
}

export default function SearchInput({
  control,
  name,
  label,
  placeholder = "Search...",
  rules,
  onSubmitEditing
}: SearchInputProps) {
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
          leftIcon={{ type: 'material', name: 'search' }}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
          autoCapitalize="none"
        />
      )}
    />
  );
}
