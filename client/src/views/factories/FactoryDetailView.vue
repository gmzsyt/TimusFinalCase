<template>
    <div>
      <Navbar />
      <h1 class="text-center mt-5">Fabrica List Page</h1>
  
      <v-container class="d-flex align-center justify-center" fluid>
        <v-table>
          <thead>
            <tr>
              <th class="text-left" style="background-color: #CEDEBD; color: white;">Unit Used</th> 
              <th class="text-left" style="background-color: #CEDEBD; color: white;">Date Range</th>
              <th class="text-left" style="background-color: #CEDEBD; color: white;">Usage(kw)</th>
              <th class="text-left" style="background-color: #CEDEBD; color: white;">Usage Fee</th>
              <th class="text-left" style="background-color: #CEDEBD; color: white;">Discounted Price</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(factory, index) in factoryDetailList" :key="index" style="background-color: #9EB384;">
              <td>{{ factory.using_unit }}</td>
              <td>{{ factory.date_range }}</td>
              <td>{{ factory.usage_kw }}</td>
              <td>{{ factory.usage_fee }}</td>
              <td>{{ factory.discounted_price}}</td>
              <td>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/NavbarComp.vue';
  import useDetailStore from '@/stores/factoryDetailStore';
  import { ref, onMounted, watchEffect } from 'vue';

  
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
      };
    },
    setup() {
    const detailStore = useDetailStore();
    const factoryDetailList = ref(detailStore.getFactoryDetailList)

    onMounted(() => {
    detailStore.getAllFactoryDetail();
  });
  
  watchEffect(() => {
    factoryDetailList.value = detailStore.getFactoryDetailList;
  });

    return {
      factoryDetailList,
    };
  },

  
    methods: {
    },
  };
  </script>
  