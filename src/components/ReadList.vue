<template>
  <div class="read-list">
    <ul>
      <transition-group name="list-complete">
        <li v-for="(item,index) in list" v-bind:key="item._id" class="read-item fluid">
          <div class="fluid-container space-between">
            <a
              :class="[item.source.rtl ? 'rtl' : 'ltr']"
              v-bind:href="item.link"
              target="_blank"
              @click="lastRead=item._id"
              style="flex-grow:2"
            >{{item.title}} - {{item.source.name}}</a>
            <div class="read-buttons">
              <button
                class="button is-icon read-button"
                v-if="lastRead===item._id"
                @click="dismiss(index,1)"
              >
                <img src="@/assets/icons/thumbs-down.svg" class="small-icon" />
              </button>
              <button
                class="button is-icon read-button"
                v-if="lastRead===item._id"
                @click="dismiss(index,1)"
              >
                <img src="@/assets/icons/thumbs-up.svg" class="small-icon" />
              </button>
              <button class="button is-icon read-button" @click="dismiss(index,1)">
                <img src="@/assets/icons/x.svg" class="small-icon" />
              </button>
            </div>
          </div>
        </li>
        <li v-bind:key="'eof'" v-if="list.length!==0" class="read-item read-bottom">
          <a class="button is-circle" @click="dismiss(0,list.length)">
            <img src="@/assets/icons/x.svg" class="small-icon" />
          </a>
        </li>
        <li v-bind:key="'empty'" class="read-item read-bottom" v-else>{{$t('readList.empty')}}</li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ReadList",
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {
      lastRead: -1,
    };
  },
  watch: {
    lastRead(nowRead, beforeRead) {
      const remove = this.list.find((item) => item._id === beforeRead);
      if (remove) {
        this.dismiss(remove._id, 1);
      }
    },
  },
  methods: {
    dismiss(index, m) {
      this.list.splice(index, m);
    },
    readFirst() {
      const firstItem = this.lastRead === this.list[0]._id ? 1 : 0;
      window.open(this.list[firstItem].link);
      this.$set(this, "lastRead", this.list[firstItem]._id);
    },
  },
};
</script>

<style lang="scss">
.small-icon {
  height: 1.2em;
}

.read-buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 1em;
  margin-right: 1em;
}
.read-button {
  margin: 0.1rem !important;
}
.read-bottom {
  justify-content: space-around !important;
  display: flex;
  margin-bottom: 10rem;
}
.read-item {
  align-items: center;
  border-top: 1px solid #ededed;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;

  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
}
.list-complete-leave-active {
  position: absolute;
}
</style>