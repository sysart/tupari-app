<template>
  <div class="gameButton" :class="{ played: game.score }" @click="$emit('click')">
    <img :src="imageUrl" v-bind:alt="game.name">
    <p>{{game.name}}</p>
    <span class="gameResult">
      <Stars :value="game.score" v-if="game.score"/>
    </span>
  </div>
</template>

<script>
import Stars from './Stars'

export default {
  name: 'GameButton',
  props: ['game'],
  components: {
    Stars
  },
  computed: {
    imageUrl () {
      return `/static/images/${this.game.img}`
    }
  }
}
</script>

<style lang="scss" scoped>
.gameButton {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 40vw;
  background-color: rgba(50, 60, 72, 0.9);
  display: flex;
  margin: 2vmin;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 4px 2px 10px rgba(0,0,0,0.3);
  border: 1px solid #48525d;

  &.played {
    background-color: rgba(100, 60, 100, 0.9);
  }
}
/* .gameButton img,
.gameButton p,
.gameResult {
  flex: 1;
} */
.gameButton img {
  height: 40%;
  max-height: 2rem;
}
.gameButton p {
  color: #fff;
  font-weight: 700;
  margin: 1vh 0;
  text-transform: uppercase;
  line-height: 1;
}
.gameResult {
  display: block;
  color: #fff;
  line-height: 1;
  min-height: .875rem;
  /* padding: 2vh 0 0; */
}
</style>
