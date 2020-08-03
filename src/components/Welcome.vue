<template>
  <div class="welcome">
    <div v-if="phase===0">
      <VueAgile
        class="slide-container ltr"
        ref="carousel"
        :navButtons="false"
        :infinite="false"
        :rtl="$i18n.locale==='he'"
        @after-change="showCurrentSlide($event)"
      >
        <section
          :class="{'rtl' : $i18n.locale==='he'}"
          class="slide"
          v-for="(slide,i) in intro"
          v-bind:key="'slide'+i"
        >
          <div class="welcome-image-container">
            <img class="welcome-image" :src="slide.image" />
          </div>
          <div class="welcome-text">
            <p v-html=" $t(`welcome[${i}]`)"></p>
          </div>
        </section>
      </VueAgile>
      <div class="buttons">
        <a
          @click="$refs.carousel.goToPrev()"
          :class="{'is-hidden' : currentSlide<1}"
        >{{$t('actions.previous')}}</a>
        <div
          v-if="currentSlide<2"
          style="display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: baseline;"
        >
          <a
            @click="initiateUser()"
            style="padding-left:1em;padding-right:1em"
          >{{$t('actions.skip')}}</a>
          <div class="button is-primary" @click="$refs.carousel.goToNext()">{{$t('actions.next')}}</div>
        </div>
        <div class="button is-primary" v-else @click="initiateUser()">{{$t('actions.start')}}</div>
      </div>
      <div class="lang-selector subtext">
        <a
          v-for="(lang, i) in langs"
          :key="`Lang${i}`"
          @click="$emit('changeLocale', lang.code); $root.$i18n.locale=lang.code"
          style="padding-left:1em;padding-right:1em"
          :value="lang.code"
        >{{ lang.lang }}</a>
      </div>
    </div>
    <div v-else-if="phase===1">
      <!-- getting cookie -->
      <div></div>
    </div>
    <div v-else>
      <div class="welcome-text">
        <div>{{$t('sources.select')}}</div>
      </div>
      <Sources :cards="cards" :selectedSources="selectedSources" @selectSource="selectSource" />
      <div class="buttons">
        <div @click="$emit('initApp')" class="button is-primary">{{$t('actions.continue')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sources from "@/components/Sources.vue";

import { VueAgile } from "vue-agile";

import * as Cookies from "js-cookie";

export default {
  name: "Welcome",
  props: {
    selectedSources: { type: Object },
    cards: { type: Array },
    init: { type: Boolean },
    locale: { type: String },
  },
  components: {
    Sources,
    VueAgile,
  },
  methods: {
    selectSource(source) {
      this.$emit("selectSource", source);
    },
    showCurrentSlide({ currentSlide }) {
      this.currentSlide = currentSlide;
    },
    async initiateUser() {
      this.phase = 1;
      fetch("https://feedbackend.herokuapp.com/userInit")
        .then((res) => {
          if (!res.ok) {
            console.log("error initiating user");
          }
          // console.log(res.json());
          return res;
        })
        .then((res) => res.json())
        .then((data) => {
          this.$emit("setUsername", data.username);
          // this.username = data.username;
          Cookies.set("apollo-token", data.jwt, {
            sameSite: "Strict",
            secure: true,
            expires: 90,
          });
          this.phase = 2;
        });
      // this.username = "username";
    },
  },
  data() {
    return {
      // selectedSources: {},
      langs: [
        { lang: "עברית", code: "he" },
        { lang: "English", code: "en" },
      ],
      phase: 0,
      currentSlide: 0,
      intro: [
        {
          text: ["Go through news titles from the sources you like."],
          image: require("@/assets/illustrations/undraw_newspaper.svg"),
        },
        {
          text: [
            "Make a reading list with the articles that worth your time.",
            "Opinionate your feed and see the things that matter to you first.",
          ],
          image: require("@/assets/illustrations/undraw_options2.svg"),
        },
        {
          text: [
            "This site uses cookies, by continue using it you agree to that",
          ],
          image: require("@/assets/illustrations/undraw_cookie_love.svg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.slide {
  // padding: 2rem;
  overflow: hidden;
}
.welcome {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  // padding: 2rem;

  width: 100%;
  max-width: 500px;

  box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);
  background-color: white;
}
.welcome-image-container {
  object-fit: contain;
  justify-content: space-around;
  display: flex;
}
.welcome-image {
  max-height: 35vh;
}
.welcome-text {
  width: 100%;
  word-wrap: normal;
  display: block;
  white-space: normal;

  font-size: 1.2rem;

  box-sizing: border-box;
  padding: 1em;

  display: flex;
  flex-direction: column;
}
.buttons {
  padding-top: 2em;
  padding-bottom: 2em;
  display: flex;

  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: baseline;
}

.lang-selector {
  padding-top: 2em;
  padding-bottom: 2em;
  display: flex;

  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: baseline;
}

.is-hidden {
  visibility: hidden;
}

// Basic VueAgile styles
.agile {
  width: 100%;
  &__actions {
    margin-top: 20px;
  }
  &__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    transition-duration: 0.3s;

    &:hover {
      color: #888;
    }
  }
  &__dot {
    margin: 0 10px;

    button {
      background-color: #eee;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: block;
      height: 10px;
      font-size: 0;
      line-height: 0;
      margin: 0;
      padding: 0;
      transition-duration: 0.3s;
      width: 10px;
    }
    &:hover,
    &--current {
      button {
        background-color: #888;
      }
    }
    // background-color: rgb(102, 0, 0);
    // }
  }
  // }
}
</style>