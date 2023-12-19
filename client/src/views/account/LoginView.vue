<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form @submit.prevent="login">
        <v-text-field v-model="user.username" label="User Name" outlined></v-text-field>
        <v-text-field v-model="user.password" label="Password" outlined type="password"></v-text-field>

        <v-checkbox v-model="rememberMe" label="Remember Me"></v-checkbox>

        <v-btn type="submit" color="primary" block class="mt-4 p">Login</v-btn>
      </v-form>

      <div class="mt-4">
        <p class="text-body-2">Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import useUserStore from './../../stores/userStore'

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rememberMe: false,
    };
  },
  mounted() {
    // Sayfa yüklendiğinde localStorage'de hatırlama bilgisi var mı kontrol et
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      // Hatırla seçeneği işaretliyse, localStorage'den kullanıcı bilgilerini al
      this.user.username = localStorage.getItem('username') || '';
      this.user.password = localStorage.getItem('password') || '';
      this.rememberMe = true;
    }
  },
  methods: {
    async login() {
      try {
        const authStore = useUserStore();

        // Beni Hatırla seçeneği işaretliyse, kullanıcı bilgilerini localStorage'e kaydet
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', this.user.username);
          localStorage.setItem('password', this.user.password);
        } else {
          // Beni Hatırla seçeneği işaretli değilse, localStorage'deki bilgileri temizle
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        await authStore.login(this.user.username, this.user.password);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
  },
};
</script>

<style scoped>
.p {
  padding: 25px;
  font-size: 1.2rem;
}
</style>
