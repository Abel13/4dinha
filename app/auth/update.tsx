import { CustomImage } from '@/components/Image';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useRegister } from '@/hooks/useRegister';
import { useTranslation } from '@/hooks/useTranslation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
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
    fontFamily: 'BarlowCondensedSemiBold',
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

export default function Register() {
  const { loading, loadImage, updateUser } = useRegister();
  const { t } = useTranslation('register');

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('validation.username_min'))
      .max(20, t('validation.username_max'))
      .required(t('validation.username_required')),
  });

  const {
    control,
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
        backgroundColor: 'a1a1a1',
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
          <ThemedView />
          <ThemedView>
            <ThemedText lightColor={Colors.dark.text}>
              {t('username')}
            </ThemedText>
            <ThemedInput
              name='username'
              maxLength={16}
              autoCapitalize='none'
              autoCorrect={false}
              autoComplete='off'
              control={control}
              error={errors.username?.message}
              returnKeyType='done'
            />
          </ThemedView>

          <ThemedButton
            type='link'
            title={t('save')}
            onPress={() => updateUser(watch('username'))}
            disabled={loading}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
