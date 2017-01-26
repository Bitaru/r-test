import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

const environments = ['development', 'production', 'test', 'dll'];

const getEnvironment = env =>
  env && environments.find(e => !!env[e]) || process.env.NODE_ENV || 'development';

export default (env) => {
  const environment = getEnvironment(env);
  const environmentConfig = require(`./${environment}.js`); // eslint-disable-line

  if (typeof environmentConfig === 'function') return environmentConfig(env);
  const { rules, publicPath, ...config } = environmentConfig;

  return {
    ...config,
    entry: [
      ...config.entry,
      './src/index.js'
    ],

    output: {
      path: path.resolve(process.cwd(), 'build'),
      filename: '[name].[hash].js',
      publicPath
    },

    module: {
      noParse: /\.min\.js/,
      rules: [
        {
          ...rules.localCss,
          test: /^((?!global).)*\.css/
        },
        {
          ...rules.globalCss,
          test: /\.global\.css/
        },
        {
          ...rules.js,
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          ...rules.font,
          test: /\.(eot|svg|ttf|woff|woff2)$/
        },
        {
          ...rules.image,
          test: /\.(jpg|png|gif)$/
        }
      ]
    },

    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        ...environments
          .reduce((acc, key) => ({ ...acc, [`__${key.toUpperCase()}__`]: environments[key] }), {}),
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),

      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        debug: true,
        options: {
          postcss: ctx => [
            require('postcss-import')({ addDependencyTo: ctx.webpack }),
            require('autoprefixer'),
            require('postcss-focus'),
            require('postcss-nested'),
            require('postcss-color-function'),
            require('postcss-simple-vars')
          ]
        }
      }),

      new webpack.DllReferencePlugin({
        context: path.join(process.cwd()),
        manifest: require(path.join(process.cwd(), 'node_modules/dll/vendor-manifest.json'))
      }),

      new HtmlWebpackPlugin({
        title: 'R-test',
        inject: true,
        template: 'src/index.html'
      }),

      new AddAssetHtmlPlugin({
        filepath: require.resolve(path.join(process.cwd(), 'node_modules/dll/vendor.dll.js'))
      })
    ]
  };
};
