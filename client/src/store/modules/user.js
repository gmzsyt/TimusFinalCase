import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',

    isLoggedIn: false, // Eğer kullanıcının oturum açık olup olmadığını takip etmek istiyorsanız
  }),
  actions: {
    setUsername(username) {
      this.state.username = username;
    },
    setIsLoggedIn(isLoggedIn) {
      this.state.isLoggedIn = isLoggedIn;
    },
  },
});