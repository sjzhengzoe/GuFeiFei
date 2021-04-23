module.exports = {
  'src/**/*.{js,tsx}': ['eslint --fix', 'prettier --write', 'git add'],
  'src/**/*.{scss,css}': ['prettier --write', 'git add'],
};
