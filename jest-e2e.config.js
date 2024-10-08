/* eslint-disable no-undef */
module.exports = {
  setupFiles: ['./test/setEnvVars.js'],
  moduleFileExtensions: ['js', 'ts'],
  rootDir: '.',
  maxWorkers: 1,
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.e2e.json',
    },
  },
};
