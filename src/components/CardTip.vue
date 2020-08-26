<template>
  <div class="tip" :style="{position:'fixed','top':y-25+'px','left':x-25+'px'}">
    <img :src="icon" class="is-invert" rel="preload" />
  </div>
</template>

<script>
export default {
  name: "CardTip",
  props: {
    x: Number,
    y: Number,
    action: String,
  },
  data() {
    const iconDict = {
      dismiss: require("@/assets/icons/x.svg"),
      dislike: require("@/assets/icons/thumbs-down.svg"),
      like: require("@/assets/icons/thumbs-up.svg"),
      save: require("@/assets/icons/book-open.svg"),
    };
    return {
      icon: iconDict[this.action],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";

$diam: 50px;

.tip {
  width: $diam;
  height: $diam;
  border-radius: 100%;
  background-color: $primary;

  z-index: 100;

  display: flex;
  justify-content: space-around;
  text-align: center;
}
</style>