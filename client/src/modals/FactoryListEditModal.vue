<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Fabrikayı Düzenle</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <!-- Fabrika özellikleri için döngü -->
            <v-row v-for="(column, index) in columns" :key="index">
              <v-col>
                <!-- Kullanıcıdan gelen verileri bağla -->
                <v-text-field
                  :label="`${column} değerini girin`"
                  v-model="columnValues[column]"
                  :rules="[v => validateFieldType(v, column)]"
                  :disabled="column === 'id'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- İptal butonu -->
        <v-btn @click="closeModal">İptal</v-btn>
        <!-- Değişiklikleri kaydet butonu -->
        <v-btn @click="saveChanges" color="primary" :disabled="!valid">Değişiklikleri Kaydet</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useUserStore from '@/stores/userStore';
import axios from 'axios';

export default {
  props: {
    factory: Object,
  },
  data() {
    return {
      dialog: false,
      columns: [],
      columnValues: {},
      valid: false, // Form validation state
    };
  },
  watch: {
    factory: {
      immediate: true,
      handler(newFactory) {
        this.columns = newFactory ? Object.keys(newFactory) : [];
        this.columnValues = { ...newFactory };
      },
    },
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },

    validateFieldType(value, column) {
      // Add custom validation logic for each field type
      if (column === 'age') {
        // Example: Check if the age is a number
        return /^[0-9]+$/.test(value) || 'Lütfen geçerli bir yaş girin.';
      }
      // Add more custom validation logic for other fields if needed

      // Default to true if no specific validation is defined
      return true;
    },

    async saveChanges() {
      const userStore = useUserStore();
      const token = userStore.getToken;
      const factoryID = this.factory.id;

      try {
        // Validate the form before making the request
        const formValid = await this.$refs.form.validate();
        if (formValid) {
          // Explicitly set "id" in the request payload
          const requestData = {
            ...this.columnValues,
            id: factoryID,
          };

          const response = await axios.put(
            `http://localhost:3000/api/factoryList/${factoryID}`,
            requestData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          // Check if the update was successful
          if (response.status === 200) {
            this.$emit('factory-updated', { id: factoryID, updatedValues: this.columnValues });

            // Close the dialog
            this.closeModal();
          } else {
            console.error('Failed to update factory. Status:', response.status);
          }
        }
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },
  },
};
</script>
