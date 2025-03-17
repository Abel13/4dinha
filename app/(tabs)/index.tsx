import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import {
  RelativePathString,
  useFocusEffect,
  usePathname,
  useRouter,
} from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMatchList } from '@/hooks/useMatchList';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { HelloWave } from '@/components/HelloWave';
import { Colors } from '@/constants/Colors';
import { MatchItem } from '@/components/MatchItem';
import { useHome } from '@/hooks/useHome';
import MenuIcon from '@/components/MenuIcon';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { SoundButton } from '@/components/SoundButton';
import { Lottie } from '@/components/Lottie';
import FailToLoadAnimation from '@/assets/lotties/nothing.json';
import { useSound } from '@/hooks/useAudioConfig';
import { useAuth } from '@/hooks/useAuth';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.dark.black },
  container: { flex: 1, justifyContent: 'space-between' },
  background: { flex: 1, alignItems: 'flex-start' },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  profile: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: Colors.dark.purpleLight,
    shadowColor: Colors.dark.purpleLight,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  profilePic: { height: 50, width: 50, borderRadius: 8, borderWidth: 3 },
  topContainer: { marginTop: 10 },
  rowContainer: { flexDirection: 'row', gap: 10 },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
    backgroundColor: Colors.dark.purpleLight,
    borderRadius: 50,
  },
  iconWrapper: {
    borderRadius: 50,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.purpleLight,
  },
  iconsMenu: { flexDirection: 'row', gap: 20, marginTop: 10 },
  center: { flex: 1, flexDirection: 'row', marginVertical: 10 },
  scrollContainer: { paddingLeft: 60 },
  menuContainer: { flexDirection: 'row', gap: 20 },
  menu: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.purpleLight,
    backgroundColor: Colors.dark.purple,
    borderRadius: 10,
    padding: 10,
  },
  matchesMenu: {
    width: 125,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: Colors.dark.purpleGray,
    borderColor: Colors.dark.purple,
    borderRadius: 10,
    padding: 10,
    height: 75,
    margin: 3,
  },
  matchesContainer: {
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.purpleLight,
    backgroundColor: Colors.dark.purple,
    borderRadius: 10,
    padding: 10,
    alignContent: 'center',
  },
  logo: { width: 100, height: 100 },
  matchContainer: {
    backgroundColor: Colors.dark.purple,
    padding: 10,
    paddingRight: 60,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 30,
    padding: 15,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: Colors.dark.purpleTransparent,
    borderColor: Colors.dark.purpleLight,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  darkBorder: {
    borderColor: Colors.dark.border,
  },
});

export default function LobbyScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useColorScheme() || 'light';
  const { playSoundAsync, stopSoundAsync } = useSound('ambient');
  const { matches, enterMatch, inProgressMatches } = useMatchList();
  const { username, profilePicture } = useUserSessionStore((state) => state);
  const { signOut } = useAuth();

  const { footerMenu, headerMenu } = useHome();

  const handleNewMatch = useCallback(() => {
    router.push({ pathname: '/lobby/new' });
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        stopSoundAsync();
      };
    }, [stopSoundAsync]),
  );

  useEffect(() => {
    if (pathname === '/')
      playSoundAsync({
        looping: true,
      });
  }, [pathname]);

  return (
    <ThemedView style={styles.screen}>
      <ImageBackground
        source={require('@/assets/images/background.jpg')}
        resizeMode='cover'
        style={styles.background}
        blurRadius={3}
      >
        <ThemedView style={styles.container} darkColor='transparent'>
          <ThemedView style={styles.header}>
            <SoundButton
              sound='menu'
              style={styles.profile}
              onPress={() => {
                router.push('/(tabs)/profile');
              }}
            >
              <Image
                source={{ uri: profilePicture }}
                style={[styles.profilePic, styles[`${theme}Border`]]}
              />
              <ThemedText type='defaultSemiBold' darkColor='#070f2b'>
                {`Olá, ${username}!`}
              </ThemedText>
              <HelloWave size={14} />
            </SoundButton>

            <ThemedView darkColor='transparent' style={styles.topContainer}>
              <ThemedView style={styles.rowContainer}>
                {[
                  { icon: 'coins', value: '0' },
                  { icon: 'sack-dollar', value: '0' },
                ].map((item) => (
                  <ThemedView key={item.icon} style={styles.coinContainer}>
                    <ThemedView style={styles.iconWrapper} darkColor='#1b1a55'>
                      <FontAwesome6
                        name={item.icon}
                        size={14}
                        color={Colors[theme].text}
                      />
                    </ThemedView>
                    <ThemedText darkColor='#070f2b' type='h4'>
                      {item.value}
                    </ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.iconsMenu}>
              {headerMenu.map((icon) => (
                <SoundButton
                  key={icon.name}
                  sound='menu'
                  onPress={() => router.push(icon.route as RelativePathString)}
                >
                  <Ionicons name={icon.icon} size={28} color='#FFF' />
                </SoundButton>
              ))}
              <TouchableOpacity onPress={signOut}>
                <Ionicons name='exit-outline' size={28} color='#FFF' />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.center}>
            <ScrollView horizontal style={styles.scrollContainer}>
              <ThemedView style={styles.menuContainer}>
                <SoundButton
                  sound='menu'
                  style={styles.menu}
                  onPress={handleNewMatch}
                >
                  <ThemedText type='subtitle' lightColor={Colors.dark.text}>
                    Criar partida
                  </ThemedText>
                  <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                  />
                </SoundButton>
                <ThemedView style={styles.matchesContainer}>
                  <ThemedText
                    lineBreakMode='tail'
                    type='subtitle'
                    numberOfLines={3}
                    lightColor={Colors.dark.text}
                    style={{
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Voltar para
                  </ThemedText>

                  <ThemedFlatList
                    data={inProgressMatches}
                    keyExtractor={(item) => item.matches.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <SoundButton
                        sound='menu'
                        style={styles.matchesMenu}
                        onPress={() => {
                          router.push({
                            pathname: '/(game)/4dinha',
                            params: {
                              gameId: item.matches.id,
                            },
                          });
                        }}
                      >
                        <ThemedText
                          style={{ fontSize: 13 }}
                          lightColor={Colors.dark.text}
                        >
                          {item.matches.name}
                        </ThemedText>
                      </SoundButton>
                    )}
                  />
                </ThemedView>
              </ThemedView>
            </ScrollView>
            <ThemedView style={styles.matchContainer}>
              <ThemedText type='subtitle' lightColor={Colors.dark.text}>
                Novas Partidas
              </ThemedText>
              <ThemedFlatList
                data={matches}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MatchItem
                    match={item}
                    enterMatch={() => {
                      enterMatch(item.id);
                    }}
                    continueMatch={() => {}}
                  />
                )}
                ListEmptyComponent={<Lottie source={FailToLoadAnimation} />}
                ItemSeparatorComponent={() => (
                  <ThemedView style={{ height: 5 }} />
                )}
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.footer}>
            {footerMenu.map((item) => (
              <MenuIcon
                key={item.name}
                icon={item.icon}
                onPress={() => {}}
                text={item.name}
              />
            ))}
          </ThemedView>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}
