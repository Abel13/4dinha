module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Some ESM dependencies (e.g. zustand middleware) reference
      // `import.meta`, which is a syntax error inside Expo's classic
      // (non-module) web bundle and unsupported on Hermes. Replace it with an
      // empty object so guarded accesses like `import.meta.env?.MODE` become
      // `undefined` instead of crashing the bundle.
      function neutralizeImportMeta() {
        return {
          name: 'neutralize-import-meta',
          visitor: {
            MetaProperty(path) {
              path.replaceWithSourceString('({})');
            },
          },
        };
      },
    ],
  };
};
