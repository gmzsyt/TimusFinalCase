import { defineStore } from 'pinia';
import axios from 'axios';
import { usePageStore } from './pageState';

const useUserStore = defineStore('userStore', {
  state: () => ({
    userId: null,
    userName: null,
    refreshToken: null,
    isLogin: false,
  }),

  getters: {
    getUserId: (state) => state.userId,
    getUserName: (state) => state.userName,
    getRefreshToken: (state) => state.refreshToken,
    isLoggedIn: (state) => state.isLogin,  
  },

  actions: {  
    async login(email, password) {
      const pageStore = usePageStore();
      

      try {
        pageStore.setLoading(true);

        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: email,
          password: password,
        });
        this.setUserData(response.data);
      } catch (error) {
        console.error('Giriş başarısız:', error.message);
      } finally {
        pageStore.setLoading(false);
      }
    },
    setUserData(userData) {
      this.userId = userData.userId;
      this.userName = userData.userName;
      this.refreshToken = userData.refreshToken;
      this.isLogin = true;

    },
    logout() {
      this.userId = null;
      this.userName = null;
      this.refreshToken = null;
    },
  },
});

export default useUserStore;
