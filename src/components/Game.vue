<template>
  <div>
      <div class="menubar" @click="$emit('back')">
        Takaisin
      </div>
      <div class="hero">
        <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
        <h2>{{game.name}}</h2>
      </div>

    <div v-if="previousResult">
      Previous result {{previousResult}}
    </div>
    <v-form @submit.prevent="updateResult" novalidate class="text-xs-center">
      <div>
        <TimeInput v-model="result" v-if="game.inputMode == 'time'" :label="game.inputLabel" />
        <NumberInput v-model="result" v-if="game.inputMode == 'number'" :label="game.inputLabel" :min="game.min" :max="game.max" />
      </div>
      <v-btn @click="updateResult" :disabled="result === null" large>Päivitä</v-btn>
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
.hero {
  background: linear-gradient(to bottom, #FF8818, #F06712);
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
.menubar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>
