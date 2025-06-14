import uni from '@uni-helper/eslint-config'

export default uni(
  {
    unocss: true,
  },
  {
    rules: {
      'ts/ban-ts-comment': 'off',
      'no-async-promise-executor': 'off',
      'no-unused-expressions': 'off',
      'vue/require-explicit-emits': 'off',
      'no-console': 'off',
      'ts/no-unused-expressions': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'unused-imports/no-unused-vars': 'off',
      'ts/no-use-before-define': 'off',
      'unicorn/no-new-array': 'off',
      'vue/no-template-shadow': 'off',
    },
  },
  {
    files: ['scripts/**/*.js'],
    rules: {
      'node/prefer-global/process': 'off',
      'no-console': 'off',
    },
  },
)
