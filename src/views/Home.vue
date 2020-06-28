<template>
  <div class="home">
    <CardStack :cards="cards" />
  </div>
</template>

<script>
import CardStack from "@/components/CardStack.vue";

export default {
  name: "Home",
  components: {
    CardStack
  },
  data() {
    return {
      cards: [
        {
          title: "The Sunday Read: ‘The Man Who Saw America’",
          source: { name: "New York Times" },
          contentSnippet:
            "Chronicling the human condition with one of the most influential photographers in history.",
          imageUrl: [
            "https://static01.nyt.com/images/2020/05/27/science/28daily/merlin_172858092_fae473bb-8e46-4bb4-8b0a-0d09ccd98fff-videoSixteenByNineJumbo1600.jpg"
          ]
        },
        {
          title: "card2",
          source: { name: "Source" },
          contentSnippet: "Hi",
          imageUrl: ["jdj"]
        }
      ]
    };
  }
};
</script>
