import { createApp } from 'vue'
import App from './App.vue'
// Router
import { router } from '/@/router';
import { setupStore } from "/@/store";
// WindiCSS
import 'virtual:windi.css';
import Antd from 'ant-design-vue';
import TDesign from 'tdesign-vue-next';
import '@purge-icons/generated'

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less');
}
const app = createApp(App);

app.config.productionTip = false;

// Configure store
setupStore(app);

app.use(router);

app.use(Antd);

app.use(TDesign);

app.mount('#app');

