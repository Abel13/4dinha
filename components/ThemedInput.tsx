import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { Control, useController } from 'react-hook-form';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    padding: 10,
    fontFamily: 'BarlowCondensed',
    borderWidth: 0.5,

    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderColor: Colors.dark.tint,
  },
});

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
      darkColor,
      control,
      name,
      rules,
      type = 'default',
      error,
      lightColor,
      ...rest
    },
    ref,
  ) => {
    const color = useThemeColor({ dark: darkColor, light: lightColor }, 'text');
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
        {error && <ThemedText type='error'>{error}</ThemedText>}
      </ThemedView>
    );
  },
);

ThemedInput.displayName = 'ThemedInput';
