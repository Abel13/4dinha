import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { RelativePathString, useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMatchList } from '@/hooks/useMatchList';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { HelloWave } from '@/components/HelloWave';
import { Colors } from '@/constants/Colors';
import { useHome } from '@/hooks/useHome';
import MenuIcon from '@/components/MenuIcon';
import { ThemedFlatList } from '@/components/ThemedFlatList';
import { SoundButton } from '@/components/SoundButton';
import { useSound } from '@/hooks/useAudioConfig';
import { useAuth } from '@/hooks/useAuth';
import { ThemedButton } from '@/components/ThemedButton';
import { SvgImage } from '@/components/SvgImage';
import { MyMatch } from '@/types/MyMatch';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.dark.background },
  container: { flex: 1, justifyContent: 'space-between' },
  background: { flex: 1, alignItems: 'flex-start' },
  diagonalBorder: {
    position: 'absolute',
    borderColor: Colors.dark.shadowText,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
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
    shadowColor: Colors.dark.icon,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  profilePic: { height: 30, width: 30 },
  topContainer: { marginTop: 10 },
  rowContainer: { flexDirection: 'row', gap: 10 },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
    backgroundColor: Colors.dark.purpleLight,
    borderRadius: 8,
  },
  iconWrapper: {
    borderRadius: 8,
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
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.dark.purpleLight,
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
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  lightBorder: {
    borderColor: Colors.dark.border,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  subtitle: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },
});

export default function LobbyScreen() {
  const router = useRouter();
  const theme = useColorScheme() || 'light';
  const { playSound, stopSound } = useSound('ambient');
  const { matches, enterMatch, inProgressMatches } = useMatchList();
  const { username, profilePicture } = useUserSessionStore((state) => state);
  const { signOut } = useAuth();

  const { footerMenu, headerMenu } = useHome();

  const handleNewMatch = useCallback(() => {
    router.push({ pathname: '/lobby/new' });
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      playSound({ looping: true });

      return () => {
        stopSound();
      };
    }, [playSound, stopSound]),
  );

  return (
    <ThemedView style={styles.screen}>
      <View
        style={[
          styles.diagonalBorder,
          { width: 10, height: 10, bottom: '15%', left: '8%' },
        ]}
      />
      <View
        style={[
          styles.diagonalBorder,
          { width: 15, height: 15, top: '12%', left: '50%' },
        ]}
      />
      <View
        style={[
          styles.diagonalBorder,
          { width: 50, height: 50, top: '18%', right: '30%' },
        ]}
      />
      <ThemedView style={styles.header}>
        <SoundButton
          sound='menu'
          style={styles.profile}
          onPress={() => {
            stopSound();
            router.push('/(tabs)/profile');
          }}
        >
          {/* <CustomImage
            source={{ uri: profilePicture }}
            style={[styles.profilePic, styles[`${theme}Border`]]}
          /> */}
          <ThemedView style={styles[`${theme}Border`]}>
            <SvgImage
              xml={profilePicture as string}
              style={[styles.profilePic]}
            />
          </ThemedView>
          <ThemedText type='defaultSemiBold'>{`Olá, ${username}!`}</ThemedText>
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
                <ThemedText type='h4'>{item.value}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.iconsMenu}>
          {headerMenu.map((icon) => (
            <SoundButton
              key={icon.name}
              sound='menu'
              onPress={() => {
                stopSound();
                router.push(icon.route as RelativePathString);
              }}
            >
              <Ionicons
                name={icon.icon}
                size={28}
                color='#FFF'
                style={{
                  shadowColor: Colors.dark.shadowIcon,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              />
            </SoundButton>
          ))}
          <TouchableOpacity
            onPress={() => {
              stopSound();
              signOut();
            }}
          >
            <Ionicons
              name='exit-outline'
              size={28}
              color='#FFF'
              style={{
                shadowColor: Colors.dark.shadowIcon,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 10,
                elevation: 5,
              }}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.center}>
        <ScrollView horizontal style={styles.scrollContainer}>
          <ThemedView style={styles.menuContainer}>
            <ThemedButton
              title='CRIAR PARTIDA'
              type='outlined'
              onPress={() => {
                stopSound();
                handleNewMatch();
              }}
            />
            {inProgressMatches && inProgressMatches.length > 0 && (
              <ThemedView style={styles.matchesContainer}>
                <ThemedText
                  lineBreakMode='tail'
                  type='subtitle'
                  numberOfLines={3}
                  lightColor={Colors.dark.text}
                  style={styles.subtitle}
                >
                  Volte para a partida
                </ThemedText>

                <ThemedFlatList
                  data={inProgressMatches}
                  keyExtractor={(item) => item.matches.id.toString()}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  contentContainerStyle={{ alignItems: 'center' }}
                  renderItem={({ item }: { item: MyMatch }) => {
                    return (
                      <ThemedView style={{ width: '100%' }}>
                        <ThemedButton
                          title={item.matches.name}
                          type='outlined'
                          onPress={() => {
                            stopSound();
                            router.push({
                              pathname: '/(game)/4dinha',
                              params: {
                                gameId: item.matches.id,
                              },
                            });
                          }}
                        />
                      </ThemedView>
                    );
                  }}
                />
              </ThemedView>
            )}
          </ThemedView>
        </ScrollView>
        <ThemedView style={styles.matchContainer}>
          <ThemedText
            type='subtitle'
            lightColor={Colors.dark.text}
            style={styles.subtitle}
          >
            Salas Abertas
          </ThemedText>
          <ThemedFlatList
            data={matches}
            keyExtractor={(item) => item.id}
            emptyMessage='Nenhuma sala criada...'
            renderItem={({ item }) => (
              <ThemedView style={{ height: 50, marginBottom: 5 }}>
                <ThemedButton
                  title={item.name}
                  type='outlined'
                  onPress={() => {
                    stopSound();
                    enterMatch(item.id);
                  }}
                />
              </ThemedView>
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
  );
}
