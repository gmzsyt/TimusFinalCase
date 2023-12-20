<template>
  <div>
    <Navbar />
    <h1 class="text-center mt-5">Factory List Page</h1>

    <v-alert
      v-if="addColumnSuccess"
      type="success"
      title="Column Added"
      text="The column has been added successfully."
    ></v-alert>

    <v-alert
      v-if="deleteColumnSuccess"
      type="success"
      title="Column Deleted"
      text="The column has been deleted successfully."
    ></v-alert>

    <v-container class="d-flex align-center justify-center" fluid>
      <v-btn @click="openAddColumnModal">Add Column</v-btn>

      <v-table>
        <thead>
          <tr>
            <th v-for="(column, columnIndex) in columnsList" :key="columnIndex" class="text-left" style="background-color: #CEDEBD; color: white;">
              {{ column }}
              <!-- Add the delete button with icon next to each column name -->
              <v-btn @click="deleteColumn(column)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factory, index) in factoryList" :key="index" style="background-color: #9EB384;">
            <td v-for="(column, columnIndex) in columnsList" :key="columnIndex">
              {{ factory[column] }}
            </td>
            <td>
              <v-btn @click="goToDetail(index, factory.id)">View Details</v-btn>
            </td>
            <td>
              <v-btn @click="editRow(index)">Edit</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>

    <!-- Add the FactoryListEditModal component -->
    <factory-list-edit-modal :factory="selectedFactory" ref="editModal" @save-changes="saveChanges"></factory-list-edit-modal>

    <!-- Add the FactoryListAddColumnModal component -->
    <factory-list-add-column-modal ref="addColumnModal" @save-changes="addColumn"></factory-list-add-column-modal>
  </div>
</template>

<script>
import Navbar from '@/components/NavbarComp.vue';
import FactoryListEditModal from '@/modals/FactoryListEditModal.vue';
import FactoryListAddColumnModal from '@/modals/FactoryListAddColumnModal.vue';
import useFactoryStore from '@/stores/factoryStore';
import useColumns from '@/stores/columnsStore';
import { ref, onMounted, watchEffect } from 'vue';
import useUserStore from '@/stores/userStore';
import axios from 'axios';

export default {
  components: {
    Navbar,
    FactoryListEditModal,
    FactoryListAddColumnModal,
  },
  data() {
    return {
      selectedFactory: null,
      addColumnSuccess: false,
      deleteColumnSuccess: false,
    };
  },
  setup() {
    const factoryStore = useFactoryStore();
    const columnStore = useColumns();
    const factoryList = ref(factoryStore.getFactoryList);
    const columnsList = ref(columnStore.getColumns);

    onMounted(() => {
      factoryStore.getAllFactoryList();
      columnStore.getAllColumns();
    });

    watchEffect(() => {
      factoryList.value = factoryStore.getFactoryList;
      columnsList.value = columnStore.getColumns;
      console.log('columnsList changed. Re-rendering...');
    });

    return {
      factoryList,
      columnsList,
    };
  },
  methods: {
    goToDetail(index, id) {
      const factoryStore = useFactoryStore();
      factoryStore.setDetailId(id);
      this.$router.push('/detail');
    },
    editRow(index) {
      this.selectedFactory = { ...this.factoryList[index] };
      this.$refs.editModal.dialog = true;
    },
    saveChanges(updatedFactory) {
      const index = this.factoryList.findIndex(f => f.companyName === updatedFactory.companyName);
      if (index !== -1) {
        this.$set(this.factoryList, index, { ...updatedFactory });
      }
    },
    addColumn(newColumn) {
      this.$set(this.columnsList, this.columnsList.length, newColumn);
      this.factoryList.forEach(factory => {
        this.$set(factory, newColumn.name, null);
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
        await axios.delete(`http://localhost:3000/api/factoryList/removeColumnFactoryListTable/${columnName}`, {
          headers: {
            authorization: `Bearer ${token} `,
          },
        });
        const columnIndex = this.columnsList.indexOf(columnName);
        if (columnIndex !== -1) {
          this.columnsList.splice(columnIndex, 1);
          this.factoryList.forEach(factory => {
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