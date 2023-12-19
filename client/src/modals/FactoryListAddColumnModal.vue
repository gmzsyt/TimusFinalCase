  <!-- FactoryListAddColumnModal.vue -->
  <template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add Column to Factory List</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
  <v-text-field v-model="columnInfo.columnName" label="Column Name"></v-text-field>
  <v-select v-model="columnInfo.columnType" :items="columnTypes" label="Column Type"></v-select>
  <v-messages v-if="!valid">
    <v-row>
      <v-col>
        <v-message error>Please fill out all required fields.</v-message>
      </v-col>
    </v-row>
  </v-messages>
</v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn @click="saveChanges" color="primary" :disabled="!valid">Add Column</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script>

import useUserStore from "../stores/userStore";

  export default {
    props: {
      factory: Object,
    },
    data() {
      return {
        dialog: false,
        valid: true,
        columnInfo: {
          columnName: '',
          columnType: null,
        },
        columnTypes: ['varchar(255)', 'Number', 'Date'],
      };
    },
    
    methods: {
      closeModal() {
        this.dialog = false;
      },
      async saveChanges() {
  if (!this.columnInfo.columnName || !this.columnInfo.columnType) {
    this.valid = false;
    return;
  }

  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    await this.$axios.post(`http://localhost:3000/api/factoryList/addColumnFactoryListTable`, {
  columnName: this.columnInfo.columnName,
  columnType: this.columnInfo.columnType,
}, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

    

    this.valid = true;
    this.$emit('columnAdded');
    this.closeModal();
  } catch (error) {
    console.error('An error occurred while adding the column:', error);
  }

  
}
    },
  };
  </script>
