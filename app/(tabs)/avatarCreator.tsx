import DiceBearAvatarBuilder from '@/components/DiceBearAvatarBuilder';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/providers/supabase';
import { router, useLocalSearchParams } from 'expo-router';

export default function AvatarCreatorScreen() {
  const { imageSvg, username } = useLocalSearchParams();
  const { setSession } = useUserSessionStore();
  const { t } = useTranslation('avatarCreator');

  const handleSave = async (imageSvg: string) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        image: imageSvg,
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    router.back();
  };

  if (!imageSvg) {
    <ThemedView>
      <ThemedText>{t('noUrl')}</ThemedText>
    </ThemedView>;
  }

  return (
    <DiceBearAvatarBuilder
      initialSeed={username as string}
      initialStyle='bigEarsNeutral'
      onSave={handleSave}
    />
  );
}
