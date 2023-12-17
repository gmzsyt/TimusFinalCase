<template>

  <v-container class="text-center">
    <v-app>
      <v-app-bar app dark color=#FAF1E4>
        <!-- Sol tarafta bulunan logo -->
        <v-img src="@/assets/logos.png" class="mr-4 align-start"></v-img>

        <!-- Orta kısımda yer alacak başlık -->
        <v-toolbar-title>Vuetify App</v-toolbar-title>


        <!-- Sağ tarafta bulunan kullanıcı adı, çıkış yap butonu ve dashboard butonu -->
        <v-spacer></v-spacer>
        <template v-if="isLoggedIn">
          <v-btn :style="{ 'color': 'white', 'background-color': '#435334' }">{{ username }}</v-btn>
          <v-btn @click="logout" :style="{ 'color': 'white', 'background-color': '#435334' }">Çıkış Yap</v-btn>
        </template>
        <template v-else>
          <v-btn @click="goToLogin" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Login</v-btn>
          <v-btn @click="goToRegister" :style="{ 'color': 'white', 'background-color': '#435334','margin-right': '8px' }">Register</v-btn>
          <v-btn @click="goToSettings" :style="{ 'color': 'white', 'background-color': '#435334', 'margin-right': '8px' }">Settings</v-btn>
          <v-btn @click="goToDashboard" :style="{ 'color': 'white', 'background-color': '#435334' }">Dashboard</v-btn>
        </template>
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
      isLoggedIn: false,
      username: "",
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
      // Çıkış işlemleri
      this.isLoggedIn = false;
      this.username = "";
      // Çıkış işlemi sonrasında kullanıcıyı giriş sayfasına yönlendirin
      this.$router.push('/login');
    },

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
  },
};
</script>

<style scoped>
/* Bileşen özel stilleri buraya eklenebilir */
</style>
