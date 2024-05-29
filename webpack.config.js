const path = require('path');

module.exports = {
  entry: './src/index.js', // ponto de entrada do seu aplicativo
  output: {
    filename: 'bundle.js', // nome do arquivo de saída
    path: path.resolve(__dirname, 'dist') // diretório de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // aplicável para arquivos .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // usa o babel-loader para transpilar ES6+ para ES5
        }
      },
      {
        test: /\.css$/, // aplicável para arquivos .css
        use: ['style-loader', 'css-loader'] // usa style-loader e css-loader
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // aplicável para arquivos de imagem
        use: ['file-loader'] // usa file-loader
      }
    ]
  }
};
