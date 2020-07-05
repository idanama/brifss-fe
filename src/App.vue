<template>
  <div id="app" :class="{'no-scroll':(tab==='feed')}">
    <Logo :fixed="true" :large=" tab==='welcome'" />
    <div v-if="tab==='welcome'">
      <Welcome
        @initApp="changeTab('feed')"
        :selectedSources="sources"
        @setUsername="setUsername($event)"
      />
    </div>
    <div v-else>
      <div v-if="tab==='feed'">
        <div v-if="cards.length>0">
          <CardStack :cards="cards" @cardRight="addToList(cards[0])" />
          <Countdown :now="cards.length" />
        </div>
      </div>
      <ReadList :list="list" v-if="tab==='read'" />
      <Config :selectedSources="sources" v-if="tab==='config'" />
      <Navbar :tab="tab" :listLength="list.length" v-on:tab="changeTab" />
    </div>
    <!-- <div @click="getArticles()" class="button is-primary">getArticles</div> -->
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

import ARTICLES from "@/graphql/ArticlesGetNew.gql";

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
    return {
      sources: {},
      cards,
      tab: "welcome",
      list: [],
      username: "",
      feedDuration: 24 * (60 * 60 * 1000) // 24 hours
    };
  },
  mounted() {
    this.initLocalStorage("sources");
    this.initLocalStorage("cards");
    this.initLocalStorage("list");
    this.initLocalStorage("feedDuration");
    this.initLocalStorage("username");
    if (this.username !== "") {
      this.tab = "feed";
    }
  },
  watch: {
    sources(newVal) {
      localStorage.sources = JSON.stringify(newVal);
    },
    init(newVal) {
      localStorage.init = JSON.stringify(newVal);
    },
    cards(newVal) {
      localStorage.cards = JSON.stringify(newVal);
    },
    list(newVal) {
      localStorage.list = JSON.stringify(newVal);
    },
    username(newVal) {
      localStorage.username = JSON.stringify(newVal);
    },
    feedDuration(newVal) {
      localStorage.feedDuration = JSON.stringify(newVal);
    },
    tab() {
      if (this.tab === "feed") {
        this.getArticles();
      }
    }
  },
  methods: {
    initLocalStorage(key) {
      if (localStorage.getItem(key)) {
        try {
          this[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          localStorage.removeItem(key);
        }
      }
    },
    changeTab(tab) {
      // this.tab = tab;
      this.$set(this, "tab", tab);
    },
    addToList(card) {
      this.$set(this, "list", [...this.list, card]);
      // this.list.push(card);
    },
    setUsername(username) {
      // this.username = username;
      this.$set(this, "username", username);
    },
    async getArticles() {
      const fetchFroms = [];
      const fetchSources = [];
      const fetchEarliest = new Date(Date.now() - this.feedDuration);
      for (let id in this.sources) {
        // console.log(id);

        let fetchFrom = fetchEarliest;
        if (this.sources[id].lastFetched !== undefined) {
          fetchFrom =
            this.sources[id].lastFetched.end > fetchEarliest
              ? this.sources[id].lastFetched.end
              : fetchEarliest;
        }
        fetchFroms.push(fetchFrom);
        fetchSources.push(id);
      }

      const result = await this.$apollo.query({
        // Query
        query: ARTICLES,
        // Parameters
        variables: {
          fetchSources,
          fetchFroms
        }
      });
      // this.sources

      this.addArticles(result.data.articlesGetNew);
    },
    addArticles(articlesToAdd) {
      const addThem = [];
      const articlesNow = this.cards;
      articlesToAdd.forEach(articleToAdd => {
        if (!articlesNow.find(article => article._id === articleToAdd._id)) {
          addThem.push(articleToAdd);
        }
      });
      // console.log("add:", addThem);
      this.$set(this, "cards", [...this.cards, ...addThem]);
      // this.cards.push(...addThem);
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
