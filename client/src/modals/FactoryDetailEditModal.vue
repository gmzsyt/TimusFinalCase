<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Edit Factory Detail</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row v-for="(column, index) in columns" :key="index">
              <v-col v-if="column !== 'date_range'">
                <v-text-field
                  :label="`${column} değerini girin`"
                  v-model="columnValues[column]"
                  :rules="[v => validateFieldType(v, column)]"
                  :disabled="column === 'id'"
                ></v-text-field>
              </v-col>
              <v-col v-else>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Start Date"
                      v-model="columnValues.start_date"
                      :rules="[v => validateStartDate(v)]"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="End Date"
                      v-model="columnValues.end_date"
                      :rules="[v => validateEndDate(v)]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal">Cancel</v-btn>
        <v-btn @click="saveChanges" color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import useUserStore from '@/stores/userStore';
import axios from 'axios';

export default {
  props: {
    factoryDetail: Object,
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
    factoryDetail: {
      immediate: true,
      handler(newFactoryDetail) {
        this.columns = newFactoryDetail ? Object.keys(newFactoryDetail) : [];
        this.columnValues = { ...newFactoryDetail };
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

    validateStartDate(value) {
      return value ? true : 'Başlangıç tarihi zorunludur.';
    },

    validateEndDate(value) {
      return value ? true : 'Bitiş tarihi zorunludur.';
    },

    async saveChanges() {
      const userStore = useUserStore();
      const token = userStore.getToken;
      const factoryDetailID = this.factoryDetail.id;

      try {
        const formValid = await this.$refs.form.validate();
        if (formValid) {
          if (this.columns.includes('date_range')) {
        const [startDate, endDate] = this.columnValues.date_range
          .replace("[", "")
          .replace(")", "")
          .split(",");
          
        this.columnValues.start_date = startDate.trim();
        this.columnValues.end_date = endDate.trim();
      }
   
          const requestData = {
            ...this.columnValues,
            id: factoryDetailID,
          };

          const response = await axios.put(
            `http://localhost:3000/api/factoryDetail/${factoryDetailID}`,
            requestData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            this.$emit('factoryDetail-updated', { id: factoryDetailID, updatedValues: this.columnValues });
            this.closeModal();
          } else {
            console.error('Failed to update factory detail. Status:', response.status);
          }
        }
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },
  },
};
</script>
