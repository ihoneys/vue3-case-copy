import { createApp } from 'vue';

import "./utils/rem.js"

import App from './App.vue';
import store from './store'
import router from './router';
import "./assets/css/reset.css"
import 'vant/lib/index.less'

const app = createApp(App);

// import VConsole from 'vconsole'
// let vconsole = new VConsole()
// export default vconsole
import { Progress, Button, Cell, Field, Picker, Popup, Switch, RadioGroup, Radio, Uploader, DatetimePicker, CountDown, Icon, Toast, Image, Area, Dialog,List  } from 'vant';

app
    .use(store)
    .use(router)
    .use(Progress)
    .use(Button)
    .use(Cell)
    .use(Field)
    .use(Picker)
    .use(Popup)
    .use(Switch)
    .use(RadioGroup)
    .use(Radio)
    .use(Uploader)
    .use(DatetimePicker)
    .use(CountDown)
    .use(Icon)
    .use(Toast)
    .use(Image)
    .use(Area)
    .use(Dialog)
    .use(List)
    .mount('#app');


app.config.globalProperties.$filters = {
    // decrypt(value) {
    //     return sm4Decrypt(value);
    // },
};
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
