<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form @submit.prevent="register">
        <v-text-field v-model="user.username" :error-messages="usernameErrors" label="User Name" outlined
          @input="validateUsername"></v-text-field>
        <v-text-field v-model="user.email" :error-messages="emailErrors" label="Email" outlined type="email"
          @input="validateEmail"></v-text-field>
        <v-text-field v-model="user.password" :error-messages="passwordErrors" label="Password" outlined type="password"
          @input="validatePassword"></v-text-field>

        <v-select v-model="user.role" :items="roles" label="Role" outlined :error-messages="roleErrors"
          @input="validateRole"></v-select>
        <v-btn icon @click="toggleLanguage"
          :style="{ 'margin-right': '8px', 'color': 'white', 'background-color': '#435334' }">
          <v-icon>mdi-translate</v-icon>
        </v-btn>

        <v-btn type="submit" color="primary" block class="mt-4">{{ $t('sigin') }}</v-btn>
      </v-form>

      <div class="mt-4">
        <p class="text-body-2">{{$t('alreadyac')}}<router-link to="/login">  {{$t('login')}}</router-link></p>
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
    toggleLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'tr' : 'en';
    },
    validateUsername() {
      this.usernameErrors = [];
      console.log('Entered Username:', this.user.username);
      console.log('Username Length:', this.user.username.length);

      if (this.user.username.length < 8) {
        this.usernameErrors.push('Username must be 8 characters long');
      }
      else {
        this.usernameErrors = []
      }
    },
    validatePassword() {
      this.passwordErrors = [];

      if (!/\d/.test(this.user.password)) {
        this.passwordErrors.push('Password must contain a numeric value');
      }

      if (!/[A-Z]/.test(this.user.password)) {
        this.passwordErrors.push('Password must contain at least one uppercase letter');
      }
    },
    validateEmail() {
      this.emailErrors = [];

      if (!/\S+@\S+\.\S+/.test(this.user.email)) {
        this.emailErrors.push('Invalid email address');
      }
    },
    validateRole() {
  this.roleErrors = [];

  if (!this.user.role) {
    this.roleErrors.push('Role must be selected');
  }
},
    async register() {
      this.validateUsername();
      this.validatePassword();
      this.validateEmail();
      this.validateRole();

      if (this.usernameErrors.length || this.passwordErrors.length || this.emailErrors.length) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', this.user);
        this.$router.push('/login');
      } catch (error) {
        this.usernameErrors = error.response.data.message.username || [];
      }
    },
  },
};
</script>
