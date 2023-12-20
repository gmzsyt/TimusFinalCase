<template>
  <div>
    <NavbarComp />

    <div class="homepage">
      <h1>{{$t('welcome')}}</h1>
      <img src="@/assets/factory.webp" alt="Your Image Alt Text">
    </div>
  </div>
</template>

<script>
import NavbarComp from '@/components/NavbarComp.vue';

export default {
  components: {
    NavbarComp,
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>

<style scoped>
.homepage{
  position: relative;
  top: -550px;
}

</style>