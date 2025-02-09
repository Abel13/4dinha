import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useCallback } from 'react';
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

export default function LobbyScreen() {
  const router = useRouter();
  const theme = useColorScheme() || 'light';
  const { matches, enterMatch, inProgressMatches } = useMatchList();
  const { username, profilePicture } = useUserSessionStore((state) => state);

  const { footerMenu, headerMenu } = useHome();

  const handleNewMatch = useCallback(() => {
    router.push({ pathname: '/lobby/new' });
  }, []);

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
            <TouchableOpacity
              style={styles.profile}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Image
                source={{ uri: profilePicture }}
                style={[styles.profile_pic, styles[`${theme}_border`]]}
              />
              <ThemedText type='defaultSemiBold' darkColor='#070f2b'>
                {`Olá, ${username}!`}
              </ThemedText>
              <HelloWave size={14} />
            </TouchableOpacity>

            <ThemedView darkColor='transparent' style={styles.topContainer}>
              <ThemedView style={styles.rowContainer}>
                {[
                  { icon: 'coins', value: '1.520' },
                  { icon: 'sack-dollar', value: '0' },
                ].map((item, index) => (
                  <ThemedView key={index} style={styles.coinContainer}>
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
              {headerMenu.map((icon, index) => (
                <Ionicons
                  key={index}
                  name={icon as keyof typeof Ionicons.glyphMap}
                  size={28}
                  color='#FFF'
                />
              ))}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.center}>
            <ScrollView horizontal style={styles.scrollContainer}>
              <ThemedView style={styles.menuContainer}>
                <TouchableOpacity style={styles.menu} onPress={handleNewMatch}>
                  <ThemedText type='subtitle'>Criar partida</ThemedText>
                  <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                  />
                </TouchableOpacity>
                {inProgressMatches.length > 0 && (
                  <TouchableOpacity
                    style={styles.menu}
                    onPress={() => {
                      router.replace({
                        pathname: '/(game)/4dinha',
                        params: {
                          gameId: inProgressMatches[0]?.matches?.id,
                        },
                      });
                    }}
                  >
                    <ThemedText
                      lineBreakMode='tail'
                      type='subtitle'
                      numberOfLines={3}
                    >
                      Voltar para:{' '}
                      <ThemedText>
                        {inProgressMatches[0]?.matches?.name}
                      </ThemedText>
                    </ThemedText>
                  </TouchableOpacity>
                )}
              </ThemedView>
            </ScrollView>
            <ThemedView style={styles.matchContainer}>
              <ThemedText type='subtitle'>Novas Partidas</ThemedText>
              <FlatList
                data={matches}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MatchItem
                    match={item}
                    enterMatch={() => enterMatch(item.id)}
                    continueMatch={() => {}}
                  />
                )}
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.footer}>
            {footerMenu.map((item) => (
              <MenuIcon
                key={item.text}
                icon={item.icon}
                onPress={() => {}}
                text={item.text}
              />
            ))}
          </ThemedView>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
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
    backgroundColor: '#9290c3',
    shadowColor: '#9290c3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  profile_pic: { height: 50, width: 50, borderRadius: 8, borderWidth: 3 },
  topContainer: { marginTop: 10 },
  rowContainer: { flexDirection: 'row', gap: 10 },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
    backgroundColor: '#9290c3',
    borderRadius: 50,
  },
  iconWrapper: {
    borderRadius: 50,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9290c3',
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
    borderColor: '#9290c3',
    backgroundColor: '#1b1a55DD',
    borderRadius: 10,
    padding: 10,
  },
  logo: { width: 100, height: 100 },
  matchContainer: {
    backgroundColor: '#1b1a55DD',
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
    backgroundColor: '#070f2b88',
    borderColor: '#9290c3',
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  footerItem: { alignItems: 'center' },
  dark_border: {
    borderColor: Colors.dark.border,
  },
  light_border: {
    borderColor: Colors.dark.border,
  },
});
