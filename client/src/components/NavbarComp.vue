<template>
  <v-container class="text-center">
    <v-app>
      <v-app-bar app dark color="primary">
        <!-- Sol tarafta bulunan logo -->
        <v-img src="@/assets/logos.png" class="mr-4 align-start"></v-img>

        <!-- Orta kısımda yer alacak başlık -->
        <v-toolbar-title>Vuetify App</v-toolbar-title>

        <!-- Sağ tarafta bulunan kullanıcı adı ve çıkış yap butonu -->
        <v-spacer></v-spacer>
        <template v-if="isLoggedIn">
          <v-btn text>{{ username }}</v-btn>
          <v-btn text @click="logout">Çıkış Yap</v-btn>
        </template>
        <template v-else>
          <v-btn text @click="goToLogin">Login</v-btn>
          <v-btn text @click="goToRegister">Register</v-btn>
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
