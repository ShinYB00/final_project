const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy : 'http://localhost:8081'
  }
}