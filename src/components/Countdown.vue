<template>
  <div>
    <div v-if="!desktop" class="bottom-countdown" :style="{width: countWidth}"></div>
    <div v-else class="top-countdown" :style="{width: countWidth}"></div>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  props: {
    now: {
      type: Number,
    },
    desktop: Boolean,
  },
  created() {
    setTimeout(() => {
      this.count = this.now;
    });
  },
  data() {
    return {
      total: this.now,
      count: 0,
    };
  },
  computed: {
    countWidth() {
      if (this.total === 0) {
        return 0 + "%";
      } else {
        return (this.count / this.total) * 100 + "%";
      }
    },
  },
  watch: {
    now() {
      this.count = this.now;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/main.scss";

.bottom-countdown {
  z-index: 29;
  height: 3rem;
  position: fixed;
  bottom: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: $primary;

  transition-duration: 1s;
}

.top-countdown {
  z-index: 29;
  height: 3.8rem;
  position: fixed;
  top: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: $primary;

  transition-duration: 1s;
}
</style>