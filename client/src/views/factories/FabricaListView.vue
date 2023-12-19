<template>
  <div>
    <Navbar />
    <h1 class="text-center mt-5">Factory List Page</h1>

    <v-container class="d-flex align-center justify-center" fluid>
      <v-btn @click="openAddColumnModal">Add Column</v-btn>
     
      <v-table>
        <thead>
          <tr>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">
              company name
            </th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">
              membership date
            </th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">
              membership expiration date 
            </th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">
              number of employees
            </th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">
              free member
            </th>
            <!-- Add new column headers dynamically -->
            <th v-for="(column, columnIndex) in newColumns" :key="columnIndex" class="text-left" style="background-color: #CEDEBD; color: white;">
              {{ column.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factory, index) in factoryList" :key="index" style="background-color: #9EB384;">
            <td>{{ factory.company_name }}</td>
            <td>{{ factory.membership_start_date }}</td>
            <td>{{ factory.membership_end_date }}</td>
            <td>{{ factory.employee_count }}</td>
            <td>{{ factory.free_member }}</td>
            <!-- Display new columns dynamically -->
            <td v-for="(column, columnIndex) in newColumns" :key="columnIndex">
              {{ factory[column.name] }}
            </td>
            <td>
              <v-btn @click="goToDetail(index)">View Details</v-btn>
            </td>
            <!-- Add the "Edit" button here -->
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
    <factory-list-add-column-modal ref="addColumnModal" @save-changes="addColumn"></factory-list-add-column-modal>

  </div>
</template>

<script>
import Navbar from '@/components/NavbarComp.vue';
import FactoryListEditModal from '@/modals/FactoryListEditModal.vue';
import FactoryListAddColumnModal from '@/modals/FactoryListAddColumnModal.vue';
import useFactoryStore from '@/stores/factoryStore';


export default {
  components: {
    Navbar,
    FactoryListEditModal,
    FactoryListAddColumnModal,
  },
  data() {
    return {
      factoryList : [],
      selectedFactory: null,
    };
  },

  setup() {
    const factoryStore = useFactoryStore();
     factoryStore.getAllFactoryList();
     const factoryList = factoryStore.getFactoryList;
    return {
      factoryList,
    };
  },
  methods: {
    goToDetail(index) {
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
      this.newColumns.push(newColumn);
      this.factoryList.forEach(factory => {
        this.$set(factory, newColumn.name, null);
      });
    },
    openAddColumnModal() {
      this.$refs.addColumnModal.dialog = true;
    },
  },
};
</script>
