const { compact } = require('lodash');

module.exports = ctx => ({
  parser: require('postcss-scss'),
  plugins: compact([
    require('postcss-smart-import'),
    require('postcss-focus'),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-simple-vars'),
    ctx.development && require('postcss-reporter')({ clearReportedMessages: true }),
    require('autoprefixer')
  ])
});
