<!-- FactoryListEditModal.vue -->
<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Factory</v-card-title>
        <v-card-text>
          <!-- Your form fields for editing -->
          <!-- For example, you can use v-text-field or v-date-picker for input fields -->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn @click="saveChanges" color="primary">Save Changes</v-btn>
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
      };
    },
    methods: {
      closeModal() {
        this.dialog = false;
      },
      saveChanges() {
        // Add logic to save changes here
        this.closeModal();
      },
    },
  };
  </script>
  