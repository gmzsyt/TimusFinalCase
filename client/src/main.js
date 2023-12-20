import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Axios from 'axios';
import { loadFonts } from './plugins/webfontloader';
import vuetify from './plugins/vuetify';
import { createI18n } from 'vue-i18n';

loadFonts();
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      settings: "Settings",
      dashboard: "Dashboard",
      logout: "Log Out", 
      sigin: "Sign In",
      login: "Log In",
      username: "User Name",
      password: "Password",
      rememberme: "Remember Me",
      donthave: "Don't have an account?",
      register: "Register",
      addcolumn:"Add Column",
      viewDetail: "View Details",
      edit: "Edit",
      FactoryListPage: "Factory List Table",
      FactoryDetailPage:"Factory Detail Table"
    },
    tr: {
      settings: "Ayarlar",
      dashboard: "Panel",
      logout: "Çıkış yap", 
      sigin: "Kayıt ol",
      login: "Giriş Yap",
      username: "Kullanıcı Adı",
      password: "Şifre",
      rememberme: "Beni Hatırla",
      donthave: "Henüz hesabınız yok mu?",
      register: "Kayıt ol",
      addcolumn:"Sütun Ekle",
      viewDetail: "Detayları Göster",
      edit: "Düzenle",
      FactoryListPage: "Fabrika Listesi Tablosu",
      FactoryDetailPage:"Fabrika Detay Tablosu "
    }
  }
})
const app = createApp(App);

app.config.globalProperties.$axios = Axios;

app
.use(i18n)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app');
