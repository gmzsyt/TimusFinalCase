<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>{{$t('edit')}}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row v-for="(column, index) in columns" :key="index">
              <v-col>
                <v-text-field
                :label="`${column.columnName} ${$t('degergir')}`"
                  v-model="columnValues[column.columnName]"
                  :rules="[v => validateFieldType(v, column)]"
                  :disabled="column.columnName === 'id'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal">{{$t("cancel")}}</v-btn>
        <v-btn @click="saveChanges" :color="'#435334'">{{$t("save")}}</v-btn>
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
      userStore: useUserStore(),
      factoryStore: useFactoryStore(),
    };
  },
  methods: {
    async fetchColumnMetadata() {
      const token = this.userStore.getToken;
      try {
        const response = await axios.get(
          'http://localhost:3000/api/factoryList/type/check/getColumnMetadata',
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        this.columns = response.data;
      } catch (error) {
        console.error('Error fetching column metadata:', error);
      }
    },

    closeModal() {
      this.dialog = false;
    },

    validateFieldType(value, column) {
      const columnMetadata = this.columns.find((c) => c.columnName === column.columnName);
      if (!columnMetadata) {
        return 'Sütun metadatası bulunamadı.';
      }

      const dataType = columnMetadata.dataType;

      switch (dataType) {
        case 'integer':
          if (/^\d+$/.test(value)) {
            let integerValue = parseInt(value, 10);
            return true; 
          } else {
            return 'Geçerli bir tamsayı giriniz.'; 
          }
        case 'text':
          return value.trim() !== '' || 'Bu alan boş bırakılamaz.';

          case 'boolean':
          if (value === true || value === 'true' || value === false || value === 'false') {
          return true;
        } else {
          return 'Geçerli true veya false değerlerinden birini giriniz';
        }

          case 'date':
      return this.validateDateFormat(value);

        default:
          return true;
      }
    },

    validateDateFormat(value) {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Geçerli bir tarih giriniz.');
    }
    return true;
  } catch (error) {
    return 'Geçerli bir tarih giriniz. Örneğin: YYYY-MM-DDTHH:mm:ss.sssZ';
  }
},


    async saveChanges() {
      const token = this.userStore.getToken;
      const factoryID = this.factory.id;

      try {
        const formValid = await this.$refs.form.validate();
        if (formValid) {
          const requestData = {
            ...this.columnValues,
            id: factoryID,
          };

          const response = await axios.put(`http://localhost:3000/api/factoryList/${factoryID}`, requestData, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            this.$emit('factory-updated', { id: factoryID, updatedValues: this.columnValues });
            this.factoryStore.getAllFactoryList();
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

  watch: {
    factory: {
      immediate: true,
      handler(newFactory) {
        this.fetchColumnMetadata();
        this.columnValues = { ...newFactory };
      },
    },
  },
};
</script>
