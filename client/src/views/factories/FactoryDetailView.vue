<template>
  <div >
    <Navbar />
    <div class="harrypotter">
    <h1 class="text-center mt-5">{{$t('FactoryDetailPage')}}</h1>

    <v-alert v-if="addColumnSuccess" type="success" title="Column Added"
      text="The column has been added successfully."></v-alert>

    <v-alert v-if="deleteColumnSuccess" type="success" title="Column Deleted"
      text="The column has been deleted successfully."></v-alert>

     <v-container class="d-flex align-center justify-center" fluid>

      <v-table>
        <thead>
          <tr>
            <th v-for="(column, columnIndex) in columnsList" :key="columnIndex" class="text-left"
              style="background-color: #435334; color: white;">
              {{ column }}
              <v-btn color=#435334 @click="deleteColumn(column)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </th>
            <th>
          <v-btn @click="openAddColumnModal">{{$t('addcolumn')}}</v-btn> 
            </th> 
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factoryDetail, index) in factoryDetailList" :key="index" style="background-color: #9EB384;">
            <td v-for="(value, key) in factoryDetail" :key="key">
              {{ value }}
            </td>
            <td>
              <v-btn @click="openEditModal(factoryDetail)">{{$t('edit')}}</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>

    <factory-detail-edit-modal :factoryDetail="selectedFactory" ref="editModal" @factoryDetail-updated="factoryDetailUpdated"></factory-detail-edit-modal>

    <factory-detail-add-column-modal ref="addColumnModal" @save-changes="addColumn"></factory-detail-add-column-modal>
  </div>
  </div>
</template>


<script>
import Navbar from '@/components/NavbarComp.vue';
import FactoryDetailEditModal from '@/modals/FactoryDetailEditModal.vue';
import FactoryDetailAddColumnModal from '@/modals/FactoryDetailAddColumnModel.vue';
import useDetailStore from '@/stores/factoryDetailStore';
import useColumns from '@/stores/columnsDetailStore';
import { ref, onMounted, watchEffect } from 'vue';
import useUserStore from '@/stores/userStore';
import axios from 'axios';


export default {
  components: {
    Navbar,
    FactoryDetailEditModal,
    FactoryDetailAddColumnModal
  },
  data() {
    return {
      selectedFactory: null,
      addColumnSuccess: false,
      deleteColumnSuccess: false,
    };
  },
  setup() {
    const factoryDetailStore = useDetailStore();
    const columnStore = useColumns();
    const factoryDetailList = ref(factoryDetailStore.getFactoryDetailList);
    const columnsList = ref(columnStore.getColumns);
    onMounted(() => {

      factoryDetailStore.getAllFactoryDetail();
      columnStore.getAllColumnsDetail();
    });

    watchEffect(() => {
      factoryDetailList.value = factoryDetailStore.getFactoryDetailList;
      columnsList.value = columnStore.getColumnsDetail;
    });
    return {
      factoryDetailList,
      columnsList,
    };
  },
  methods: {
    openEditModal(factoryDetail) {
      this.selectedFactory = factoryDetail;
      this.$refs.editModal.dialog = true;
    },

    addColumn(newColumn) {
      this.$set(this.columnsList, this.columnsList.length, newColumn);
      this.factoryDetailList.forEach(factoryDetail => {
        this.$set(factoryDetail, newColumn.name, null);
      });
      this.addColumnSuccess = true;
      setTimeout(() => {
        this.addColumnSuccess = false;
      }, 2000);
    },

    async deleteColumn(columnName) {
      try {
        const userStore = useUserStore();
        const token = userStore.getToken;
        await axios.delete(`/api/factoryDetail/removeColumnFactoryDetailTable/${columnName}`, {
          headers: {
            authorization: `Bearer ${token} `,
          },
        });
        const columnIndex = this.columnsList.indexOf(columnName);
        if (columnIndex !== -1) {
          this.columnsList.splice(columnIndex, 1);
          this.factoryDetailList.forEach(factory => {
            delete factory[columnName];
          });
          this.deleteColumnSuccess = true;
          setTimeout(() => {
            this.deleteColumnSuccess = false;
          }, 2000);
        }
      } catch (error) {
        console.error('An error occurred while removing the column:', error);
      }
    },

    openAddColumnModal() {
      this.$refs.addColumnModal.dialog = true;
    },
  },
};
</script>
<style scoped>
.harrypotter{
  position: relative;
  top: -600px;
}

</style>