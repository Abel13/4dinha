import { CustomImage } from '@/components/Image';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useRegister } from '@/hooks/useRegister';
import { useTranslation } from '@/hooks/useTranslation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 60,
    paddingVertical: 20,
    gap: 10,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    margin: 50,
  },
  title: {
    fontSize: 64,
    textAlign: 'center',
    fontFamily: 'BarlowCondensed-SemiBold',
    shadowColor: Colors.dark.shadowText,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  rightText: {
    textAlign: 'right',
  },
});

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .max(20, 'O nome de usuário deve ter no máximo 20 caracteres')
    .required('O nome de usuário é obrigatório'),

  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),

  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(32, 'A senha deve ter no máximo 32 caracteres')
    .required('A senha é obrigatória'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('A confirmação de senha é obrigatória'),
});

export default function Register() {
  const { register, loading, registerError, loadImage } = useRegister();
  const { t } = useTranslation('register');

  const router = useRouter();

  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const seed = watch('username');

  useEffect(() => {
    if (seed)
      loadImage({
        style: 'bigEarsNeutral',
        seed,
        backgroundColor: 'FFFFFF',
      });
  }, [seed]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>
          4dinha
          <ThemedText type='h4' style={styles.rightText}>
            BETA
          </ThemedText>
        </ThemedText>
        <CustomImage
          source={require('@/assets/images/logo.png')}
          style={{
            flex: 1,
          }}
        />
      </ThemedView>

      <ScrollView style={{ flex: 1, width: '100%' }}>
        <ThemedView style={styles.content}>
          <ThemedView>
            <ThemedText lightColor={Colors.dark.text}>
              {t('username')}
            </ThemedText>
            <ThemedInput
              name='username'
              maxLength={15}
              autoCapitalize='none'
              autoCorrect={false}
              autoComplete='off'
              control={control}
              error={errors.username?.message}
              returnKeyType='next'
              onSubmitEditing={() => inputEmailRef.current?.focus()}
            />
          </ThemedView>
          <ThemedView>
            <ThemedText lightColor={Colors.dark.text}>{t('email')}</ThemedText>
            <ThemedInput
              ref={inputEmailRef}
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
            />
          </ThemedView>
          <ThemedView>
            <ThemedText lightColor={Colors.dark.text}>
              {t('password')}
            </ThemedText>
            <ThemedInput
              ref={inputPasswordRef}
              name='password'
              control={control}
              secureTextEntry
              textContentType='password'
              error={errors.password?.message}
              returnKeyType='next'
              onSubmitEditing={() => inputConfirmPasswordRef.current?.focus()}
            />
          </ThemedView>
          <ThemedView>
            <ThemedText lightColor={Colors.dark.text}>
              {t('password')}
            </ThemedText>
            <ThemedInput
              ref={inputPasswordRef}
              name='confirmPassword'
              control={control}
              secureTextEntry
              textContentType='password'
              error={errors.confirmPassword?.message}
              returnKeyType='done'
              onSubmitEditing={handleSubmit(register)}
            />
            {registerError && (
              <ThemedText type='error'>
                {t(`errors.${registerError}`)}
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView />
          <ThemedButton
            type='outlined'
            title={t('save')}
            onPress={handleSubmit(register)}
            disabled={loading}
          />

          <ThemedButton
            type='link'
            title={t('cancel')}
            onPress={router.back}
            disabled={loading}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
