<template>
  <div id="app" :class="{'no-scroll':(tab==='feed')}">
    <Logo :fixed="true" :large="true" />
    <div v-if="username===''">
      <Welcome />
    </div>
    <div v-else>
      <div v-if="tab==='feed'">
        <CardStack :cards="cards" @cardRight="addToList(cards[0])" />
        <Countdown :now="cards.length" />
      </div>
      <ReadList :list="list" v-if="tab==='read'" />
      <Config v-if="tab==='config'" />
      <Navbar :tab="tab" v-on:tab="changeTab" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Logo from "@/components/Logo.vue";

import Welcome from "@/components/Welcome.vue";
import Config from "@/components/Config.vue";
import CardStack from "@/components/CardStack.vue";
import Countdown from "@/components/Countdown.vue";
import ReadList from "@/components/ReadList.vue";

export default {
  components: {
    Welcome,
    Navbar,
    Logo,
    ReadList,
    Countdown,
    CardStack,
    Config
  },
  data() {
    let cards = [];
    for (var i = 0; i < 300; i++) {
      cards.push({
        title: "The Sunday Read: ‘The Man Who Saw America’",
        source: { name: "New York Times" },
        contentSnippet:
          "Chronicling the human condition with one of the most influential photographers in history.",
        imageUrl: [
          "https://static01.nyt.com/images/2020/05/27/science/28daily/merlin_172858092_fae473bb-8e46-4bb4-8b0a-0d09ccd98fff-videoSixteenByNineJumbo1600.jpg"
        ],
        link: "https://nyt.com",
        _id: i
      });
    }
    return {
      cards,
      tab: "",
      list: [],
      username: ""
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
    addToList(card) {
      this.list.push(card);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
.no-scroll {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100vh;
}
</style>
