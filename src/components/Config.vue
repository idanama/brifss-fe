<template>
  <div>
    <ul>
      <li class="config-item">
        <Sources :cards="cards" :selectedSources="selectedSources" @selectSource="selectSource" />
      </li>
      <li class="config-item">
        <div class="config-title">About</div>
        <div>Designed and developed by Idan Amati © {{year}}</div>
      </li>
      <li class="config-item config-bottom"></li>
    </ul>
  </div>
</template>

<script>
import Sources from "@/components/Sources.vue";

export default {
  name: "Config",
  props: {
    selectedSources: { type: Object },
    cards: { type: Array }
  },
  components: {
    Sources
  },
  methods: {
    selectSource(source) {
      this.$emit("selectSource", source);
    }
  },
  data() {
    const now = new Date();
    const year = now.getFullYear();
    return { year };
  }
};
</script>

<style lang="scss">
.config-item {
  //   align-items: center;
  border-top: 1px solid #ededed;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  //   display: flex;
  justify-content: space-between;
}

.config-title {
  //   font-size: 1.3rem;
  font-weight: bold;
}

.config-bottom {
  justify-content: space-around !important;
  display: flex;
  margin-bottom: 10rem;
}
</style>