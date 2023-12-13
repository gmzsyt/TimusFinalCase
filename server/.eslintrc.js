module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',  
    'plugin:@typescript-eslint/recommended', 
    'prettier',  
  ],
  plugins: ['@typescript-eslint'],
  rules: {
 
  },
};
