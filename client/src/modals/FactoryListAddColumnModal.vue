<!-- FactoryListAddColumnModal.vue -->
<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add Column to Factory List</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="newColumn.name" label="Column Name"></v-text-field>
            <v-select
              v-model="newColumn.type"
              :items="columnTypes"
              label="Column Type"
            ></v-select>
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
  export default {
    props: {
      factory: Object,
    },
    data() {
      return {
        dialog: false,
        valid: true,
        newColumn: {
          name: '',
          type: null,
        },
        columnTypes: ['Text', 'Number', 'Date'],
      };
    },
    methods: {
      closeModal() {
        this.dialog = false;
      },
      saveChanges() {
        // Add logic to save changes here
        // Burada yeni sütunu tabloya eklemek için bir işlem yapılabilir
        // Bu işlemi ana bileşende (Factory List Page) yönetmek daha uygun olabilir.
        this.closeModal();
      },
    },
  };
  </script>
  