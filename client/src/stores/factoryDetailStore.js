import { defineStore } from "pinia";
import axios from "axios";
import { usePageStore } from "./pageState";
import useUserStore from "./userStore";
import useFactoryStore from "./factoryStore";
const useDetailStore = defineStore("detailStore", {
  state: () => ({
    detailItems: null,
  }),

  getters: {
    getFactoryDetailList: (state) => state.detailItems,
  },

  actions: {
    async getAllFactoryDetail() {
      const pageStore = usePageStore();
      const userStore = useUserStore();
      const factoryList = useFactoryStore();
      const detailId = factoryList.getDetailFactoryID;
      const token = userStore.getToken;

      try {
        pageStore.setLoading(true);

        const response = await axios.get(
          `/api/factoryDetail/factory/${detailId}`,
          {
            headers: {
              authorization: `Bearer ${token} `,
            },
          }
        );
        this.setFactoryDetailList(response.data);
      } catch (error) {
      } finally {
        pageStore.setLoading(false);
      }
    },
    setFactoryDetailList(detailList) {
      this.detailItems = detailList;
    },
  },
});

export default useDetailStore;
