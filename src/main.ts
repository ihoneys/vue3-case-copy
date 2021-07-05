import { createApp } from 'vue';

import "./utils/rem.js"

import App from './App.vue';
// import store from './store'
import router from './router';
import "./assets/css/reset.css"
import 'vant/lib/index.css'
// import 'babel-polyfill'

const app = createApp(App);

// import VConsole from 'vconsole'
// let vconsole = new VConsole()
// export default vconsole
import { Progress, Button  } from 'vant';

app
    .use(router)
    .use(Progress)
    .use(Button)
    .mount('#app');


app.config.globalProperties.$filters = {
    // decrypt(value) {
    //     return sm4Decrypt(value);
    // },
};
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
