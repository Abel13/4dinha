import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useMatchList } from '@/hooks/useMatchList';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { HelloWave } from '@/components/HelloWave';
import { Colors } from '@/constants/Colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { MatchItem } from '@/components/MatchItem';

export default function LobbyScreen() {
  const router = useRouter();
  const theme = useColorScheme() || 'light';
  const { matches, enterMatch, inProgressMatches } = useMatchList();
  const { username, profilePicture } = useUserSessionStore((state) => state);

  const handleNewMatch = useCallback(() => {
    router.push({
      pathname: '/lobby/new',
    });
  }, []);

  return (
    <ThemedView style={styles.screen}>
      <ImageBackground
        source={require('@/assets/images/background.jpg')}
        resizeMode="cover"
        style={styles.background}
        blurRadius={3}
      >
        <ThemedView style={styles.container} darkColor="transparent">
          <ThemedView style={styles.header}>
            <TouchableOpacity
              style={styles.profile}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Image
                source={{
                  uri: profilePicture,
                }}
                style={[styles.profile_pic, styles[`${theme}_border`]]}
              />
              <ThemedText
                type="defaultSemiBold"
                darkColor="#070f2b"
              >{`Olá, ${username}!`}</ThemedText>
              <HelloWave size={14} />
            </TouchableOpacity>

            <ThemedView darkColor="transparent" style={{ marginTop: 10 }}>
              <ThemedView
                style={{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <ThemedView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 50,
                    paddingRight: 10,
                    backgroundColor: '#9290c3',
                  }}
                >
                  <ThemedView
                    style={{
                      borderRadius: 50,
                      padding: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#9290c3',
                    }}
                    darkColor="#1b1a55"
                  >
                    <FontAwesome6
                      name="coins"
                      size={14}
                      color={Colors[theme].text}
                    />
                  </ThemedView>
                  <ThemedText darkColor="#070f2b" type="h4">
                    1.520
                  </ThemedText>
                </ThemedView>
                <ThemedView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 50,
                    paddingRight: 10,
                    backgroundColor: '#9290c3',
                  }}
                >
                  <ThemedView
                    style={{
                      borderRadius: 50,
                      padding: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#9290c3',
                    }}
                    darkColor="#1b1a55"
                  >
                    <FontAwesome6
                      name="sack-dollar"
                      size={14}
                      color={Colors[theme].text}
                    />
                  </ThemedView>
                  <ThemedText darkColor="#070f2b" type="h4">
                    0
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.iconsMenu}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={28}
                color={'#FFF'}
              />
              <Ionicons name="list-outline" size={28} color={'#FFF'} />
              <Ionicons name="settings-outline" size={28} color={'#FFF'} />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.center}>
            <ScrollView horizontal style={{ paddingLeft: 60 }}>
              <ThemedView style={styles.menuContainer}>
                <ThemedView style={styles.menu}>
                  <ThemedText type="subtitle">Criar partida</ThemedText>
                  <Image
                    source={require('@/assets/images/logo.png')}
                    style={{ width: 100, height: 100 }}
                  />
                </ThemedView>
                <ThemedView style={styles.menu}>
                  <ThemedText lineBreakMode="tail" numberOfLines={2}>
                    Voltar para {inProgressMatches[0]?.matches?.name}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ScrollView>
            <ThemedView
              style={{
                backgroundColor: '#1b1a55DD',
                padding: 10,
                borderTopStartRadius: 8,
                borderBottomStartRadius: 8,
                shadowColor: '#1b1a55DD',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 5,
              }}
            >
              <ThemedText type="subtitle">Novas Partidas</ThemedText>
              <FlatList
                data={matches}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MatchItem
                    match={item}
                    enterMatch={() => enterMatch}
                    continueMatch={() => {}}
                  />
                )}
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.footer}>
            <ThemedView
              darkColor="transparent"
              style={{ alignItems: 'center' }}
            >
              <Ionicons name="people-outline" size={36} color={'#9290c3'} />
              <ThemedText type="default">Amigos</ThemedText>
            </ThemedView>
            <ThemedView
              darkColor="transparent"
              style={{ alignItems: 'center' }}
            >
              <Ionicons name="cart-outline" size={36} color={'#9290c3'} />
              <ThemedText type="default">Loja</ThemedText>
            </ThemedView>
            <ThemedView
              darkColor="transparent"
              style={{ alignItems: 'center' }}
            >
              <Ionicons name="shirt-outline" size={36} color={'#9290c3'} />
              <ThemedText type="default">Itens</ThemedText>
            </ThemedView>
            <ThemedView
              darkColor="transparent"
              style={{ alignItems: 'center' }}
            >
              <Ionicons name="ribbon-outline" size={36} color={'#9290c3'} />
              <ThemedText type="default">Conquistas</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  profile: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#9290c3',
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    shadowColor: '#9290c3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  footer: {
    gap: 30,
    paddingBottom: 15,
    padding: 5,
    paddingHorizontal: 20,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070f2b88',
    borderColor: '#9290c3',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: '#9290c3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  iconsMenu: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  menu: {
    height: '80%',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9290c3',
    backgroundColor: '#1b1a55DD',
    borderRadius: 10,
    padding: 10,
  },
  menuContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical: 10,
  },
  background: {
    flex: 1,
    alignItems: 'flex-start',
  },
  profile_pic: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderWidth: 3,
  },
  dark_border: {
    borderColor: Colors.dark.border,
  },
  light_border: {
    borderColor: Colors.dark.border,
  },
});
