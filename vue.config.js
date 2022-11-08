const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      //请求前缀，如果请求前缀是api就把东西转发给端口号为5000服务器
      '/api': {
        //代理目标的基础路径
        target: 'http://localhost:5000',
        //路径重写
        // pathRewrite: { '^/api': '' },
      },
    }
  }
})
