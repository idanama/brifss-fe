<template>
  <div>
    <div v-if="$apolloData.queries.sources.loading">
      <Loader />
    </div>
    <div else>
      <div v-for="(category,order) in sourcesSorted" v-bind:key="order">
        <div v-for="(sources, name) in category" v-bind:key="name">
          <div class="sources-title">{{name}}</div>
          <div class="source-buttons">
            <div
              v-for="source in sources"
              v-bind:key="source._id"
              class="button"
              :class="{'is-primary' : isSourceActive(source._id) }"
              @click="$emit('selectSource',source)"
            >{{ source.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { whatCountry } from "@/scripts/localeCodes.js";

export default {
  name: "Sources",
  components: {
    Loader
  },
  props: {
    selectedSources: {
      type: Object
    },
    cards: {
      type: Array
    },
    locale: { type: String }
  },
  data() {
    let browserLocale;
    if (navigator.languages != undefined) browserLocale = navigator.languages;
    else
      browserLocale =
        navigator.userLanguage ||
        navigator.language ||
        navigator.browserLanguage ||
        "en";
    return {
      browserLocale,
      sources: null,
      geolocation: null
    };
  },
  // created() {
  //   this.getGeolocation();
  // },
  methods: {
    // async getGeolocation() {
    //   fetch("https://extreme-ip-lookup.com/json/").then(res => {
    //     console.log(res);
    //   });
    // },
    isSourceActive(sourceId) {
      if (this.selectedSources[sourceId]) {
        if (this.selectedSources[sourceId].active) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  computed: {
    sourcesSorted() {
      let sourcesByLocale = {};
      if (this.sources) {
        for (var id in this.sources) {
          // make category for undefined
          let locale;
          if (this.sources[id].locale === null) {
            locale = "Other";
          } else locale = this.sources[id].locale.match(/[A-Z]{2}/);
          // order by category
          // initiate category if not exists
          if (!Object.prototype.hasOwnProperty.call(sourcesByLocale, locale)) {
            sourcesByLocale[locale] = {};
          }
          // mark different language than ui
          const source = this.sources[id];
          // if (this.locale !== this.sources[id].locale.substr(0, 2)) {
          //   source.name = this.sources[id].name.concat(
          //     ` (${this.sources[id].locale.substr(0, 2)})`
          //   );
          // }

          // add source to category
          sourcesByLocale[locale][id] = {
            ...source
          };
        }
        let sourcesArray = [];
        for (let countryCode in sourcesByLocale) {
          const country = whatCountry(countryCode);
          sourcesArray.push({ [country]: sourcesByLocale[countryCode] });
        }

        const reorderArrayByKey = (array, key, to) => {
          array.splice(
            to,
            0,
            array.splice(
              array.findIndex(element => Object.keys(element)[0] === key),
              1
            )[0]
          );
        };

        // Sort A-Z

        // // priority 3 - united-states
        // reorderArrayByKey(sourcesArray, "עברית", 0);

        // priority 2 - user system locale
        reorderArrayByKey(sourcesArray, "Israel", 0);

        // priority 1 - ui language
        reorderArrayByKey(sourcesArray, "Israel", 0);

        return sourcesArray;
      } else {
        return [];
      }
    },
    loading() {
      return this.$apolloData.queries.sources.loading;
    }
  },
  apollo: {
    sources: {
      query: require("../graphql/SourcesGet.gql")
    }
  }
};
</script>

<style scss>
.source-buttons {
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: row; */
  align-content: center;
  justify-content: center;
  align-items: baseline;
}
.sources-title {
  padding-top: 1.5em;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: row; */
  align-content: center;
  justify-content: center;
  align-items: baseline;
}
</style>
