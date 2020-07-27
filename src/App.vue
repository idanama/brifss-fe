<template>
  <div id="app" :class="{'no-scroll':(tab==='feed'), 'rtl' : $i18n.locale==='he'}">
    <Logo :fixed="tab==='feed' || tab === 'read'" :large="tab==='welcome' || tab ==='config'" />
    <div v-if="tab==='welcome'">
      <Welcome
        @initApp="changeTab('feed')"
        :selectedSources="sources"
        :cards="cards"
        :locale="locale"
        @setUsername="setUsername($event)"
        @changeLocale="saveLocal"
        @selectSource="selectSource"
      />
    </div>
    <div v-else>
      <div v-if="tab==='feed'">
        <Loader v-if="loading" />
        <div v-else>
          <div v-if="cards.length>0">
            <CardStack
              :cards="cards"
              @cardRight="addToList(cards[0])"
              @cardUp="addToLikes({card:cards[0],like:true})"
              @cardDown="addToLikes({card:cards[0],like:false})"
            />
            <Countdown :now="cards.length" />
          </div>
          <div
            class="content-centered"
            v-else-if="activeSources(sources).length === 0"
          >{{$t('cards.noSources')}}</div>
          <div v-else class="content-centered">{{$t('cards.empty')}}</div>
        </div>
      </div>
      <ReadList v-if="tab==='read'" :list="list" />
      <Config
        v-if="tab==='config'"
        :cards="cards"
        :selectedSources="sources"
        @selectSource="selectSource"
        @changeLocale="saveLocal"
        :locale="locale"
      />

      <Navbar :tab="tab" :cards="cards" :listLength="list.length" v-on:tab="changeTab" />
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

import Loader from "@/components/Loader.vue";

import ARTICLES from "@/graphql/ArticlesGetNew.gql";

export default {
  name: "Brifss",
  components: {
    Welcome,
    Navbar,
    Logo,
    ReadList,
    Countdown,
    CardStack,
    Config,
    Loader,
  },
  metaInfo: {
    title: "Brifss",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/img/icons/android-icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/img/icons/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/img/icons/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/img/icons/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/img/icons/apple-icon-57x57.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/img/icons/apple-icon-60x60.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/img/icons/apple-icon-72x72.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/img/icons/apple-icon-76x76.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/img/icons/apple-icon-114x114.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/img/icons/apple-icon-120x120.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/img/icons/apple-icon-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/img/icons/apple-icon-152x152.png",
      },
    ],
  },
  data() {
    let cards = [];
    return {
      sources: {},
      cards,
      tab: "welcome",
      list: [],
      likes: [],
      dislikes: [],
      username: "",
      feedDuration: 24 * (60 * 60 * 1000), // 24 hours
      loading: 0,
      locale: "en",
    };
  },
  mounted() {
    this.initLocalStorage("sources");
    this.initLocalStorage("cards");
    this.initLocalStorage("list");
    this.initLocalStorage("feedDuration");
    this.initLocalStorage("username");
    this.initLocalStorage("likes");
    this.initLocalStorage("dislikes");
    this.initLocalStorage("locale");
    this.$root.$i18n.locale = this.locale;
    if (this.username !== "") {
      this.tab = "feed";
    }
  },
  watch: {
    // sources(newVal) {
    //   console.log("new sources val");

    //   localStorage.sources = JSON.stringify(newVal);
    // },
    init(newVal) {
      localStorage.init = JSON.stringify(newVal);
    },
    cards(newVal) {
      localStorage.cards = JSON.stringify(newVal);
    },
    likes(newVal) {
      localStorage.likes = JSON.stringify(newVal);
    },
    dislikes(newVal) {
      localStorage.dislikes = JSON.stringify(newVal);
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
    },
  },
  methods: {
    saveLocal(locale) {
      this.locale = locale;
      localStorage.locale = JSON.stringify(locale);
    },
    activeSources(sources) {
      let activeSources = [];
      for (let sourceId in sources) {
        if (sources[sourceId].active) {
          activeSources.push(sources[sourceId]);
        }
      }
      return activeSources;
    },
    selectSource(source) {
      if (!this.sources[source._id]) {
        // if does not exist
        this.$set(this.sources, source._id, source);
        this.$set(this.sources[source._id], "active", true);
      } else if (!this.sources[source._id].active) {
        // if exists but inactive
        this.$set(this.sources[source._id], "active", true);
      } else {
        // if exists and active
        this.$set(this.sources[source._id], "active", false);
        let articlesToKeep = [];
        for (let article in this.cards) {
          if (this.cards[article]) {
            if (this.cards[article].source._id !== source._id) {
              articlesToKeep.push(this.cards[article]);
            }
          }
        }
        this.$set(this, "cards", articlesToKeep);
      }
      // save to local storage
      // didnt work with global watch
      localStorage.sources = JSON.stringify(this.sources);
    },
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
      card.listedAt = new Date();
      this.$set(this, "list", [...this.list, card]);
      // this.list.push(card);
    },
    addToLikes({ card, like }) {
      card.likedAt = new Date();
      if (like) {
        this.$set(this, "likes", [...this.likes, card]);
      } else {
        this.$set(this, "dislikes", [...this.dislikes, card]);
      }
      // this.list.push(card);
    },
    setUsername(username) {
      // this.username = username;
      console.log("username:", username);
      this.$set(this, "username", username);
    },
    async getArticles() {
      const fetchFroms = [];
      const fetchSources = [];
      const fetchEarliest = new Date(Date.now() - this.feedDuration);
      for (let id in this.sources) {
        // console.log(id);
        if (this.sources[id].active) {
          let fetchFrom = fetchEarliest;
          if (this.sources[id].lastFetched !== undefined) {
            fetchFrom =
              this.sources[id].lastFetched.end > fetchEarliest
                ? this.sources[id].lastFetched.end
                : fetchEarliest;
          }
          fetchFroms.push(fetchFrom);
          fetchSources.push(id);
          const lastFetched = {
            start: fetchFrom,
            end: new Date(Date.now()),
          };
          this.sources[id].lastFetched = lastFetched;
        }
      }
      if (fetchSources.length > 0) {
        // console.log(`fetching`);
        this.$set(this, "loading", true);

        const result = await this.$apollo.query({
          // Query
          query: ARTICLES,
          // Parameters
          variables: {
            fetchSources,
            fetchFroms,
          },
        });
        // console.log(`complete`);
        this.addArticles(result.data.articlesGetNew);
        localStorage.sources = JSON.stringify(this.sources);
        this.sortArticles();
        this.$set(this, "loading", false);
      } else {
        // no sources active - dont do anything
      }
    },
    sortArticles() {
      let articles = this.cards;

      // remove old articles
      articles = articles.filter((article) => {
        return (
          new Date(article.createdAt).valueOf() >
          (new Date() - this.feedDuration).valueOf()
        );
      });

      // sort by date
      const key = "createdAt";
      articles.sort(function (a, b) {
        if (a[key] > b[key]) {
          return -1;
        } else if (a[key] < b[key]) {
          return 1;
        }
        return 0;
      });

      // set new value
      this.$set(this, "cards", articles);
    },
    addArticles(articlesToAdd) {
      const addThem = [];
      const articlesNow = this.cards;
      articlesToAdd.forEach((articleToAdd) => {
        if (!articlesNow.find((article) => article._id === articleToAdd._id)) {
          addThem.push(articleToAdd);
        }
      });
      // console.log("add:", addThem);
      this.$set(this, "cards", [...this.cards, ...addThem]);
      // this.cards.push(...addThem);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
.no-scroll {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100vh;
}

.content-centered {
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 500px;
}
</style>
