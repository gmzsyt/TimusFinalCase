<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>{{$t('addcolumn')}}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="columnInfo.columnName" label="Column Name"></v-text-field>
          <v-select v-model="columnInfo.columnType" :items="columnTypes" label="Column Type"></v-select>
          <v-row v-if="!valid">
            <v-col>
              <v-alert type="error" dense outlined>
                {{$t('please')}}
              </v-alert>
            </v-col>
          </v-row>
          <v-row v-if="errorMessage">
            <v-col>
              <v-alert type="error" dense outlined>
                {{ errorMessage }}
              </v-alert>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal">{{$t('cancel')}}</v-btn>
<v-btn @click="saveChanges" color="#435334">{{$t("addcolumn")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useColumns from "@/stores/columnsStore";
import useUserStore from "../stores/userStore";

export default {
  props: {
    factory: Object,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      errorMessage: '',
      columnInfo: {
        columnName: '',
        columnType: null,
      },
      columnTypes: ['varchar(255)', 'Number', 'Date', 'Boolean'],
    };
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
    async saveChanges() {
      const column = useColumns();
      if (!this.columnInfo.columnName || !this.columnInfo.columnType) {
        this.valid = false;
        this.errorMessage = 'Please fill out all required fields.';
        return;
      }

      try {
        const userStore = useUserStore();
        const token = userStore.getToken;

        await this.$axios.post(
          `http://localhost:3000/api/factoryList/addColumnFactoryListTable`,
          {
            columnName: this.columnInfo.columnName,
            columnType: this.columnInfo.columnType,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        this.valid = true;
        this.errorMessage = '';
        this.$emit('columnAdded');
        column.getAllColumns()
        this.closeModal();
      } catch (error) {
        console.error('An error occurred while adding the column:', error);
        this.errorMessage = 'An error occurred while adding the column.';
      }
    },
  },
};
</script>
