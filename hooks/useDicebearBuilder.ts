import { useEffect, useMemo, useRef, useState } from 'react';

import { createAvatar, schema } from '@dicebear/core';
import {
  micah,
  adventurer,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  bigEars,
  bigEarsNeutral,
  bigSmile,
  bottts,
  botttsNeutral,
  croodles,
  croodlesNeutral,
  dylan,
  funEmoji,
  glass,
  icons,
  identicon,
  initials,
  lorelei,
  loreleiNeutral,
  miniavs,
  notionists,
  notionistsNeutral,
  openPeeps,
  personas,
  pixelArt,
  pixelArtNeutral,
  rings,
  shapes,
  thumbs,
} from '@dicebear/collection';

const importedStyles = {
  micah,
  adventurer,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  bigEars,
  bigEarsNeutral,
  bigSmile,
  bottts,
  botttsNeutral,
  croodles,
  croodlesNeutral,
  dylan,
  funEmoji,
  glass,
  icons,
  identicon,
  initials,
  lorelei,
  loreleiNeutral,
  miniavs,
  notionists,
  notionistsNeutral,
  openPeeps,
  personas,
  pixelArt,
  pixelArtNeutral,
  rings,
  shapes,
  thumbs,
};

export type StyleKey = keyof typeof importedStyles;

export const DICEBEAR_API_VERSION = '9.x';

export type BackgroundType = 'solid' | 'gradientLinear';

type SchemaOption = {
  type?: string;
  enum?: string[];
  items?: { enum?: string[]; pattern?: string };
  pattern?: string;
  minimum?: number;
  maximum?: number;
  description?: string;
};

type StyleSchema = { properties?: Record<string, SchemaOption> };

export interface AvatarExtra {
  accessories: string | undefined;
  accessoriesColor: string;
  backgroundColor: string;
  backgroundRotation: number;
  backgroundType: 'solid' | 'gradient' | string;
  base: string;
  clothesColor: string;
  clothing: string;
  clothingGraphic: string;
  eyebrows: string;
  eyes: string;
  facialHair: string | undefined;
  facialHairColor: string;
  hairColor: string;
  hatColor: string;
  mouth: string;
  nose: string;
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  skinColor: string;
  style: string;
  top: string;
}

export interface AvatarOptions {
  extra: AvatarExtra;
  svg: string;
}

export function useDicebearBuilder() {
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState<StyleKey>('avataaarsNeutral');
  const [seed, setSeed] = useState<string>('Avatar');
  const [flip, setFlip] = useState(false);
  const [bgColors, setBgColors] = useState<string[]>([]);
  const [traitLabels, setTraitLabels] = useState<Record<string, string>>({});
  const [avatar64, setavatar64] = useState('');
  const [avatarSVG, setAvatarSVG] = useState('');
  const [jsonImage, setJsonImage] = useState<AvatarOptions | null>(null);
  const [remoteSchema, setRemoteSchema] = useState<StyleSchema | null>(null);
  const [traitSchemas, setTraitSchemas] = useState<
    Record<string, SchemaOption>
  >({});

  const availableStyles = useMemo<{ value: string; label: string }[]>(
    () =>
      Object.keys(importedStyles).map((key) => ({
        value: key,
        label: key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase()),
      })),
    [],
  );

  const pendingParamsRef = useRef<Record<string, string | string[]> | null>(
    null,
  );

  const [traitChoices, setTraitChoices] = useState<Record<string, string[]>>(
    {},
  );
  const [traitIndex, setTraitIndex] = useState<Record<string, number>>({});

  const loadSchema = async (style: string) => {
    try {
      const url = `https://api.dicebear.com/${DICEBEAR_API_VERSION}/${style}/schema.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Schema HTTP ${res.status}`);
      const json: StyleSchema = await res.json();
      setRemoteSchema(json);

      const mergedProperties = {
        ...schema.properties,
        ...json.properties,
      };

      setTraitSchemas(mergedProperties);

      const [nextChoices, nextIndex, nextLabels] = Object.entries(
        mergedProperties,
      ).reduce(
        ([choices, index, labels], [key, opt]) => {
          if (!opt) return [choices, index, labels];

          let arr: string[] | undefined;

          if (Array.isArray(opt.items?.enum)) {
            arr = opt.items.enum;
          } else if (Array.isArray(opt.enum)) {
            arr = opt.enum;
          } else if (Array.isArray(opt.default)) {
            arr = opt.default.map(String); // Fallback para default
          }

          if (arr && arr.length > 1) {
            choices[key] = arr;
            index[key] = 0;

            labels[key] = opt.description ?? key;
          }

          labels[key] = opt.description ?? key;
          return [choices, index, labels];
        },
        [{}, {}, {}] as [
          Record<string, string[]>,
          Record<string, number>,
          Record<string, string>,
        ],
      );

      setTraitChoices(nextChoices);
      setTraitIndex(nextIndex);
      setTraitLabels(nextLabels);
    } catch (e) {
      console.warn('Failed to load schema', e);

      setTraitChoices({});
      setTraitIndex({});
      setTraitLabels({});
    }
  };

  const applyParamsToState = (params: Record<string, string | string[]>) => {
    if (typeof params.seed === 'string') setSeed(params.seed);
    if (typeof params.flip === 'string')
      setFlip(params.flip === 'true' || params.flip === '1');

    const bc = params.backgroundColor;
    if (typeof bc === 'string') setBgColors([bc]);
    else if (Array.isArray(bc)) setBgColors(bc);

    Object.keys(traitChoices).forEach((k) => {
      const incoming = params[k];
      if (!incoming) return;
      const opts = traitChoices[k];
      const val = Array.isArray(incoming) ? incoming[0] : incoming;
      const idx = opts.indexOf(val);
      if (idx >= 0) setTraitIndex((prev) => ({ ...prev, [k]: idx }));
    });
  };

  const bgType = useMemo(() => {
    const choices = traitChoices['backgroundType'] || [];
    const backgroundIndex = traitIndex['backgroundType'];

    if (!choices || !backgroundIndex) return 'solid';

    return choices[backgroundIndex];
  }, [traitChoices, traitIndex]);

  const toggleBgColor = (color: string) => {
    setBgColors((prev) => {
      const exists = prev.includes(color);
      if (exists) {
        // já existe -> remove
        return prev.filter((c) => c !== color);
      }

      if (bgType === 'solid') {
        // sólido -> apenas uma cor
        return [color];
      }

      // gradiente/multicolor -> no máximo 2 cores
      if (prev.length >= 2) {
        // remove a primeira inserida e acrescenta a nova (FIFO)
        return [...prev.slice(1), color];
      }

      // ainda cabe
      return [...prev, color];
    });
  };

  const changeStyle = async (style: StyleKey) => {
    setLoading(true);
    await loadSchema(style);
    setStyle(style);
    setLoading(false);
  };

  useEffect(() => {
    const styleObj = importedStyles[style];
    if (!styleObj) return;

    const options: any = {};
    Object.entries(traitSchemas).forEach(([key, opt]) => {
      const val = traitChoices[key]?.[traitIndex[key] ?? 0];

      if (val === undefined) return;

      if (opt.type === 'array') {
        options[key] = [val];
      } else if (opt.type === 'boolean') {
        options[key] = val === 'true' || Boolean(val);
      } else if (opt.type === 'integer' || opt.type === 'number') {
        options[key] = Number(val);
      } else {
        options[key] = val;
      }
    });

    const avatar = createAvatar(styleObj as any, {
      seed,
      flip,
      backgroundColor: bgColors,
      scale: 90,
      ...options,
    });

    const base64 = avatar.toDataUri();
    const svg = avatar.toString();
    const json = avatar.toJson();

    setavatar64(base64);
    setAvatarSVG(svg);
    setJsonImage(json as unknown as AvatarOptions);
  }, [
    style,
    seed,
    flip,
    bgColors,
    traitChoices,
    traitIndex,
    remoteSchema,
    traitSchemas,
  ]);

  useEffect(() => {
    if (pendingParamsRef.current && Object.keys(traitChoices).length > 0) {
      applyParamsToState(pendingParamsRef.current);
      pendingParamsRef.current = null;
    }
  }, [traitChoices]);

  return {
    imageSvg: avatarSVG,
    image64: avatar64,
    imageJson: jsonImage,

    seed,
    flip,
    bgColors,
    traitIndex,
    traitChoices,
    style,
    pendingParamsRef,
    traitLabels,
    availableStyles,
    bgType,
    loading,

    setSeed,
    changeStyle,
    setFlip,
    setTraitIndex,

    loadSchema,
    toggleBgColor,
    applyParamsToState,
  };
}
