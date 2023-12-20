import { defineStore } from "pinia";
import axios from "axios";
import { usePageStore } from "./pageState";
import useUserStore from "./userStore";
const useColumnsDetail = defineStore("columnDetailStore", {
  state: () => ({
    columnsDetail: null,
  }),

  getters: {
    getColumnsDetail: (state) => state.columnsDetail,
  },

  actions: {
    async getAllColumnsDetail() {
      const pageStore = usePageStore();
      const userStore = useUserStore();
      const token = userStore.getToken;

      try {
        pageStore.setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/factoryDetail/getColumnNamesFactoryDetailTable`,
          {
            headers: {
              authorization: `Bearer ${token} `,
            },
          }
        );
        this.setColumnsDetail(response.data);
      } catch (error) {
        console.error("Giriş başarısız:", error.message);
      } finally {
        pageStore.setLoading(false);
      }
    },
    setColumnsDetail(columnsList) {
      this.columnsDetail = columnsList;
    },
  },
});

export default useColumnsDetail;
