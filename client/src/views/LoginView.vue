<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="Username" outlined></v-text-field>
              <v-text-field v-model="password" label="Password" outlined type="password"></v-text-field>
              <v-btn type="submit" color="primary" block :disabled="!isLoginFormValid">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useUserStore } from '@/store/modules/user'; 

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    isLoginFormValid() {
      return this.username.trim() !== '' && this.password.trim() !== '';
    },
  },
  methods: {
    async login() {
      try {
        const userCredentials = {
          username: this.username,
          password: this.password,
        };

        const response = await axios.post('http://localhost:3000/auth/login', userCredentials);

        console.log('Giriş Başarılı:', response.data);

        // Kullanıcı giriş yaptığında store'u güncelle
        const store = useUserStore();
        store.setUsername(response.data.username);
        store.setIsLoggedIn(true);

        this.$router.push('/'); // Anasayfa yolunu uygun bir şekilde güncelleyin
      } catch (error) {
        console.error('Giriş Hatası:', error.response.data);
      }
    },
  },
});
</script>
