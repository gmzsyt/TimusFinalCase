<template>
<<<<<<< HEAD

=======
<<<<<<< Updated upstream
>>>>>>> frontend-feature-login-register-views
  <v-container class="text-center">
    <v-app>
      <v-app-bar app dark color=#FAF1E4>
        <!-- Sol tarafta bulunan logo -->
=======
  <v-container>
    <v-app>
      <v-app-bar app dark color="#FAF1E4">
>>>>>>> Stashed changes
        <v-img src="@/assets/logos.png" class="mr-4 align-start"></v-img>
        <v-toolbar-title>Vuetify App</v-toolbar-title>
<<<<<<< Updated upstream

<<<<<<< HEAD

        <!-- Sağ tarafta bulunan kullanıcı adı, çıkış yap butonu ve dashboard butonu -->
=======
        <!-- Sağ tarafta bulunan kullanıcı adı ve çıkış yap butonu -->
=======
        
>>>>>>> Stashed changes
>>>>>>> frontend-feature-login-register-views
        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
          <v-btn :style="{ 'color': 'white', 'background-color': '#435334' }">{{ username }}</v-btn>
          <v-btn @click="logout" :style="{ 'color': 'white', 'background-color': '#435334' }">Çıkış Yap</v-btn>
        </template>

        <template v-else>
<<<<<<< HEAD
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Login</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334','margin-right': '8px' }">Register</v-btn>
          <v-btn @click="goToSettings" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Settings</v-btn>
          <v-btn @click="goToDashboard" :style="{ 'color': 'white', 'background-color': '#435334' }">Dashboard</v-btn>
=======
<<<<<<< Updated upstream
          <v-btn text @click="goToLogin">Login</v-btn>
          <v-btn text @click="goToRegister">Register</v-btn>
=======
          <v-btn v-if="username" :style="{ 'color': 'white', 'background-color': '#435334' }">{{ username }}</v-btn>
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Giriş Yap</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Kayıt Ol</v-btn>
>>>>>>> Stashed changes
>>>>>>> frontend-feature-login-register-views
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
<<<<<<< HEAD

    goToSettings() {
      // Settings sayfasına yönlendirme
      this.$router.push('/settings');
    },
    goToDashboard() {
      // Dashboard sayfasına yönlendirme
      this.$router.push('/fabricaList');
    },
  },
  mounted() {
    // Burada kullanıcının giriş yapmış olup olmadığını kontrol edebilirsiniz.
    // Eğer giriş yapmışsa, this.isLoggedIn'ı true olarak ve this.username'ı ilgili kullanıcı adıyla ayarlayın.
    // Örneğin, cookie'den veya başka bir kimlik doğrulama yönteminden bilgileri çekebilirsiniz.
=======
<<<<<<< Updated upstream
=======
    goToSettings() {
      this.$router.push('/settings');
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
>>>>>>> Stashed changes
>>>>>>> frontend-feature-login-register-views
  },
};
</script>

<style scoped>
/* İhtiyaca göre özel stiller ekleyebilirsiniz. */
</style>
