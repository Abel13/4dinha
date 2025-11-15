// LanguageFlagPicker.tsx
import { Colors } from '@/constants/Colors';
import { SupportedLocale } from '@/types';
import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';

// ===== Helpers =====

// Mapa padrão languageCode -> countryCode (ajustável via prop)
const defaultLangToCountry: Record<string, string> = {
  en: 'US',
  pt: 'BR',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  it: 'IT',
  ja: 'JP',
  zh: 'CN',
  ko: 'KR',
  ru: 'RU',
  ar: 'SA',
  hi: 'IN',
};

// Converte countryCode (ex.: 'BR') para flag emoji 🇧🇷
function countryCodeToFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏳️';
  const base = 127397;
  const cc = countryCode.toUpperCase();
  return String.fromCodePoint(cc.charCodeAt(0) + base, cc.charCodeAt(1) + base);
}

type Props = {
  languageCodes: SupportedLocale[];
  onSelect?: (lang: SupportedLocale) => void;
  languageToCountryMap?: Record<string, string>;
  initialSelected?: SupportedLocale;
  style?: ViewStyle;
};

const ITEM_SIZE = 44;
const GAP = 10;

// Animação por item baseada em um único Animated.Value (0 fechado → 1 aberto)
export const LanguageFlagPicker: React.FC<Props> = ({
  languageCodes,
  onSelect,
  languageToCountryMap,
  initialSelected,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(
    initialSelected && languageCodes.includes(initialSelected)
      ? initialSelected
      : languageCodes[0],
  );

  const map = useMemo(
    () => ({ ...defaultLangToCountry, ...(languageToCountryMap || {}) }),
    [languageToCountryMap],
  );

  const data = useMemo(() => {
    // Mantém a lista estável e sem duplicatas
    const uniq = Array.from(new Set(languageCodes.map((c) => c.toLowerCase())));
    return uniq.map((lang) => ({
      lang,
      country: map[lang] || 'US',
      flag: countryCodeToFlagEmoji(map[lang] || 'US'),
    }));
  }, [languageCodes, map]);

  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    setOpen((prev) => !prev);
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const handleSelect = (lang: string) => {
    setSelected(lang);
    onSelect?.(lang);
    // Fecha após selecionar
    setOpen(false);
    Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.mainButton,
          {
            backgroundColor: Colors.dark.background,
            borderColor: Colors.dark.border,
            shadowColor: Colors.dark.shadowIcon,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text
          style={[styles.flag, { textShadowColor: Colors.dark.shadowText }]}
        >
          {countryCodeToFlagEmoji(map[selected] || 'US')}
        </Text>
        <Text
          style={[
            styles.langCode,
            {
              color: Colors.dark.text,
              textShadowColor: Colors.dark.shadowText,
            },
          ]}
        >
          {selected}
        </Text>
      </Pressable>

      <View style={styles.rail} pointerEvents='box-none'>
        {data.map((item, index) => {
          const translateX = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1 * (index + 1) * (ITEM_SIZE + GAP)],
          });
          const opacity = anim.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [0, 0.4, 1],
          });
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          });

          const isSelected = selected === item.lang;

          return (
            <Animated.View
              key={`${item.lang}-${index}`}
              style={[
                styles.itemWrapper,
                {
                  transform: [{ translateX }, { scale }],
                  opacity,
                  right: 8,
                },
              ]}
              pointerEvents={open ? 'auto' : 'none'}
            >
              <Pressable
                onPress={() => handleSelect(item.lang)}
                style={({ pressed }) => [
                  styles.item,
                  {
                    backgroundColor: isSelected
                      ? Colors.dark.purpleTransparent
                      : Colors.dark.background,
                    borderColor: isSelected
                      ? Colors.dark.icon
                      : Colors.dark.border,
                    shadowColor: Colors.dark.shadowIcon,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.flag,
                    {
                      textShadowColor: Colors.dark.shadowText,
                    },
                  ]}
                >
                  {item.flag}
                </Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  rail: {
    position: 'absolute',
    top: 0,
  },
  mainButton: {
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: GAP,
    paddingHorizontal: GAP,
    flexDirection: 'row',
    elevation: 2,
  },
  flag: {
    fontSize: 24,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    marginRight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP,
    paddingHorizontal: GAP,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    borderWidth: 1,
    elevation: 2,
  },
  langCode: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'lowercase',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});
