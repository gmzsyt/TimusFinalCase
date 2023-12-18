// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Axios from 'axios';
import { loadFonts } from './plugins/webfontloader';
import vuetify from './plugins/vuetify';

loadFonts();

const app = createApp(App);

app.config.globalProperties.$axios = Axios;

app
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app');
