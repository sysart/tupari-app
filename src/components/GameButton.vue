<template>
  <div class="gameButton" @click="$emit('click')">
    <img :src="imageUrl" v-bind:alt="game.name">
    <span class="gameResult">
      {{game.score || "&nbsp;"}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GameButton',
  props: ['game'],
  computed: {
    imageUrl () {
      return require(`../assets/${this.game.img}`)
    }
  }
}
</script>

<style scoped>
.gameButton {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 40vw;
  background-color: #323c48 !important;
  display: flex;
  margin: 2vmin;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.gameButton img {
  height: 40%;
}
.gameResult {
  color: #fff;
  padding: 2vh 0 0;
}
</style>
