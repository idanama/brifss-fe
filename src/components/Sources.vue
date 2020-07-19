<template>
  <div class="apollo-example">
    <ApolloQuery :query="require('../graphql/SourcesGet.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">
          <Loader />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data">
          <div class="sources-title">Select you sources:</div>
          <div class="source-buttons">
            <div
              v-for="source in data.sources"
              v-bind:key="source._id"
              class="button"
              :class="{'is-primary' : isSourceActive(source._id) }"
              @click="$emit('selectSource',source)"
            >{{ source.name }}</div>
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">
          <Loader />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

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
    }
  },
  // data() {
  //   return {
  //     selectedSources: {}
  //   };
  // },
  methods: {
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
  padding: 1.5em;
  font-weight: bold;
}
</style>
