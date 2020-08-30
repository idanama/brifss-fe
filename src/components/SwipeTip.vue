<template>
  <transition name="tip">
    <div v-if="dir" style="width:100%;">
      <div :class="[dir,swiped ? 'swiped': '']" class="tip">
        <img :src="$options.static.iconDict[swipeMap.revGet(dir)]" class="is-invert" rel="preload" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SwipeTip",
  props: {
    pos: Object,
    threshold: Array,
    swipeMap: Object,
    swiped: Boolean,
  },
  static: {
    iconDict: {
      dismiss: require("@/assets/icons/x.svg"),
      dislike: require("@/assets/icons/thumbs-down.svg"),
      like: require("@/assets/icons/thumbs-up.svg"),
      save: require("@/assets/icons/book-open.svg"),
    },
  },
  computed: {
    dir() {
      if (this.pos.y > this.threshold[1]) {
        return "down";
      } else if (-this.pos.y > this.threshold[1]) {
        return "up";
      } else if (this.pos.x > this.threshold[0]) {
        return "right";
      } else if (-this.pos.x > this.threshold[0]) {
        return "left";
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";

$diam: 50px;

.tip {
  position: relative;
  width: $diam;
  height: $diam;
  border-radius: 100%;
  background-color: $primary;
  box-shadow: 0 0px 10px rgba(255, 255, 255, 0.2);

  z-index: 100;

  display: flex;
  justify-content: space-around;
  text-align: center;
}

.swiped {
  transform: scale(1.5, 1.5);
  opacity: 0.3;
  transition: all 0.2s ease;
}

.tip-enter-active,
.tip-leave-active {
  z-index: 100;
  transition: all 0.2s ease;
}

.tip-enter,
.tip-leave-to {
  z-index: 100;
  opacity: 0.2;
}

.left {
  top: calc(50% - (#{$diam} / 2));
  left: 0%;
}
.right {
  top: calc(50% - (#{$diam} / 2));
  left: calc(100% - #{$diam});
}
.up {
  top: 0%;
  left: calc(50% - (#{$diam} / 2));
}
.down {
  top: calc(100% - (#{$diam}));
  left: calc(50% - (#{$diam} / 2));
}
</style>