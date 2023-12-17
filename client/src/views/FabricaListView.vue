<template>
  <div>
    <Navbar />
    <h1 class="text-center mt-5">Fabrica List Page</h1>

    <v-container class="d-flex align-center justify-center" fluid>
      <v-table>
        <thead>
          <tr>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Firma Adı</th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Üyelik Tarihi</th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Üyelik Bitiş Tarihi</th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Çalışan Sayısı</th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Free Üye</th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Name</th>
            <th class="text-left" style="background-color: #CEDEBD; color: white;">Calories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fabrica, index) in fabricaList" :key="index" style="background-color: #9EB384;">
            <td>{{ fabrica.firmaAdi }}</td>
            <td>{{ fabrica.uyelikTarihi }}</td>
            <td>{{ fabrica.uyelikBitisTarihi }}</td>
            <td>{{ fabrica.calisanSayisi }}</td>
            <td>{{ fabrica.freeUye }}</td>
            <td>{{ desserts[index].name }}</td>
            <td>{{ desserts[index].calories }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/NavbarComp.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      fabricaList: [
        {
          firmaAdi: 'Firma 1',
          uyelikTarihi: '2023-01-01',
          uyelikBitisTarihi: '2024-01-01',
          calisanSayisi: 100,
          freeUye: false,
        },
        {
          firmaAdi: 'Firma 2',
          uyelikTarihi: '2023-02-01',
          uyelikBitisTarihi: '2024-02-01',
          calisanSayisi: 50,
          freeUye: true,
        },
        // ... Diğer fabrikalar
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },
};
</script>
