<template>
  <div>
    <div v-if="fixed" class="logo-spacer" :class="{'logo-large':large}">
      <span class="logo-type">Brifss</span>
      <img src="@/assets/logo.svg" class="svg-logo" />
      <div v-if="large" class="logo-subtitle">The tldr news aggregator.</div>
    </div>
    <div :class="{'logo-fixed' : fixed, 'logo-large':large}">
      <span class="logo-type">Brifss</span>
      <img src="@/assets/logo.svg" class="svg-logo" />
      <div v-if="large" class="logo-subtitle">The tldr news aggregator.</div>
    </div>
  </div>
</template>
<style>
.svg-logo {
  display: inline-block;
  align-self: center;
  height: 0.9em;
  width: 0.9em;
  /* top: 0.11em; */
  position: relative;
}
.logo-fixed {
  z-index: 10;
  /* display: flex; */
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 0.25rem;
  transition-duration: 0.3s;
}
.logo-spacer {
  visibility: hidden;
  /* display: flex; */

  padding: 0.25rem;
  transition-duration: 0.3s;
}
.logo-large {
  font-size: 4rem;
  padding: 1rem;
}
.logo-type {
  /* line-height: 1; */
}
.logo-subtitle {
  font-size: 1rem;
}
</style>

<script>
export default {
  name: "Logo",
  props: {
    fixed: {
      type: Boolean
    },
    large: {
      type: Boolean
    }
  }
};
</script>