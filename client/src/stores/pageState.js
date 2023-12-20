import { defineStore } from 'pinia';

const usePageStore = defineStore('pageState', {
  state: () => ({
    loading: false,
  }),

  getters: {
    isLoading: (state) => state.loading,
  },

  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
  },
});

export { usePageStore };
