<template>
  <div class="logo-type">
    <div v-if="fixed" class="logo-spacer" :class="{'logo-large':large}">
      <span>Brifss</span>
      <img src="@/assets/logo.svg" class="svg-logo" />
    </div>
    <div :class="{'logo-fixed' : fixed , 'logo-large':large}">
      <span>Brifss</span>
      <img src="@/assets/logo.svg" class="svg-logo" />
    </div>
  </div>
</template>
<style>
.svg-logo {
  display: inline-block;
  align-self: center;
  height: 0.9em;
  width: 0.9em;
  top: 0.2em;
  position: relative;
}
.logo-fixed {
  z-index: 10;
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 0.25rem;
  transition-duration: 0.3s;
}
.logo-spacer {
  visibility: hidden;
  padding: 0.25rem;
  transition-duration: 0.3s;
}
.logo-large {
  font-size: 4rem;
  padding: 1rem;
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