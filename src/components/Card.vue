<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
      'card-is-square': card.isSquare
    }"
    :style="{transform: transformString}"
    class="card"
    v-on:click.prevent="tapCard()"
  >
    <div :class="swipeStyle" class="ltr card-swipe">
      <div class="swipe-action-tip" :class="{'no-display' : swipeDirection !== 'down'}">
        <img src="@/assets/icons/thumbs-down.svg" class="is-invert" rel="preload" />
      </div>
      <div class="swipe-action-tip" :class="{'no-display' : swipeDirection !== 'right'}">
        <img src="@/assets/icons/book-open.svg" class="is-invert" rel="preload" />
      </div>
      <div class="swipe-action-tip" :class="{'no-display' : swipeDirection !== 'left'}">
        <img src="@/assets/icons/x.svg" class="is-invert" rel="preload" />
      </div>
      <div class="swipe-action-tip" :class="{'no-display' : swipeDirection !== 'up'}">
        <img src="@/assets/icons/thumbs-up.svg" class="is-invert" rel="preload" />
      </div>
    </div>
    <transition name="fade">
      <div
        class="card-content"
        :class="{
      rtl: card.source.rtl === true,
      ltr: card.source.rtl !== true,
      isAnimating: isInteractAnimating,
    }"
        v-if="swipeDirection===''"
      >
        <div class="card-title">{{card.title}}</div>
        <div v-if="isExtra || card.showSnippet" class="card-snippet">{{card.contentSnippet}}</div>
        <div class="card-subtitle" v-if="card.source">
          <div class="button is-transparent card-source" @click.stop="cardOpen(card.link)">
            {{card.source.name}}
            <img
              src="@/assets/icons/external-link.svg"
              class="icon-inline is-invert"
            />
          </div>
        </div>
      </div>
    </transition>
    <div class="card-background-dim" :class="{isCurrent: isCurrent}"></div>
    <div class="card-background" :style="{backgroundColor : card.bgc}">
      <img
        v-if="card.imageUrl.length > 0"
        style="height:100%;width:100%;object-fit: cover;"
        v-bind:src="card.imageUrl[0]"
      />
    </div>
  </div>
</template>



<script>
// import { mapActions } from "vuex";

import interact from "interactjs";
const CARD_RIGHT = "cardRight";
const CARD_LEFT = "cardLeft";
const CARD_DOWN = "cardDown";
const CARD_UP = "cardUp";

export default {
  static: {
    interactMaxRotation: 0, // was 15
    interactOutOfSightXCoordinate: screen.width,
    interactOutOfSightYCoordinate: screen.height,
    interactYThreshold: 100,
    interactXThreshold: 100,

    tipYThreshold: 80,
    tipXThreshold: 80,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
      isExtra: false,
      isExtraAnimating: false,
      swipeDirection: "",
    };
  },

  computed: {
    swipeStyle() {
      return {
        "is-hidden": this.swipeDirection === "",
        "card-swipe-up": this.swipeDirection === "up",
        "card-swipe-down": this.swipeDirection === "down",
        "card-swipe-left": this.swipeDirection === "left",
        "card-swipe-right": this.swipeDirection === "right",
      };
    },
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }
      if (this.isExtraAnimating) {
        return `scale(0.98,0.98)`;
      }
      return null;
    },
  },

  mounted() {
    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: (event) => {
        // event.preventDefault();
        const { tipXThreshold, tipYThreshold } = this.$options.static;
        let x = this.interactPosition.x + event.dx;
        let y = this.interactPosition.y + event.dy;
        // console.log("interact pos x", this.interactPosition.x);
        // console.log("event dx", event.dx);
        if (Math.abs(x) > Math.abs(y)) {
          y = 0;
        } else {
          x = 0;
        }
        let rotation = 0;
        // let rotation = interactMaxRotation * (x / interactXThreshold);

        // if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        // else if (rotation < -interactMaxRotation)
        //   rotation = -interactMaxRotation;

        if (this.swipeDirection === "") {
          if (Math.abs(y) < tipYThreshold && x > tipXThreshold) {
            this.swipeDirection = "right";
          } else if (Math.abs(y) < tipYThreshold && x < -tipXThreshold) {
            this.swipeDirection = "left";
          } else if (Math.abs(x) < tipXThreshold && y > tipYThreshold) {
            this.swipeDirection = "down";
          } else if (Math.abs(x) < tipXThreshold && y < -tipYThreshold) {
            this.swipeDirection = "up";
          }
        }

        if (this.swipeDirection === "right" && x < tipXThreshold) {
          this.swipeDirection = "";
        } else if (this.swipeDirection === "left" && x > -tipXThreshold) {
          this.swipeDirection = "";
        } else if (this.swipeDirection === "down" && y < tipYThreshold) {
          this.swipeDirection = "";
        } else if (this.swipeDirection === "up" && y > -tipYThreshold) {
          this.swipeDirection = "";
        }

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(CARD_RIGHT);
        else if (x < -interactXThreshold) this.playCard(CARD_LEFT);
        else if (y > interactYThreshold) this.playCard(CARD_DOWN);
        else if (y < -interactYThreshold) this.playCard(CARD_UP);
        else this.resetCardPosition();
      },
    });
  },

  // beforeDestroy() {
  //   console.log("destroy!", this.card.title);
  //   interact(this.$refs.interactElement).unset();
  // },

  methods: {
    // ...mapActions({
    //   act: "activity/act"
    // }),
    cardOpen(link) {
      window.open(link, "_blank");
      //   this.$store.dispatch("activity/act", {
      //     _id,
      //     activity: "read"
      //   });
    },
    tapCard() {
      if (this.isExtra) {
        this.isExtra = false;
      } else {
        this.isExtra = true;
      }
      this.isExtraAnimating = true;
      setTimeout(() => {
        this.isExtraAnimating = false;
      }, 100);
    },
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation,
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case CARD_RIGHT:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          });
          this.$emit(CARD_RIGHT);
          break;
        case CARD_LEFT:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          });
          this.$emit(CARD_LEFT);
          break;
        case CARD_DOWN:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate,
          });
          this.$emit(CARD_DOWN);
          break;
        case CARD_UP:
          this.interactSetPosition({
            y: -interactOutOfSightYCoordinate,
          });
          this.$emit(CARD_UP);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    },
    enact(direction) {
      const { interactXThreshold, interactYThreshold } = this.$options.static;
      const actDelay = 275;
      switch (direction) {
        case "up":
          this.interactSetPosition({
            x: 0,
            y: -interactYThreshold - 100,
            rotation: 0,
          });
          this.$set(this, "isInteractDragged", true);
          this.swipeDirection = "up";
          setTimeout(() => {
            this.playCard(CARD_UP);
          }, actDelay);
          break;
        case "down":
          this.interactSetPosition({
            x: 0,
            y: interactYThreshold + 100,
            rotation: 0,
          });
          this.$set(this, "isInteractDragged", true);
          this.swipeDirection = "down";
          setTimeout(() => {
            this.playCard(CARD_DOWN);
          }, actDelay);
          break;
        case "left":
          this.interactSetPosition({
            y: 0,
            x: -interactXThreshold - 100,
            rotation: 0,
          });
          this.$set(this, "isInteractDragged", true);
          this.swipeDirection = "left";
          setTimeout(() => {
            this.playCard(CARD_LEFT);
          }, actDelay);
          break;
        case "right":
          this.interactSetPosition({
            y: 0,
            x: interactXThreshold + 100,
            rotation: 0,
          });
          this.$set(this, "isInteractDragged", true);
          this.swipeDirection = "right";
          setTimeout(() => {
            this.playCard(CARD_RIGHT);
          }, actDelay);
          break;
      }

      // console.log("enact:", direction, this.card.title);
      // this.playCard(direction);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/cards.scss";

$cardsTotal: 3;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.is-hidden {
  visibility: hidden;
}

.card-swipe {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
}

.card-swipe-up {
  align-items: center;
  flex-direction: column-reverse;
}
.card-swipe-down {
  flex-direction: column;
  align-items: center;
}
.card-swipe-left {
  flex-direction: row-reverse;
  align-items: center;
}
.card-swipe-right {
  flex-direction: row;
  align-items: center;
}

.swipe-action-tip {
  padding: 2rem;
}

.card-title {
  font-size: 2rem;
  // line-height: 1.25em;
  font-weight: 600;

  margin: 0;
}

.card-source {
  // line-height: 1.25em;
  font-size: 1.25rem;
  font-style: italic;
  display: flex;
}
.source-link {
  cursor: pointer;
  padding: 0.2rem;
}
.source-link:hover {
  background: black;
}
.card-subtitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-snippet {
  // display: flex;

  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  word-wrap: break-word;
  overflow-y: auto;
  flex-grow: 2;
  // line-height: 2em;
  // max-height: 100%;
}
.card-background {
  z-index: -2;
  position: absolute;
  width: 100%;
  height: 100%;

  overflow: hidden;
}
.card-rating {
  display: flex;
  align-items: center;
  direction: ltr;
}
.card-rating-number {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.card-button:hover {
  background-color: black !important;
}
.card-button:active {
  // transform: translateY(-2px);
  transform: scale(0.9, 0.9);
}

.card-content {
  width: 100%;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-background-dim {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;

  &.isCurrent {
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &.isAnimating {
    transition: background-color 0.3s $ease-out-back;
  }
}
.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
  }

  height: 60vh;
  max-height: 500px;

  display: flex;
  margin: auto;

  color: $c-white;

  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );

  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  &.isCurrent {
    pointer-events: auto;
    // background: rgba(0, 0, 0, 0.5);
  }

  &.isAnimating {
    transition: transform 0.3s $ease-out-back, color 0.3s $ease-out-back;
  }

  // To prevent 'onend' before you let go of your finger on touch devices
  // https://github.com/taye/interact.js/issues/595
  touch-action: none;
}

.card-is-square {
  height: 50vh !important;
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: rgba(255, 255, 255, 0.5);
    } @else if $i == 2 {
      color: rgba(255, 255, 255, 0.5);
    }

    @if $i != 1 {
      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
