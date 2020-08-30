<template>
  <div>
    <div class="cards" ref="cards">
      <Card
        v-for="(card, index) in cardsSmall"
        :ref="'card'+index"
        :key="cardsSmall[index]._id"
        :card="cardsSmall[index]"
        :index="index"
        :is-current="index === 0"
        :swipeMap="swipeMap"
        @cardRight="swipe('right');"
        @cardLeft="swipe('left');"
        @cardDown="swipe('down');"
        @cardUp="swipe('up');"
        @hideCard="handleHideCard();"
      />
    </div>
    <ButtonBar v-if="buttonBar" @action="enact" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import ButtonBar from "@/components/ButtonBar.vue";

export default {
  components: {
    Card,
    ButtonBar,
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
      this.$emit(action);
    },
    enact(action) {
      const direction = this.swipeMap.get(action);
      this.$refs.card0[0].enact(direction);
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
</style>