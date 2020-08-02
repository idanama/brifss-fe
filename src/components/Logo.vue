<template>
  <div class="logo">
    <div v-if="fixed" class="logo-spacer" :class="{'logo-large':large}">
      <span class="logo-type" :class="{'logo-type-he' : $i18n.locale==='he'}">{{$t('brifss')}}</span>
      <img src="@/assets/logo.svg" class="svg-logo" />
      <div v-if="large" class="logo-subtitle">{{$t('subtitle')}}</div>
    </div>
    <div :class="{'logo-fixed' : fixed, 'logo-fixed-rtl': $i18n.locale==='he','logo-large':large}">
      <span class="logo-type" :class="{'logo-type-he' : $i18n.locale==='he'}">{{$t('brifss')}}</span>
      <img src="@/assets/logo.svg" class="svg-logo" />
      <div v-if="large" class="logo-subtitle">{{$t('subtitle')}}</div>
    </div>
  </div>
</template>
<style>
.logo {
  font-size: 2.6rem;
}
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
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 0.25rem;
  transition-duration: 0.3s;
}
.logo-fixed-rtl {
  top: 0px;
  right: 0px;
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

  transition-duration: 0.3s;
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
      type: Boolean,
    },
    large: {
      type: Boolean,
    },
  },
};
</script>