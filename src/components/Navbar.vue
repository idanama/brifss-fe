<template>
  <transition name="slide">
    <nav role="navigation" class="bottom-nav" aria-label="main navigation">
      <div class="nav-item">
        <img src="@/assets/logo.svg" class="svg-icon" />
      </div>
      <div class="nav-item">
        <img src="@/assets/icons/more-vertical.svg" class="svg-icon" />
      </div>
      <div class="nav-action">
        <transition class="nav-action" name="bounce">
          <div class="button is-primary is-circle">
            <img src="@/assets/icons/book-open.svg" class="svg-icon is-invert" />
          </div>
        </transition>
      </div>
    </nav>
  </transition>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.slide-enter-active {
  transition: all 0.3s ease;
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

.bottom-nav {
  z-index: 30;

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