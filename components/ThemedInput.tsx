import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { Control, useController } from 'react-hook-form';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'number' | 'currency';
  control: Control<any>;
  name: string;
  rules?: object;
  error?: string;
};

export const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
  (
    {
      style,
      lightColor,
      darkColor,
      control,
      name,
      rules,
      type = 'default',
      error,
      ...rest
    },
    ref,
  ) => {
    const color = useThemeColor({ dark: darkColor }, 'text');
    const {
      field: { value, onChange },
    } = useController({
      name,
      control,
      rules,
    });

    return (
      <ThemedView>
        <TextInput
          ref={ref}
          id={name}
          style={[
            { color },
            type === 'default' ? styles.default : undefined,
            style,
          ]}
          value={value}
          onChangeText={onChange}
          selectionColor={Colors.dark.tint}
          cursorColor={Colors.dark.tint}
          {...rest}
        />
        {error && <ThemedText type="error">{error}</ThemedText>}
      </ThemedView>
    );
  },
);

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    padding: 10,
    fontFamily: 'BarlowCondensed',
    borderBottomWidth: 1,
    borderRadius: 8,
    borderColor: Colors.dark.tint,
  },
});
