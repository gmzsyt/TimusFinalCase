import { defineStore } from 'pinia';
import axios from 'axios';
import { usePageStore } from './pageState';

const useUserStore = defineStore('userStore', {
  state: () => ({
    userId: null,
    userName: null,
    refreshToken: null,
    isLogin: false,
    token :localStorage.getItem('token') || null,

  }),

  getters: {
    getUserId: (state) => state.userId,
    getUserName: (state) => state.userName,
    getRefreshToken: (state) => state.refreshToken,
    isLoggedIn: (state) => state.isLogin,  
    getToken: (state) => state.token
  },

  actions: {  
    async login(email, password) {
      const pageStore = usePageStore();


      try {
        pageStore.setLoading(true);
        const response = await axios.post('/api/auth/login', {
          username: email,
          password: password,
        });
        this.setUserData(response.data);
        localStorage.setItem('token', response.data.accessToken);
      } catch (error) {
        console.error('Giriş başarısız:', error.message);
      } finally {
        pageStore.setLoading(false);
      }
    },
    setUserData(userData) {
      this.userId = userData.userId;
      this.userName = userData.username;
      this.refreshToken = userData.refreshToken;
      this.isLogin = true;
      this.token = userData.accessToken;

    },
    logout() {
      this.userId = null;
      this.userName = null;
      this.refreshToken = null;
      this.isLogin = false;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});

export default useUserStore;