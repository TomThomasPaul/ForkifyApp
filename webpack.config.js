const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    
    entry : ['./src/js/index.js'],    
    output: {
      
        
        path: path.resolve(__dirname, 'dist'),
        filename : 'js/bundle.js'
    
    
},
    devServer : {
        
        contentBase : './dist'
        
    },
    
    plugins : [ //array
        
        new htmlWebpackPlugin({
            
            filename: 'index.html',
            template: './src/index.html' //some apps create their own html file nstead of using templates
            
        })
        
        
    ],
    
    module : {
        
        rules :[
            
              {
                  test: /\.js$/,
                  exclude : /node_modules/,
                  use : {
                      
                      loader : 'babel-loader'
                      
                      
                  }
                  
                  
              }
            
            
            
            
               ]
        
        
        
        
        
    }
    
    
}