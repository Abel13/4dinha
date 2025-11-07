import { useRef, useState } from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { ThemedButton } from '@/components/ThemedButton';
import { useTranslation } from '@/hooks/useTranslation';
import { Loading } from '@/components/Loading';
import { BlurView } from 'expo-blur';
import { CustomImage } from '@/components/Image';
import { LanguageFlagPicker } from '@/components/LanguagePicker';

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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  rightText: {
    textAlign: 'right',
  },
});

const schema = yup.object({
  email: yup.string().required('Inform seu e-mail').email('E-mail inválido!'),
  password: yup.string().required('Informe sua senha'),
});

export default function LoginScreen() {
  const theme = useColorScheme() || 'light';
  const { onAuth, handleRegister, loading, authError } = useAuth();

  const { t, locales, changeLanguage, customLanguage } =
    useTranslation('login');

  const inputPasswordRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (loading)
    return (
      <BlurView style={[styles.container]}>
        <Loading />
      </BlurView>
    );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText
          style={[
            styles.title,
            {
              shadowColor: Colors.dark.shadowText,
            },
          ]}
        >
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

      <ThemedView style={styles.content}>
        <LanguageFlagPicker
          languageCodes={locales}
          initialSelected={customLanguage}
          onSelect={(lang) => {
            changeLanguage(lang);
          }}
        />
        <ThemedView />
        <ThemedView>
          <ThemedText lightColor={Colors.dark.text}>{t('email')}</ThemedText>
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
          <ThemedText lightColor={Colors.dark.text}>{t('password')}</ThemedText>
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
        </ThemedView>

        {authError && (
          <ThemedText type='error'>{t(`errors.${authError}`)}</ThemedText>
        )}
        <ThemedView />
        <ThemedButton
          type='outlined'
          title={loading ? t('loading') : t('login')}
          onPress={handleSubmit(onAuth)}
          disabled={loading}
        />
        <ThemedButton
          type='link'
          title={loading ? t('loading') : t('register')}
          onPress={handleRegister}
          disabled={loading}
        />
      </ThemedView>
    </ThemedView>
  );
}
