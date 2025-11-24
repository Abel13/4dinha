import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useTranslation } from '@/hooks/useTranslation';
import { Loading } from '@/components/Loading';
import { BlurView } from 'expo-blur';
import { CustomImage } from '@/components/Image';
import { LanguageFlagPicker } from '@/components/LanguagePicker';
import { Auth } from '@/components/Auth';
import { ThemedButton } from '@/components/ThemedButton';

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
  button: {
    width: '100%',
    height: 44,
  },
  title: {
    fontSize: 64,
    textAlign: 'center',
    fontFamily: 'BarlowCondensedSemiBold',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  rightText: {
    textAlign: 'right',
  },
});

export default function LoginScreen() {
  const { handleRegister, loading, authError, onAppleAuth } = useAuth();

  const { t, locales, changeLanguage, customLanguage } =
    useTranslation('login');

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
        <ThemedView style={{ alignItems: 'center' }}>
          <Auth mode='signIn' handleCredential={onAppleAuth} />
        </ThemedView>

        {authError && (
          <ThemedText type='error'>{t(`errors.${authError}`)}</ThemedText>
        )}
        <ThemedView />
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
