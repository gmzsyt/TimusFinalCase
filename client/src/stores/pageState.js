// pageState.js
import { defineStore } from 'pinia';

const usePageStore = defineStore('pageState', {
  state: () => ({
    loading: false,
    // Diğer sayfa ile ilgili durumları ekleyin, ihtiyaca bağlı olarak
  }),

  getters: {
    isLoading: (state) => state.loading,
    // Diğer gerekirse getter'ları ekleyin
  },

  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    // Diğer gerekirse action'ları ekleyin
  },
});

export { usePageStore };
