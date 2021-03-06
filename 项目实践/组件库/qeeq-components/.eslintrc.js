module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended'],
  parserOptions: {
    typescript: true,
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    'import/resolver': {},
    react: {
      pragma: 'React',
      version: '17.0.2',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  globals: {
    define: true,
  },

  rules: {
    'sort-imports': 0,
    'import/first': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/extensions': 0,
    'prefer-destructuring': 0,
    'no-new': 0,
    'react/jsx-filename-extension': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'no-console': 0,
    'no-useless-escape': 0,
    'no-extra-boolean-cast': 0,
    semi: 2,
    'no-empty': 2,
    'no-shadow': 0,
    'no-debugger': 1,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 2,
    'no-cond-assign': 1,
    'react/display-name': 0,
    'no-unused-vars': 1,
    'react/no-string-refs': 1,
    'react/jsx-key': 1,
    'react/no-unescaped-entities': 1,
    'react/jsx-no-target-blank': 0,
    'no-dupe-keys': 1,
    'no-redeclare': 0,
    'no-func-assign': 0,
    'no-unsafe-finally': 0,
  },
};
