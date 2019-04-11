module.exports = {
  'modulePathIgnorePatterns': [
    '/node_modules/'
  ],
  'persistModuleRegistryBetweenSpecs': true,
  'transformIgnorePatterns': [
    '/node_modules/'
  ],
  'rootDir': './',
  'roots': [
    '<rootDir>/src'
  ],
  'transform': {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  'unmockedModulePathPatterns': [
    '<rootDir>/node_modules/'
  ]
}
