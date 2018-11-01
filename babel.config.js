module.exports = {
  'presets': [
    [require.resolve('@babel/preset-env'), {
      'targets': {
        'browsers': ['last 2 versions', 'safari >= 7'],
        'node': 'current'
      }
    }]
  ]
}
