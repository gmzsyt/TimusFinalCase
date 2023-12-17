
<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form @submit.prevent="login">
        <v-text-field v-model="user.username" label="User Name" outlined></v-text-field>
        <v-text-field v-model="user.password" label="Password" outlined type="password"></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-4">Login</v-btn>
      </v-form>

      <div class="mt-4">
        <p class="text-body-2">Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      // Your login logic here
      console.log('Logging in with:', this.user);

      // Assuming a successful login, navigate to the home page
      // Replace '/home' with the actual path to your home page
      this.$router.push('/');
    },
  },
};
</script>
