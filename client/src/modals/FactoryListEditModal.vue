<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Edit Factory</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row v-for="(column, index) in columns" :key="index">
              <v-col>
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
        <v-btn @click="closeModal">Cancel</v-btn>
        <v-btn @click="saveChanges" color="primary" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useFactoryStore from '@/stores/factoryStore';
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
      valid: false, 
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
      if (column === 'age') {
        return /^[0-9]+$/.test(value) || 'Lütfen geçerli bir yaş girin.';
      }
   
      return true;
    },

    async saveChanges() {
      const userStore = useUserStore();
      const factoryStore=useFactoryStore()
      const token = userStore.getToken;
      const factoryID = this.factory.id;

      try {
        const formValid = await this.$refs.form.validate();
        if (formValid) {
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

          if (response.status === 200) {
            this.$emit('factory-updated', { id: factoryID, updatedValues: this.columnValues });
            factoryStore.getAllFactoryList()
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
