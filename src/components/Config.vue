<template>
  <div>
    <ul>
      <li class="config-item">
        <div class="config-title">{{$t('sources.title')}}</div>
        <Sources
          :locale="locale"
          :cards="cards"
          :selectedSources="selectedSources"
          @selectSource="selectSource"
        />
      </li>
      <li class="config-item">
        <div class="config-title">
          {{$t('locale.title')}}
          <img src="@/assets/icons/globe.svg" class="icon-inline" />
        </div>
        <div>
          <select v-model="$i18n.locale" @change="$emit('changeLocale', $i18n.locale)">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">{{ lang.lang }}</option>
          </select>
        </div>
      </li>
      <li class="config-item">
        <div class="config-title">{{$t('config.username')}}</div>
        <div>{{username}}</div>
      </li>

      <li class="config-item">
        <div class="config-title">{{$t('about.title')}}</div>
        <div>
          {{$t('about.content')}}
          <a
            href="https://www.idanamati.com"
            target="_blank"
            style="font-weight: bold;"
          >{{$t('about.name')}}</a>
          © {{year}}
        </div>
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
    cards: { type: Array },
    locale: { type: String },
    username: { type: String },
  },
  components: {
    Sources,
  },
  methods: {
    selectSource(source) {
      this.$emit("selectSource", source);
    },
    changeLocale() {
      console.log(this.$i18n.locale);
    },
  },
  data() {
    const now = new Date();
    const year = now.getFullYear();
    return {
      year,
      langs: [
        { lang: "עברית", code: "he" },
        { lang: "English", code: "en" },
      ],
    };
  },
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
  display: flex;
}

.config-bottom {
  justify-content: space-around !important;
  display: flex;
  margin-bottom: 10rem;
}
</style>