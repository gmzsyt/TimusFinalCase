import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername(username) {
      this.state.username = username; // Düzeltme
    },
  },
});