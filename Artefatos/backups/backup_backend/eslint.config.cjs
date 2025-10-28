// eslint.config.js

import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // Configuração principal para arquivos TypeScript
  ...tseslint.configs.recommended,
  // Integração com o Prettier (deve ser a última)
  prettierRecommended,

  // Suas regras personalizadas
  {
    rules: {
      // Ativa a regra do Prettier e aplica suas configurações
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],

      // Usa a versão do TypeScript para 'no-unused-vars' para evitar falsos positivos
      '@typescript-eslint/no-unused-vars': 'warn',

      // Sua regra para o console
      'no-console': 'off',
    },
  },
];
