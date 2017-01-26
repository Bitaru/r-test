import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';
import { defaultRules } from './default';

const rules = {
  ...defaultRules,
  localCss: {
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  },

  globalCss: {
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }
    ]
  },

  js: {
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'react-hot-loader/babel',
            'react-require'
          ],
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react'
          ]
        }
      }
    ]
  }
};

export default {
  rules,
  publicPath: '/',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(process.cwd(), 'build'),
    port: 3000,
    stats: 'minimal',
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin()
  ],
};
