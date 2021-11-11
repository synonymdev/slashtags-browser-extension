module.exports = {
  runtimeCompiler: true,

  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    },
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.js',
      title: 'Options'
    },
    override: {
      template: 'public/browser-extension.html',
      entry: './src/override/main.js',
      title: 'Override'
    },
    standalone: {
      template: 'public/browser-extension.html',
      entry: './src/standalone/main.js',
      title: 'Standalone',
      filename: 'index.html'
    },
    devtools: {
      template: 'public/browser-extension.html',
      entry: './src/devtools/main.js',
      title: 'Devtools'
    }
  },

  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.js'
            ]
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '@/src/styles/variables.scs';"
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        { 
          test: /act_1\.js$/,
          loader: "babel-loader"
        }, {  
          test: /index\.js$/,
          loader: "babel-loader"
        },{
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: "@import '@/styles/variables.scs';",
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true
                },
              }
            }
          ]
        }
      ] 
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
