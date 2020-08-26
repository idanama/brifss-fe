<template>
  <transition appear name="slide-fade">
    <div :class="[fixed ? 'loading-fixed' : 'loading-dynamic']">
      <div class="lds-circle">
        <div></div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
@import "@/assets/main.scss";

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.loading-dynamic {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  flex-grow: 10;
  text-align: center;
}

.loading-fixed {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: auto;
  margin-top: -32px;
  margin-left: -42px;
  z-index: 50;
}

.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  //   border-radius: 50%;
  background: $primary;
  //   animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: lds-circle 2s cubic-bezier(0, 0.5, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: translate(0px, 0px);
    // transform: rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: translate(20px, 0px);
    // transform: rotateX(0deg) rotateY(0deg);
  }

  50% {
    // transform: rotateX(540deg) rotateY(0deg);
    transform: translate(-20px, 0px);

    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  75% {
    // transform: rotateX(540deg) rotateY(720deg);
    transform: translate(20px, 0px);
  }
  100% {
    // transform: rotateX(540deg) rotateY(720deg);
    transform: translate(0px, 0px);
  }
}
</style>

<script>
export default {
  name: "Loader",
  props: {
    fixed: Boolean,
  },
};
</script>