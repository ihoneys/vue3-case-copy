import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import';
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 覆盖样式变量
        modifyVars: {
          'blue': '#00C6B8',
          'gray-7' : '#333333',
          'gray-4' : '#00C6B8',
        },
      },
    },
  },
  plugins: [

    vue(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'vant',
    //       style(name) {
    //         return `vant/lib/index.css`
    //       },
    //     },
    //   ],
    // // }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/less`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "@ASS",
        replacement: resolve(__dirname, "src/assets"),
      },
    ]
    // {
    //   '@': resolve(__dirname, 'src'),
    //   comps: resolve(__dirname, 'src/components'),
    // },
  },
  base: './',
  server: {
    port: 3000, // 设置端口
    open: true, // 设置启动时，自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://10.1.95.110:9001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '/')
      }
    }
  },

})
