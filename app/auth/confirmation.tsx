import { CustomImage } from '@/components/Image';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useConfirmation } from '@/hooks/useConfirmation';
import { useTranslation } from '@/hooks/useTranslation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, useColorScheme } from 'react-native';
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

interface IFormData {
  token: string;
}

const schema = yup.object().shape({
  token: yup
    .string()
    .min(6, 'errors.minimum_required')
    .required('errors.required_field'),
});

export default function Register() {
  const theme = useColorScheme() || 'light';
  const { validate, loading, confirmationError } = useConfirmation();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { t } = useTranslation('confirmation');

  const router = useRouter();

  const handleValidate = ({ token }: IFormData) => {
    validate({
      email,
      token,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<IFormData>(schema),
  });

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

      <ThemedView style={styles.content}>
        <ThemedText lightColor={Colors[theme].text}>
          {t('message', { email })}
        </ThemedText>
        <ThemedView>
          <ThemedText lightColor={Colors.dark.text}>{t('code')}</ThemedText>
          <ThemedInput
            name='token'
            maxLength={6}
            keyboardType='decimal-pad'
            control={control}
            style={{ letterSpacing: 25, textAlign: 'center' }}
            error={t(errors.token?.message as string)}
            returnKeyType='done'
            onSubmitEditing={handleSubmit(handleValidate)}
          />
        </ThemedView>

        {confirmationError && (
          <ThemedText type='error'>
            {t(`errors.${confirmationError}`)}
          </ThemedText>
        )}

        <ThemedView />
        <ThemedButton
          type='outlined'
          title={t('validate')}
          onPress={handleSubmit(handleValidate)}
          disabled={loading}
        />

        <ThemedButton
          type='link'
          title={t('cancel')}
          onPress={router.back}
          disabled={loading}
        />
      </ThemedView>
    </ThemedView>
  );
}
