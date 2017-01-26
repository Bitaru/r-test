import path from 'path';
import webpack from 'webpack';

const vendor = [
  'react',
  'react-dom',
  'recompose'
];

export default () => ({
  entry: { vendor },
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
