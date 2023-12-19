import { defineStore } from "pinia";
import axios from "axios";
import { usePageStore } from "./pageState";
import useUserStore from "./userStore";
const useColumns = defineStore("columnStore", {
  state: () => ({
    columns: null,
  }),

  getters: {
    getColumns: (state) => state.columns,
  },

  actions: {
    async getAllColumns() {
      const pageStore = usePageStore();
      const userStore = useUserStore();
      const token = userStore.getToken;

      try {
        pageStore.setLoading(true);

        const response = await axios.get(
          `http://localhost:3000/api/factoryList/getColumnNames`,
          {
            headers: {
              authorization: `Bearer ${token} `,
            },
          }
        );
        this.setColumns(response.data);
      } catch (error) {
        console.error("Giriş başarısız:", error.message);
      } finally {
        pageStore.setLoading(false);
      }
    },
    setColumns(columnsList) {
      this.columns = columnsList;
    },
  },
});

export default useColumns;
