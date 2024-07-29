import { createApp } from 'vue'
import App from './App.vue'
// 导入路由组件
import router from './router'
// 导入仓库
import pinia from './store'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

createApp(App)
    .use(router) // 注册路由
    .use(pinia) // 安装仓库
    .use(ElementPlus, { locale: zhCn }) // 注册element-plus
    .mount('#app')
