<template>
  <div id="app">
    <Logo :fixed="true" :large="true" />
    <router-view />
    <Navbar />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Navbar,
    Logo
  }
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
</style>
