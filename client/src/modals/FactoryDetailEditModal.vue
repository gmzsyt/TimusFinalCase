<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>{{$t('edit')}}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
             <v-row v-for="(column, index) in columns" :key="index">
    <v-col v-if="column.dataType !== 'daterange'">
      <v-text-field
        :label="`${column.columnName} ${$t('degergir')}`"
        v-model="columnValues[column.columnName]"
        :rules="[v => validateFieldType(v, column)]"
        :disabled="column.columnName === 'id' || column.columnName === 'factory_id'"
      ></v-text-field>
    </v-col>
    <v-col v-else>
      <!-- Separate text fields for start date and end date -->
      <v-text-field
        :label="`${$t('start_date')} ${$t('degergir')}`"
        v-model="columnValues['startDate']"
        :rules="[v => validateDateRange(columnValues['startDate'], columnValues['endDate'])]"
      ></v-text-field>
      <v-text-field
        :label="`${$t('end_date')} ${$t('degergir')}`"
        v-model="columnValues['endDate']"
        :rules="[v => validateDateRange(columnValues['startDate'], columnValues['endDate'])]"
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
import useDetailStore from '@/stores/factoryDetailStore';
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
      userStore: useUserStore(),
      factoryDetailStore: useDetailStore(),
    };
  },
  methods: {
    async fetchColumnMetadata() {
      const token = this.userStore.getToken;
      try {
        const response = await axios.get(
          'http://localhost:3000/api/factoryDetail/type/check/getColumnMetadataD',
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
      // Text alanları için boş olma koşulunu kaldır
      return true;

      case 'boolean':
          if (value === true || value === 'true' || value === false || value === 'false') {
          return true;
      } else {
        return 'Geçerli true veya false değerlerinden birini giriniz';
      }

    case 'date':
      // Date alanları için boş olma koşulunu kaldır
      return true;

    default:
      return true;
  }
}
,
    validateDateRange(startDate, endDate) {
  try {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (!(startDateObj instanceof Date && !isNaN(startDateObj) && endDateObj instanceof Date && !isNaN(endDateObj))) {
        throw new Error('Geçerli bir tarih aralığı giriniz.');
      }

      if (startDateObj >= endDateObj) {
        throw new Error('Başlangıç tarihi, bitiş tarihinden önce olmalıdır.');
      }
    }

    return true;
  } catch (error) {
    return error.message;
  }
},



  async saveChanges() {
  const token = this.userStore.getToken;
  const factoryDetailID = this.factoryDetail.id;

  try {
    const formValid = await this.$refs.form.validate();
    if (formValid) {
          const requestData = {
            ...this.columnValues,
            id: factoryDetailID,
          };


      for (const column of this.columns) {
        if (column.dataType === 'daterange') {
          delete requestData[column.columnName];
        }
      }

      requestData.id = factoryDetailID;

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
        this.$emit('factoryDetail-updated', {
          id: factoryDetailID,
          updatedValues: this.columnValues,
        });
        this.factoryDetailStore.getAllFactoryDetail();
        this.closeModal();
      } else {
        console.error('Fabrika güncellenirken hata oluştu. Durum:', response.status);
      }
    }
  } catch (error) {
    console.error('Değişiklikler kaydedilirken hata oluştu:', error);
  }
},


  },

watch: {
  factoryDetail: {
    immediate: true,
    async handler(newFactory) {
      await this.fetchColumnMetadata();
      this.columnValues = { ...newFactory };
    },
  },
},
};
</script>
