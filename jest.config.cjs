module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.cjs'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^../utils/baseUrl$': '<rootDir>/src/utils/baseUrl.jest.js',
    '^./utils/baseUrl$': '<rootDir>/src/utils/baseUrl.jest.js',
  },
};