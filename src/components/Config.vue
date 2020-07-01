<template>
  <div>
    <ul>
      <!-- <li class="config-item">
        <div class="config-title">Preferences</div>Show items from
        <span class="select">
          <select>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </span>ago
      </li>-->
      <li class="config-item">
        <div class="config-title">About</div>
        <div>Designed and developed with care by Idan Amati</div>
      </li>
      <li class="config-item config-bottom"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Config"
};
</script>

<style lang="scss">
.config-item {
  //   align-items: center;
  border-top: 1px solid #ededed;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
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