<template>
  <div>
    <Navbar />
    <h1 class="text-center mt-5">Factory Detail Page</h1>

    <v-alert v-if="addColumnSuccess" type="success" title="Column Added"
      text="The column has been added successfully."></v-alert>

    <v-alert v-if="deleteColumnSuccess" type="success" title="Column Deleted"
      text="The column has been deleted successfully."></v-alert>

     <v-container class="d-flex align-center justify-center" fluid>

      <v-table>
        <thead>
          <tr>
            <th v-for="(column, columnIndex) in columnsList" :key="columnIndex" class="text-left"
              style="background-color: #CEDEBD; color: white;">
              {{ column }}
            </th>
            <th>
          <v-btn @click="openAddColumnModal">Add Column</v-btn> 
            </th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factoryDetail, index) in factoryDetailList" :key="index" style="background-color: #9EB384;">
            <td v-for="(value, key) in factoryDetail" :key="key">
              {{ value }}
            </td>
            <td>
              <v-btn @click="openEditModal(factoryDetail)">Edit</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>

    <factory-detail-edit-modal :factoryDetail="selectedFactory" ref="editModal" @factoryDetail-updated="factoryDetailUpdated"></factory-detail-edit-modal>

    <factory-detail-add-column-modal ref="addColumnModal" @save-changes="addColumn"></factory-detail-add-column-modal>
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

    // async deleteColumn(columnName) {
    //   try {
    //     const userStore = useUserStore();
    //     const token = userStore.getToken;
    //     await axios.delete(`http://localhost:3000/api/factoryDetail/removeColumnFactoryDetailTable/${columnName}`, {
    //       headers: {
    //         authorization: `Bearer ${token} `,
    //       },
    //     });
    //     const columnIndex = this.columnsList.indexOf(columnName);
    //     if (columnIndex !== -1) {
    //       this.columnsList.splice(columnIndex, 1);
    //       this.factoryDetailList.forEach(factoryDetail => {
    //         delete factoryDetail[columnName];
    //       });
    //       this.deleteColumnSuccess = true;
    //       setTimeout(() => {
    //         this.deleteColumnSuccess = false;
    //       }, 2000);
    //     }
    //   } catch (error) {
    //     console.error('An error occurred while removing the column:', error);
    //   }
    // },

    openAddColumnModal() {
      console.log('Add Column button clicked!');
      this.$refs.addColumnModal.dialog = true;
      console.log(this.$refs.addColumnModal)
    },
  },
};
</script>
