<template>
  <v-container class="text-center" v-if="navbarVisible">
    <v-app>
      <v-app-bar app dark color="primary">
        <!-- Sol tarafta bulunan logo -->
        <v-img src="@/assets//logos.png" class="mr-4 align-start"></v-img>

        <!-- Orta kısımda yer alacak başlık -->
        <v-toolbar-title>Vuetify App</v-toolbar-title>

        <!-- Sağ tarafta bulunan login ve register butonları -->
        <v-spacer></v-spacer>
        <v-btn text @click="goToLogin">Login</v-btn>
        <v-btn text @click="goToRegister">Register</v-btn>
      </v-app-bar>

      <!-- Sayfa içeriği buraya gelecek -->
      <v-row justify="center">
        <!-- Sayfa içeriğini buraya ekleyebilirsiniz -->
        <router-view></router-view>
      </v-row>
    </v-app>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      navbarVisible: false,
    };
  },
  methods: {
    goToLogin() {
      // Vue Router'ı kullanarak '/login' sayfasına yönlendirme yap
      this.$router.push('/login');
    },
    goToRegister() {
      // Vue Router'ı kullanarak '/register' sayfasına yönlendirme yap
      this.$router.push('/register');
    },
  },
  mounted() {
    this.navbarVisible = true;
  },
};
</script>

<style scoped>
/* Bileşen özel stilleri buraya eklenebilir */
</style>
