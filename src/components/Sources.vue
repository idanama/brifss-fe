<template>
  <div class="apollo-example">
    <div class="sources-title">Select you sources:</div>
    <ApolloQuery :query="require('../graphql/SourcesGet.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="source-buttons">
          <div
            v-for="source in data.sources"
            v-bind:key="source._id"
            class="button"
            :class="{'is-primary' : isSourceActive(source._id) }"
            @click="selectSource(source)"
          >{{ source.name }}</div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "Sources",
  props: {
    selectedSources: {
      type: Object
    }
  },
  // data() {
  //   return {
  //     selectedSources: {}
  //   };
  // },
  methods: {
    selectSource(source) {
      if (!this.selectedSources[source._id]) {
        // if does not exist
        this.$set(this.selectedSources, source._id, source);
        this.$set(this.selectedSources[source._id], "active", true);
      } else if (!this.selectedSources[source._id].active) {
        // if exists but inactive
        this.$set(this.selectedSources[source._id], "active", true);
      } else {
        // if exists and active
        this.$set(this.selectedSources[source._id], "active", false);
      }
    },
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
