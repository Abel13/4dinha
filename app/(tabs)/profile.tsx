import { Pressable, StyleSheet, useColorScheme } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { Colors } from '@/constants/Colors';
import { CustomImage } from '@/components/Image';
import { useEffect } from 'react';
import { SvgImage } from '@/components/SvgImage';
import { SoundButton } from '@/components/SoundButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 60,
    marginTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: 100,
    bottom: 10,
    left: 10,
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  profilePicture: {
    height: 100,
    width: 100,
  },
  border: {
    margin: 2,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  profileCard: {
    flexDirection: 'row',
  },
  editContainer: {
    position: 'absolute',
    backgroundColor: Colors.dark.background,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 16,
    bottom: 0,
    right: 0,
    padding: 10,
  },
});

export default function HomeScreen() {
  const { username, profilePicture, loadSession, session } =
    useUserSessionStore((state) => state);
  const router = useRouter();

  const theme = useColorScheme() || 'dark';

  const createAvatar = () => {
    router.push({
      pathname: '/avatarCreator',
      params: {
        username,
        imageSvg: profilePicture,
      },
    });
  };

  useEffect(() => {
    loadSession();
  }, [session]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <SoundButton sound='menu' onPress={router.back}>
          <Feather name='chevron-left' color={Colors[theme].icon} size={28} />
        </SoundButton>
        <ThemedText type='title'>{`Olá, ${username}!`}</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.profileCard}>
          <ThemedView>
            {/* <CustomImage
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            /> */}

            <ThemedView style={styles.border}>
              <SvgImage
                xml={profilePicture as string}
                style={styles.profilePicture}
              />
            </ThemedView>
            <Pressable style={styles.editContainer} onPress={createAvatar}>
              <Feather name='edit-2' size={18} color={Colors[theme].tint} />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
