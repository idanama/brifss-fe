<template>
  <transition appear name="slide">
    <nav role="navigation" class="bottom-nav" aria-label="main navigation">
      <div class="nav-item" @click="$emit('tab','feed')">
        <img src="@/assets/logo.svg" class="svg-icon" />
      </div>
      <div class="nav-item" @click="$emit('tab','config')">
        <img src="@/assets/icons/more-vertical.svg" class="svg-icon" />
      </div>
      <div class="nav-action" @click="$emit('tab','read')">
        <transition class="nav-action" name="bounce">
          <div class="button is-primary is-circle" v-if="listLength>0">
            <transition name="fade" mode="out-in">
              <span v-if="tab==='feed'">{{listLength}}</span>
              <img src="@/assets/icons/book-open.svg" class="svg-icon is-invert" v-else />
            </transition>
          </div>
        </transition>
      </div>
    </nav>
  </transition>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    tab: { type: String },
    listLength: { type: Number }
  }
};
</script>

<style>
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(3rem);
}

.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bottom-nav {
  z-index: 30;
  height: 2.8rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 -0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
}
.level {
  margin-bottom: 0rem !important;
}

.svg-icon {
  stroke: white;
  height: 1.5em;
}

.nav-item {
  padding: 0.6rem;
  cursor: pointer;
}

.nav-action {
  display: flex;
  justify-content: space-around;
  z-index: -2;
  position: absolute;
  width: 100%;
  height: 100%;
  top: -1.5rem;
}
</style>