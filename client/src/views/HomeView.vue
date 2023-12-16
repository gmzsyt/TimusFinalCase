<template>
  <div>
    <!-- Diğer bileşen içeriği buraya gelebilir -->

    <!-- Yeni bileşeni çağırma -->
    <NavbarComp />
  </div>
</template>

<script>
// YourComponent bileşenini içeri aktarın
import NavbarComp from '@/components/NavbarComp.vue';

export default {
  components: {
    NavbarComp,
  },
  // Diğer bileşen özellikleri ve metotları buraya gelebilir
};
</script>

<style scoped>
/* Diğer bileşen özel stilleri buraya gelebilir */
</style>
