module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  setupFilesAfterEnv: ['./src/registerComponents.js', './src/registerPlugins.js']
};
