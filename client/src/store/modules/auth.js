import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    username: '',
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