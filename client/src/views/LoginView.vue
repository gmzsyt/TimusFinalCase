<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form @submit.prevent="login">
        <v-text-field v-model="username" label="User Name" outlined></v-text-field>
        <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
        <v-checkbox v-model="rememberMe" label="Remember me"></v-checkbox>

        <v-btn type="submit" color="primary" block class="mt-4">Sign in</v-btn>
      </v-form>

      <div class="mt-4">
        <p class="text-body-2">Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    login() {
      // Your login logic here
      console.log('Logging in with:', this.username, this.password);

      // Check if "Remember Me" is selected
      if (this.rememberMe) {
        // Save username and password in a cookie
        this.saveCredentialsToCookie();
      }
    },
    saveCredentialsToCookie() {
      // Save username and password to a cookie
      document.cookie = `username=${this.username};password=${this.password};expires=${this.getCookieExpirationDate()};path=/`;
    },
    getCookieExpirationDate() {
      const expirationDate = new Date();
      // Set the cookie expiration to 30 days from now
      expirationDate.setDate(expirationDate.getDate() + 30);
      return expirationDate.toUTCString();
    },
  },
};
</script>
