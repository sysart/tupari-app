<template>
  <div class="gameButton" :class="{ played: game.score }" @click="$emit('click')">
    <img :src="imageUrl" v-bind:alt="game.name">
    <p>{{game.name}}</p>
    <span class="gameResult">
      <span v-for="n in 6" :key="n" v-if="game.score">
        <md-icon class="star" v-if="n <= game.score">star</md-icon>
        <md-icon class="star_border" v-else>star_border</md-icon>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'GameButton',
  props: ['game'],
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

  .md-icon {
    width: 12px;
    height: 12px;
    min-width: 12px;
    font-size: 12px !important;
  }
  /* padding: 2vh 0 0; */
}

.star {
  color: #ffff00 !important;
}

.star_border {
  color: rgba(0, 0, 0, 0.25) !important;
}
</style>
