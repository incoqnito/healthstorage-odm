module.exports = {
  'modulePathIgnorePatterns': [
    '/public'
  ],
  'transformIgnorePatterns': [
    '/public'
  ],
  'rootDir': '',
  'transform': {
    '.*': '<rootDir>/node_modules/babel-jest'
  },
  'roots': [
    '<rootDir>/src'
  ],
  'unmockedModulePathPatterns': [
    '<rootDir>/src/'
  ]
}
