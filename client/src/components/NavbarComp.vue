<template>
  <v-container>
    <v-app>
      <v-app-bar app dark color="#FAF1E4">
        <v-img src="@/assets/logos.png" class="mr-4 align-start"></v-img>
        <v-toolbar-title>Vuetify App</v-toolbar-title>
        
        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
          <v-btn :style="{ 'color': 'white', 'background-color': '#435334' }">{{ username }}</v-btn>
          <v-btn @click="logout" :style="{ 'color': 'white', 'background-color': '#435334' }">Çıkış Yap</v-btn>
        </template>

        <template v-else>
          <v-btn v-if="username" :style="{ 'color': 'white', 'background-color': '#435334' }">{{ username }}</v-btn>
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Giriş Yap</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Kayıt Ol</v-btn>
        </template>

        <v-btn v-if="isLoggedIn" @click="goToSettings" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Ayarlar</v-btn>
        <v-btn v-if="isLoggedIn" @click="goToDashboard" :style="{ 'color': 'white', 'background-color': '#435334' }">Dashboard</v-btn>
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
      username: userStore.getUserName,
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
    logout() {
      // Kullanıcıyı çıkış yapmış durumuna getir
      this.$store.dispatch('useUserStore/setUserData', null);
      this.$router.push('/login');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>
</style>
