<template>
  <div class="scoreContainer">
    <div class="buttonContainer" v-for="value in buttons" :key="value">
      <md-button @click="select(value)" class="md-raised md-primary">
        {{value}}
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreInput',
  methods: {
    select (value) {
      this.$emit('input', value)
    }
  },
  data () {
    return {
      buttons: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style lang="scss" scoped>
.scoreContainer {
  display: flex;
  flex-wrap: wrap;
}

.buttonContainer {
  width: percentage(1/3);
  padding: 4px;

  &:after {
    content: "";
    display: block;
    padding-bottom: 50%;
  }
}

.md-button {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
