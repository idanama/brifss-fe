<template>
  <div>
    <div class="cards">
      <!-- v-for="index in 3" -->
      <Card
        v-for="(card, index) in cardsSmall"
        :ref="'card'+index"
        :key="cardsSmall[index]._id"
        :card="cardsSmall[index]"
        :index="index"
        :is-current="index === 0"
        @cardRight="$emit('cardRight');"
        @cardLeft="$emit('cardLeft');"
        @cardDown="$emit('cardDown');"
        @cardUp="$emit('cardUp');"
        @hideCard="handleHideCard();"
      />
    </div>
    <ButtonBar
      v-if="buttonBar"
      @cardRight="enact('right');"
      @cardLeft="enact('left');"
      @cardDown="enact('down');"
      @cardUp="enact('up');"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";
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
    enact(direction) {
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