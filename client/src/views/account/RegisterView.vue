<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form @submit.prevent="register">
        <v-text-field
          v-model="user.username"
          :error-messages="usernameErrors"
          label="User Name"
          outlined
          @input="validateUsername"
        ></v-text-field>
        <v-text-field v-model="user.email" :error-messages="emailErrors" label="Email" outlined type="email"></v-text-field>
        <v-text-field v-model="user.password" :error-messages="passwordErrors" label="Password" outlined type="password"></v-text-field>

        <v-select
          v-model="user.role"
          :items="roles"
          label="Role"
          outlined
          :error-messages="roleErrors"
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
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      roles: ['admin', 'editor'], 
      usernameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      roleErrors: [],
    };
  },
  methods: {
    validateUsername() {
      if (this.user.username.length !== 8) {
        this.usernameErrors = ['Username must be 8 characters long'];
      } else {
        this.usernameErrors = [];
      }
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', this.user);

        console.log(response.data);

        this.$router.push('/login');
      } catch (error) {
        this.usernameErrors = error.response.data.message.username || [];
      }
    },
  },
};
</script>