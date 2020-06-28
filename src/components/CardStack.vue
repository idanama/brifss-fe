<template>
  <div class="cards">
    <Card
      v-for="(card, index) in cards"
      :key="card._id"
      :card="card"
      :index="index"
      :is-current="index === 0"
      @cardRight="$emit('cardRight');"
      @cardLeft="$emit('cardLeft');"
      @cardDown="$emit('cardDown');"
      @cardUp="$emit('cardUp');"
      @hideCard="$emit('hideCard');"
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