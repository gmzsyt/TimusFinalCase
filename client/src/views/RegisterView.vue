
<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
        <v-form @submit.prevent="register">
          <v-text-field v-model="user.username" label="User Name" outlined></v-text-field>
          <v-text-field v-model="user.email" label="Email" outlined type="email"></v-text-field>
          <v-text-field v-model="user.password" label="Password" outlined type="password"></v-text-field>
  
          <v-select
            v-model="user.role"
            :items="roles"
            label="Role"
            outlined
          ></v-select>
  
          <v-btn type="submit" color="primary" block class="mt-4">Register</v-btn>
        </v-form>
  
        <div class="mt-4">
          <p class="text-body-2">Already have an account? <router-link to="/login">Login</router-link></p>
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
  