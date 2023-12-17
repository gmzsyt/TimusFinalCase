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
          <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
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
    register() {
      // Your login logic here

      // Assuming a successful login, navigate to the home page
      // Replace '/home' with the actual path to your home page
      this.$router.push('/');
    },
  },
};
</script>
  