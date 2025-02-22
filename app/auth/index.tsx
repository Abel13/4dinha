import { Image, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/ThemedButton';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from '@/hooks/useTranslation';

const schema = yup.object({
  email: yup.string().required('Inform seu e-mail').email('E-mail inválido!'),
  password: yup.string().required('Informe sua senha'),
});

export default function LoginScreen() {
  const { onAuth, authError, loading } = useAuth();
  const { t } = useTranslation();
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
        style={{ alignSelf: 'center', width: 200, height: 200 }}
      />
      <ThemedText type='title'>LOGIN</ThemedText>
      <ThemedView>
        <ThemedText>e-mail</ThemedText>
        <ThemedInput
          name='email'
          inputMode='email'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          autoComplete='off'
          control={control}
          error={errors['email']?.message}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText>senha</ThemedText>
        <ThemedInput
          name={'password'}
          control={control}
          secureTextEntry
          textContentType='password'
          error={errors['password']?.message}
        />
      </ThemedView>
      <ThemedText type='error'>{t(authError as any)}</ThemedText>
      <ThemedButton
        title='ENTRAR'
        onPress={handleSubmit(onAuth)}
        loading={loading}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 100,
    padding: 20,
    gap: 10,
  },
});
