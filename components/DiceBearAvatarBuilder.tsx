import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import MenuIcon from './MenuIcon';
import { StyleKey, useDicebearBuilder } from '@/hooks/useDicebearBuilder';
import { ThemedButton } from './ThemedButton';
import { useTranslation } from '@/hooks/useTranslation';
import { SvgImage } from './SvgImage';
import { SoundButton } from './SoundButton';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export type DiceBearAvatarBuilderProps = {
  initialStyle?: StyleKey;
  initialSeed?: string;
  onSave: (imageSvg: string) => void;
};

const BG_PALETTE = [
  'ffffff',
  '000000',
  'f4f4f5',
  'e5e7eb',
  'd1d5db',
  '9ca3af',
  'ef4444',
  'f97316',
  'f59e0b',
  'eab308',
  '22c55e',
  '10b981',
  '06b6d4',
  '3b82f6',
  '8b5cf6',
  'ec4899',
  'f43f5e',
  '14b8a6',
];

type TraitKey = string;

const STATIC_LABELS: Record<'style' | 'seed' | 'flip' | 'background', string> =
  {
    style: 'Avatar Style',
    seed: 'Seed',
    flip: 'Flip',
    background: 'Background',
  };

function SelectorRow({
  label,
  options,
  index,
  onChange,
}: {
  label: string;
  options: string[];
  index: number;
  onChange: (nextIndex: number) => void;
}) {
  const has = options && options.length > 0;
  const value = has ? options[index] : '-';
  const prev = () =>
    has && onChange((index - 1 + options.length) % options.length);
  const next = () => has && onChange((index + 1) % options.length);

  return (
    <ThemedView style={styles.selectorCard}>
      <ThemedText style={styles.selectorLabel}>{label}</ThemedText>
      <View style={styles.selectorRow}>
        <MenuIcon
          icon='chevron-back-circle-outline'
          text='anterior'
          onPress={prev}
        />
        <ThemedText style={styles.selectorValue}>{value}</ThemedText>
        <MenuIcon
          icon='chevron-forward-circle-outline'
          text='próximo'
          onPress={next}
        />
      </View>
    </ThemedView>
  );
}

export default function DiceBearAvatarBuilder({
  initialSeed,
  initialStyle,
  onSave,
}: DiceBearAvatarBuilderProps) {
  const {
    imageSvg,
    seed,
    flip,
    bgColors,
    traitIndex,
    traitChoices,
    style,
    traitLabels,
    availableStyles,
    bgType,
    loading,
    changeStyle,
    toggleBgColor,
    setFlip,
    setSeed,
    setTraitIndex,
    applyParamsToState,
  } = useDicebearBuilder();

  const { t } = useTranslation('components');

  useEffect(() => {
    applyParamsToState({
      style: initialStyle as string,
      seed: initialSeed as string,
      backgroundColor: 'a1a1a1',
    });
  }, []);

  return (
    <ThemedView style={styles.root}>
      <View style={styles.landscapeRow}>
        <SoundButton sound='menu' onPress={router.back}>
          <Feather name='chevron-left' color={Colors.dark.icon} size={28} />
        </SoundButton>
        <View style={styles.previewWrap}>
          <ThemedView style={styles.previewCard}>
            <SvgImage
              xml={imageSvg}
              containerStyle={{
                flex: 1,
                width: '100%',
                borderRadius: 24,
                borderWidth: 4,
                borderColor: Colors.dark.transparent,
              }}
            />
          </ThemedView>

          <ThemedButton
            title={t('DiceBearAvatarBuilder.save')}
            onPress={() => onSave(imageSvg)}
          />
        </View>

        {/* Right: Controls */}
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.controlsWrap}
        >
          <ScrollView contentContainerStyle={styles.controlsScroll}>
            <ThemedText style={styles.h1}>Criador de Avatar</ThemedText>

            {/* Style & Seed */}
            <ThemedView style={styles.card}>
              <ThemedText style={styles.label}>
                {STATIC_LABELS.style}
              </ThemedText>
              <View style={styles.selectorRow}>
                <MenuIcon
                  icon='chevron-back-circle-outline'
                  text='anterior'
                  onPress={() => {
                    const i = Math.max(
                      0,
                      availableStyles.findIndex((s) => s.value === style),
                    );
                    const next =
                      (i - 1 + availableStyles.length) % availableStyles.length;
                    changeStyle(availableStyles[next].value as StyleKey);
                  }}
                />

                <ThemedText style={styles.selectorValue}>
                  {loading
                    ? 'carregando...'
                    : availableStyles.find((s) => s.value === style)?.label}
                </ThemedText>
                <MenuIcon
                  icon='chevron-forward-circle-outline'
                  text='próximo'
                  onPress={() => {
                    const i = Math.max(
                      0,
                      availableStyles.findIndex((s) => s.value === style),
                    );
                    const next = (i + 1) % availableStyles.length;
                    changeStyle(availableStyles[next].value as StyleKey);
                  }}
                />
              </View>

              <ThemedText style={[styles.label, { marginTop: 12 }]}>
                {STATIC_LABELS.seed}
              </ThemedText>
              <TextInput
                value={seed}
                onChangeText={setSeed}
                placeholder='Type a seed'
                style={styles.input}
              />
            </ThemedView>

            {/* Flip */}
            <ThemedView style={styles.card}>
              <ThemedText style={styles.label}>{STATIC_LABELS.flip}</ThemedText>
              <View style={styles.selectorRow}>
                <MenuIcon
                  icon='chevron-back-circle-outline'
                  text='off'
                  disabled={!flip}
                  onPress={() => setFlip(false)}
                />
                <ThemedText style={styles.selectorValue}>
                  {flip ? 'On' : 'Off'}
                </ThemedText>
                <MenuIcon
                  icon='chevron-forward-circle-outline'
                  text='on'
                  disabled={flip}
                  onPress={() => setFlip(true)}
                />
              </View>
            </ThemedView>

            <ThemedView style={styles.card}>
              <ThemedText style={[styles.label, { marginTop: 10 }]}>
                Background Colors
              </ThemedText>
              <View style={styles.colorsWrap}>
                {BG_PALETTE.map((hex) => {
                  const selected = bgColors.includes(hex);
                  return (
                    <Pressable
                      key={hex}
                      onPress={() => toggleBgColor(hex)}
                      style={[
                        styles.colorChip,
                        { backgroundColor: `#${hex}` },
                        selected && styles.colorChipSelected,
                      ]}
                    />
                  );
                })}
              </View>
              <ThemedText style={styles.hint}>
                {`backgroundType ${bgType}: ${
                  bgType === 'solid'
                    ? ' selecione 1 cor'
                    : ' selecione até 2 cores'
                }`}
              </ThemedText>
            </ThemedView>

            {/* Dynamic traits with stepper-style selector */}
            {Object.entries(traitChoices).map(([key, options]) => {
              if (!options || options.length === 0) return null; // skip color-only or numeric traits for now
              const k = key as TraitKey;
              const idx = traitIndex[k] ?? 0;
              return (
                <SelectorRow
                  key={k}
                  label={traitLabels[k] ?? k}
                  options={options}
                  index={idx}
                  onChange={(nextIdx) =>
                    setTraitIndex((prev) => ({ ...prev, [k]: nextIdx }))
                  }
                />
              );
            })}

            <View style={{ height: 24 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ThemedView>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors?.dark?.background ?? '#0B1220',
    paddingHorizontal: 60,
  },
  landscapeRow: { flex: 1, flexDirection: 'row', gap: 16, padding: 16 },
  previewWrap: { flex: 1, gap: 8 },
  previewCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: { width: '100%', height: '100%', borderRadius: 10 },
  previewUrl: { color: '#94a3b8', fontSize: 12 },
  controlsWrap: { flex: 1 },
  controlsScroll: { paddingBottom: 24, gap: 12 },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  h1: { color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  label: { color: '#e5e7eb', fontSize: 14, marginBottom: 8, fontWeight: '600' },
  hint: { color: '#9ca3af', marginTop: 6, fontSize: 12 },
  input: {
    backgroundColor: '#0b1020',
    borderWidth: 1,
    borderColor: '#334155',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  colorsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  colorChip: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f172a',
  },
  colorChipSelected: { borderColor: '#22c55e', borderWidth: 2 },

  // Selector row aesthetics
  selectorCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  selectorLabel: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  selectorRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  selectorValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
});
