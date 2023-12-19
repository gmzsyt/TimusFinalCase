import { defineStore } from 'pinia';
import axios from 'axios';
import { usePageStore } from './pageState';
import useUserStore from './userStore';

const useFactoryStore = defineStore('factoryStore', {
  state: () => (({
    factoryList: [],
  })),

  getters: { 
    getFactoryList: (state) => state.factoryList
  },

  actions: {  

    async getAllFactoryList() {
        const pageStore = usePageStore();
        const userStore = useUserStore();
        const token = userStore.getToken;
        console.log(token)

        try{
            pageStore.setLoading(true);
    
            const response = await axios.get('http://localhost:3000/api/factoryList',{headers: {
                authorization: `Bearer ${token} `,
              },});
            console.log(response.data); 
                this.setFactoryList(response.data);

        } catch (error) {
            console.error('Giriş başarısız:', error.message);
          } finally {
            pageStore.setLoading(false);
          }
    },
    setFactoryList(factoryList) {
      this.factoryList = factoryList;
    },

  },
});

export default useFactoryStore;
