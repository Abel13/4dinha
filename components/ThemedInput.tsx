import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { Control, useController, useFormContext } from 'react-hook-form';
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

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  control,
  name,
  rules,
  type = 'default',
  error,
  ...rest
}: ThemedInputProps) {
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
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    padding: 10,
    fontFamily: 'BarlowCondensed',
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
});
