<template>
  <div class="cards">
    <!-- v-for="index in 3" -->
    <Card
      v-for="(card, index) in cardsSmall"
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
</template>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cardsSmall: this.cards.slice(0, 4)
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
    }
  }
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
}
</style>