<template>
  <v-container class="text-center">
    <v-app>
      <v-app-bar app dark color="#CEDEBD">
         <v-btn icon @click="goToHome" flat>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn @click="goToHome" flat>
        <v-toolbar-title style="cursor: pointer;">{{$t('appname')}}</v-toolbar-title>
      </v-btn>

        <v-spacer></v-spacer>

        <template v-if="localToken">
          <v-btn :style="{ 'color': 'white', 'background-color': '#435334','margin-right': '8px' }">{{ username }}</v-btn>
          <v-btn @click="logoutUI" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">{{$t('logout')}}</v-btn>
          <v-btn @click="goToDashboard" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">{{$t('dashboard')}}</v-btn>
          <v-btn @click="goToSettings" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">{{$t('settings')}}</v-btn>

        </template>

        <template v-if="!localToken">
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">{{$t('sign in')}}</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">{{$t('settings')}}</v-btn>
        </template>

        <!-- Dil seçeneği için icon -->
        <v-btn icon @click="toggleLanguage" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </v-app-bar>

      <v-row justify="center">
        <router-view></router-view>
      </v-row>
    </v-app>
  </v-container>
</template>


<script>
import useUserStore from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    return {
      username: localStorage.getItem('username'),
      token: userStore.token,
      isLoggedIn: userStore.isLoggedIn,
      localToken: localStorage.getItem('token')
    };
  },
  methods: {
    toggleLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'tr' : 'en';
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    logoutUI() {
      const userStore = useUserStore();
      userStore.logout();
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    goToDashboard() {
      this.$router.push('/fabricaList');
    },
    goToHome(){
      this.$router.push('/');

    }
  },
};
</script>

