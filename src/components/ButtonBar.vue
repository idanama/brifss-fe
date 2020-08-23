<template>
  <div class="button-bar">
    <div @click="$emit('cardLeft')" class="button is-circle">
      <img src="@/assets/icons/x.svg" rel="preload" />
    </div>
    <div @click="$emit('cardUp')" class="button is-circle">
      <img src="@/assets/icons/thumbs-up.svg" rel="preload" />
    </div>
    <div @click="$emit('cardDown')" class="button is-circle">
      <img src="@/assets/icons/thumbs-down.svg" rel="preload" />
    </div>
    <div @click="$emit('cardRight')" class="button is-circle">
      <img src="@/assets/icons/book-open.svg" rel="preload" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonBar",
};
</script>

<style scoped>
.button-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  z-index: 10;
}
</style>