
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
          email: '',
          password: '',
          role: '',
        },
        roles: ['Admin', 'Editor'], // Add more roles as needed
      };
    },
    methods: {
      register() {
        // Your registration logic here
        console.log('Registering with:', this.user);
      },
    },
  };
  </script>
  