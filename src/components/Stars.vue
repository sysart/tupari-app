<template>
  <span>
    <span v-for="n in 6" :key="n">
      <md-icon class="star" v-if="n <= value">star</md-icon>
      <md-icon class="star_border" v-else>star_border</md-icon>
    </span>
  </span>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    value: Number
  }
}
</script>

<style lang="scss" scoped>
.star {
  color: #ffff00 !important;
}

.star_border {
  color: rgba(0, 0, 0, 0.25) !important;
}

.md-icon {
  width: 12px;
  height: 12px;
  min-width: 12px;
  font-size: 12px !important;
}
</style>
