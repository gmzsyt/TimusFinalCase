<template>
<<<<<<< Updated upstream
  <v-container class="text-center">
    <v-app>
      <v-app-bar app dark color="primary">
        <!-- Sol tarafta bulunan logo -->
=======
  <v-container>
    <v-app>
      <v-app-bar app dark color="#FAF1E4">
>>>>>>> Stashed changes
        <v-img src="@/assets/logos.png" class="mr-4 align-start"></v-img>
        <v-toolbar-title>Vuetify App</v-toolbar-title>
<<<<<<< Updated upstream

        <!-- Sağ tarafta bulunan kullanıcı adı ve çıkış yap butonu -->
=======
        
>>>>>>> Stashed changes
        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
          <v-btn text>{{ username }}</v-btn>
          <v-btn text @click="logout">Çıkış Yap</v-btn>
        </template>

        <template v-else>
<<<<<<< Updated upstream
          <v-btn text @click="goToLogin">Login</v-btn>
          <v-btn text @click="goToRegister">Register</v-btn>
=======
          <v-btn v-if="username" :style="{ 'color': 'white', 'background-color': '#435334' }">{{ username }}</v-btn>
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Giriş Yap</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Kayıt Ol</v-btn>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
    goToSettings() {
      this.$router.push('/settings');
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
>>>>>>> Stashed changes
  },
};
</script>

<style scoped>
/* İhtiyaca göre özel stiller ekleyebilirsiniz. */
</style>
