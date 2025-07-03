import { useRef } from 'react';
import { Image, ScrollView, StyleSheet, TextInput } from 'react-native';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/constants/Colors';

const schema = yup.object({
  email: yup.string().required('Inform seu e-mail').email('E-mail inválido!'),
  password: yup.string().required('Informe sua senha'),
});

export default function LoginScreen() {
  const { onAuth, authError, loading } = useAuth();
  const { t } = useTranslation();
  const inputPasswordRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <ThemedView style={styles.titleContainer}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{ alignSelf: 'center', width: 40, height: 40 }}
      />
      <ThemedText type='title' lightColor={Colors.dark.text}>
        LOGIN
      </ThemedText>
      <ThemedView>
        <ThemedText lightColor={Colors.dark.text}>e-mail</ThemedText>
        <ThemedInput
          name='email'
          inputMode='email'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          autoComplete='off'
          control={control}
          error={errors.email?.message}
          returnKeyType='next'
          onSubmitEditing={() => inputPasswordRef.current?.focus()}
          lightColor={Colors.dark.text}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText lightColor={Colors.dark.text}>senha</ThemedText>
        <ThemedInput
          ref={inputPasswordRef}
          name='password'
          control={control}
          secureTextEntry
          textContentType='password'
          error={errors.password?.message}
          returnKeyType='done'
          onSubmitEditing={handleSubmit(onAuth)}
          lightColor={Colors.dark.text}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    width: '50%',
    alignSelf: 'center',
    paddingHorizontal: 60,
    padding: 20,
    gap: 10,
  },
});
