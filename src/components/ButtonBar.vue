<template>
  <div class="button-bar">
    <div @click="$emit('action','dislike')" class="button is-circle">
      <img src="@/assets/icons/thumbs-down.svg" rel="preload" />
    </div>
    <div @click="$emit('action','dismiss')" class="button is-circle">
      <img src="@/assets/icons/x.svg" rel="preload" />
    </div>
    <div @click="$emit('action','save')" class="button is-circle">
      <img src="@/assets/icons/book-open.svg" rel="preload" />
    </div>
    <div @click="$emit('action','like')" class="button is-circle">
      <img src="@/assets/icons/thumbs-up.svg" rel="preload" />
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