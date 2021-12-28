import { createApp } from 'vue'
import App from './App.vue'
// Router
import { router } from '/@/router';
import { setupStore } from "/@/store";
// WindiCSS
import 'virtual:windi.css';
import Antd from 'ant-design-vue';
import '@purge-icons/generated'

import Keycloak from 'keycloak-js'

if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less');
}

let initOptions = {
    url: '/auth', realm: 'lab', clientId: 'lab-auth-web', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

const app = createApp(App, { keycloak: keycloak });

app.config.productionTip = false;

// Configure store
setupStore(app);

app.use(router);

app.use(Antd);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        // window.location.reload();
    } else {
        app.mount('#app');
    }

    // Token Refresh
    setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.info("🚀 ~ file: main.js ~ line 41 ~ keycloak.updateToken ~ Token refreshed", refreshed)
            } else {
                console.info("🚀 ~ file: main.js ~ line 45 ~ keycloak.updateToken ~ ", 'Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
            }
        }).catch(() => {
            console.error("🚀 ~ file: main.js ~ line 44 ~ keycloak.updateToken ~ Failed to refresh token")
        });
    }, 6000)

}).catch((error) => {
    console.error("🚀 ~ file: main.js ~ line 52 ~ keycloak.init ~ Authenticated Failed", error)
});

