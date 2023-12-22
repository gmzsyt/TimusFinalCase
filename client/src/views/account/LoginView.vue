<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <h2 class="text-h5 text-center" style="color: #9EB384 ;margin-bottom: 30px; font-weight: bold;"> {{$t('login')}}</h2> 

      <v-form @submit.prevent="login">
        <v-text-field v-model="user.username" label="User Name" outlined></v-text-field>
        <v-text-field v-model="user.password" label="Password" outlined type="password"></v-text-field>

        <v-checkbox v-model="rememberMe" label="Remember Me"></v-checkbox>
        <v-btn icon @click="toggleLanguage" :style="{ 'margin-right': '8px','color': 'white', 'background-color': '#435334' }">
          <v-icon>mdi-translate</v-icon>
        </v-btn>

        <v-btn type="submit" color= #9EB384 block class="mt-4 p">{{$t('register')}}</v-btn>
      </v-form>
      

      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout">
        {{ snackbarMessage }}
      </v-snackbar>

      <div class="mt-4">
        <p class="text-body-2">{{$t('donthave')}} <router-link to="/register">{{$t('register')}}</router-link></p>      </div>
    </v-sheet>
  </div>
</template>

<script>
import useUserStore from './../../stores/userStore';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rememberMe: false,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
      snackbarTimeout: 3000, 
    };
  },
  mounted() {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      this.user.username = localStorage.getItem('username') || '';
      this.user.password = localStorage.getItem('password') || '';
      this.rememberMe = true;
    }
  },
  methods: {
    toggleLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'tr' : 'en';
    },
    async login() {
      try {
        const authStore = useUserStore();

        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', this.user.username);
          localStorage.setItem('password', this.user.password);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        await authStore.login(this.user.username, this.user.password);
        this.$router.push('/');

        this.showSnackbar('Login successful', 'success');
      } catch (error) {
        console.error('Login failed:', error.message);
        this.showSnackbar('Login failed. Please check your credentials.', 'error');
      }
    },
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
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

