<template>
  <div class="gameSelected">
      <button class="bigButton back" @click="$emit('back')">
        <img :src="getImgUrl('takaisin.svg')" >
      </button>
      <div class="hero">
        <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
        <h2>{{game.name}}</h2>
      </div>

    <div v-if="previousResult">
      Previous result {{previousResult}}
    </div>
    <v-form @submit.prevent="updateResult" novalidate class="text-xs-center" dark>
      <div>
        <TimeInput v-model="result" v-if="game.inputMode == 'time'" :label="game.inputLabel" dark/>
        <NumberInput v-model="result" v-if="game.inputMode == 'number'" :label="game.inputLabel" :min="game.min" :max="game.max" dark />
      </div>
      <button class="bigButton done" @click="updateResult" :disabled="result === null">Päivitä</button>
      <!-- <v-btn type="button" @click="$emit('back')">Back</v-btn> -->
    </v-form>
  </div>
</template>

<script>
import TimeInput from './TimeInput'
import NumberInput from './NumberInput'

export default {
  name: 'Game',
  components: {
    TimeInput,
    NumberInput
  },
  props: {
    previousResult: [String, Number],
    game: Object
  },
  data () {
    return {
      result: null
    }
  },
  methods: {
    updateResult () {
      if (this.result !== null) {
        this.$emit('updateResult', this.game, this.result)
      }
    },
    getImgUrl (pic) {
      return require('../assets/' + pic)
    }
  }
}
</script>
<style scoped>
.bigButton {
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 100%;
}
.gameSelected {
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.hero {
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  flex-direction: column
}
h2 {
  color: #fff;
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  background: #323c48;
  margin: 4vmin 0 0;
}
.back img {
  height: 40%;
}
.done {
  background: #323c48;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 4vmin;
  width: 92vw;
}
:disabled {
  display: none;
}
.primary--text {
    color: #fff !important;
}
</style>
