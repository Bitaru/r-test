import path from 'path';
import webpack from 'webpack';

const libs = [
  'react',
  'react-dom',
  'recompose',
  'lodash',
  'react-router'
];

export default () => ({
  entry: {
    vendor: libs
  },
  devtool: '#source-map',
  output: {
    path: path.join(process.cwd(), 'node_modules/dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(process.cwd(), 'node_modules/dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
});
