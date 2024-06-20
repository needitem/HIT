const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      },
      
    },
  },
})
