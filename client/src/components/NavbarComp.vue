<template>
  <v-container class="text-center">
    <v-app>
      <v-app-bar app dark color="#FAF1E4">
        <!-- <v-img src="@/assets/logos.png" class="mr-4 align-start"></v-img> -->
        <v-toolbar-title>Vuetify App</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
          <v-btn :style="{ 'color': 'white', 'background-color': '#435334','margin-right': '8px' }">{{ username }}</v-btn>
          <v-btn @click="logoutUI" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">Çıkış Yap</v-btn>
          <v-btn @click="goToDashboard" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">Dashboard</v-btn>
          <v-btn @click="goToSettings" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">Settings</v-btn>

        </template>

        <template v-if="!isLoggedIn">
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Giriş Yap</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Kayıt Ol</v-btn>
        </template>

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
    console.log(userStore.isLoggedIn)
    return {
      username: userStore.getUserName,
      token: userStore.getRefreshToken,
      isLoggedIn: userStore.isLoggedIn,
    
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    logoutUI() {
      const userStore = useUserStore();
      userStore.logout();
      console.log("aaaaaa");
      console.log(userStore.userName);
      this.$router.push('/login');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    goToDashboard() {
      this.$router.push('/fabricaList');
    },
  },
};
</script>

<style scoped>
</style>
