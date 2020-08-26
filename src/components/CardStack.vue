<template>
  <div>
    <div class="cards" ref="cards">
      <!-- v-for="index in 3" -->
      <Card
        v-for="(card, index) in cardsSmall"
        :ref="'card'+index"
        :key="cardsSmall[index]._id"
        :card="cardsSmall[index]"
        :index="index"
        :is-current="index === 0"
        @cardRight="swipe('right');"
        @cardLeft="swipe('left');"
        @cardDown="swipe('down');"
        @cardUp="swipe('up');"
        @hideCard="handleHideCard();"
      />
    </div>
    <transition name="tip">
      <CardTip :x="tip.x" :y="tip.y" v-if="tip" :action="tip.action" />
    </transition>
    <ButtonBar v-if="buttonBar" @action="enact" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import CardTip from "@/components/CardTip.vue";
import ButtonBar from "@/components/ButtonBar.vue";

export default {
  components: {
    Card,
    ButtonBar,
    CardTip,
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    buttonBar: Boolean,
    swipeMap: Object,
    windowWidth: Number,
  },
  data() {
    return {
      cardsSmall: this.cards.slice(0, 4),
      tip: null,
    };
  },
  methods: {
    handleHideCard() {
      this.cards.shift();
      this.cardsSmall.shift();
      setTimeout(() => {
        if (this.cards[3] !== undefined) {
          this.cardsSmall.push(this.cards[3]);
        }
      });
    },
    swipe(direction) {
      const action = this.swipeMap.revGet(direction);
      this.showTip(action, direction);
      this.$emit(action);
    },
    enact(action) {
      const direction = this.swipeMap.get(action);
      this.showTip(action, direction);
      this.$refs.card0[0].enact(direction);
    },
    showTip(action, direction) {
      // console.log("tip:", action, "dir:", direction);
      const rect = this.$refs.cards.getBoundingClientRect();
      const mid = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
      switch (direction) {
        case "left":
          this.tip = {
            x: (rect.left > 10, rect.left, 25),
            y: mid.y,
            action,
          };
          break;
        case "right":
          this.tip = {
            x:
              (rect.right < this.windowWidth - 10,
              rect.right,
              this.windowWidth - 25),
            y: mid.y,
            action,
          };
          break;
        case "up":
          this.tip = {
            x: mid.x,
            y: rect.top,
            action,
          };
          break;
        case "down":
          this.tip = {
            x: mid.x,
            y: rect.bottom,
            action,
          };
          break;
      }
      setTimeout(() => {
        this.tip = null;
      });
    },
  },
};
</script>

<style>
.cards {
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 500px;

  height: 65vh;
  max-height: 550px;
}

.tip-enter {
  transform: scale(1, 1);
  opacity: 1;
}

.tip-leave-active {
  transition: all 1s ease;
}

.tip-leave-to {
  transform: scale(1.5, 1.5);
  opacity: 0.2;
}
</style>