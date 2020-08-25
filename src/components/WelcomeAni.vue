<template>
  <div class="welcome-stack">
    <div class="welcome-card">
      <div class="welcome-card-content">
        <div>
          <img
            :src="require('@/assets/illustrations/welcome.png')"
            alt="WELCOME"
            width="66%"
            class="graphic mat"
          />
        </div>
        <img
          :src="require('@/assets/illustrations/news.png')"
          alt="news"
          width="35%"
          class="graphic newspaper"
        />
        <div :class="{'move-up':seperation}">
          <img
            :src="require('@/assets/illustrations/news.png')"
            alt="news"
            width="35%"
            class="graphic newspapers"
            style="transform: translate(30px,-50px) rotate(10deg)"
          />
          <img
            :src="require('@/assets/illustrations/news.png')"
            alt="news"
            width="35%"
            class="graphic newspapers"
            style="transform: translate(-50px,-30px) rotate(-15deg)"
          />
          <img
            :src="require('@/assets/illustrations/news.png')"
            alt="news"
            width="35%"
            class="graphic newspapers"
            style="transform: translate(-20px,-30px) rotate(30deg)"
          />
          <img
            :src="require('@/assets/illustrations/news.png')"
            alt="news"
            width="35%"
            class="graphic newspapers"
            style="transform: translate(50px,25px) rotate(5deg)"
          />
        </div>
        <div @click="$emit('start')" class="logo-head">
          <Logo :noLink="true" :large="true" />
          <div class="start">{{$t('actions.tapHere')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  name: "WelcomeAni",
  components: {
    Logo,
  },
  data() {
    return {
      seconds: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.seconds += 0.1;
    }, 100);
  },
  computed: {
    seperation() {
      return this.seconds > 6;
    },
  },
};
</script>

<style lang="scss" scoped>
.graphic {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.welcome-card-content {
  //   align-self: center;
}
.welcome-card {
  width: 100%;
  background-color: white;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  height: 60vh;
  max-height: 500px;

  display: flex;
  justify-content: center;
  align-self: center;
}

@keyframes logo-in {
  0% {
    opacity: 0;
  }
  23% {
  }
  58% {
  }
  83% {
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateY(80px);
  }
}

.logo-head {
  transform: translateY(40px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  border-radius: 50px;

  animation-name: logo-in;
  animation-duration: 6s;
  animation-fill-mode: forwards;

  cursor: pointer;
}

.start {
  padding-bottom: 1em;

  animation-name: start-now;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes start-now {
  0% {
    opacity: 1;
    // font-style: normal;
  }

  50% {
    // font-style: italic;
    opacity: 0;
  }
  100% {
    // font-style: normal;
    opacity: 1;
  }
}

.welcome-stack {
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 500px;

  height: 65vh;
  max-height: 550px;
}

@keyframes mat-in {
  0% {
    opacity: 0;
  }
  23% {
    opacity: 1;
  }
  58% {
  }
  83% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(80px);
  }
}
.mat {
  animation-name: mat-in;
  animation-duration: 6s;
  animation-fill-mode: forwards;
}

@keyframes newspaper-in {
  0% {
    opacity: 0;
  }
  33% {
    opacity: 0;
  }
  48% {
    opacity: 1;
  }
  83% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(-80px);
  }
}

.newspaper {
  animation-name: newspaper-in;
  animation-duration: 6s;
  animation-fill-mode: forwards;
}

@keyframes newspapers-in {
  0% {
    opacity: 0;
  }
  33% {
    opacity: 0;
  }
  58% {
    opacity: 0;
  }
  73% {
    opacity: 1;
    // transform: translateY(0px);
  }
  83% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    // transform: translateY(-80px);
  }
}
.newspapers {
  animation-name: newspapers-in;
  animation-duration: 6s;
  animation-fill-mode: forwards;
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 1s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }

// .move-up {
//   //   transform: translateY(20px);
//   transform: translate(-50px, -30px) rotate(95deg);
//   transition-duration: 1s;
// }

// .move-down {
//   transform: translateY(-20px);
// }
</style>