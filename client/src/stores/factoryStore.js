import { defineStore } from "pinia";
import axios from "axios";
import { usePageStore } from "./pageState";
import useUserStore from "./userStore";

const useFactoryStore = defineStore("factoryStore", {
  state: () => ({
    factoryList: [],
    detailId: null,
  }),

  getters: {
    getFactoryList: (state) => state.factoryList,
    getDetailFactoryID:(state)=>state.detailId
  },

  actions: {
    async getAllFactoryList() {
      const pageStore = usePageStore();
      const userStore = useUserStore();
      const token = userStore.getToken;


      try {
        pageStore.setLoading(true);

        const response = await axios.get(
          "http://localhost:3000/api/factoryList",
          {
            headers: {
              authorization: `Bearer ${token} `,
            },
          }
        );
        this.setFactoryList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Giriş başarısız:", error.message);
      } finally {
        pageStore.setLoading(false);
      }
    },
    setFactoryList(factoryList) {
      this.factoryList = factoryList;
    },
    setDetailId(id) {
      this.detailId = id;
      console.log("Factory Detail id ",id);
    },
  },
});

export default useFactoryStore;