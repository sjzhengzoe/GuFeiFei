module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 2,
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    [
      'import',
      {
        libraryName: 'qeeq',
        style: true,
      },
    ],
  ],
};
