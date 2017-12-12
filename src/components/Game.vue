<template>
  <div class="gameSelected">
    <div class="hero">
      <button class="back" @click="$router.push({ name: 'home' })">
      <img :src="getImgUrl('takaisin.svg')" >
    </button>
      <h2 class="gameName">{{game.name}}</h2>
    </div>
    <div class="previous" v-if="previousResult">
      Aikaisempi tulos: {{previousResult}}
    </div>
    <form @submit.prevent="updateResult" novalidate class="text-xs-center" dark>
      <div>
        <TimeInput v-model="result" v-if="game.inputMode == 'time'" :label="game.inputLabel" dark/>
        <NumberInput v-model="result" v-if="game.inputMode == 'number'" :label="game.inputLabel" :min="game.min" :max="game.max" dark />
      </div>
      <md-button type="submit" class="md-raised md-primary" :disabled="result === null">
        Päivitä
      </md-button>
    </form>
    <div class="information">
      <div v-if="game.info">
          <p>{{game.info}}</p>
      </div>
      <div class="scoreMap" v-if="game.scoreMap">
        <h2>Pistejakauma</h2>
        <div v-for="(result, score) in game.scoreMap" :key="score">
           <span>{{result}}</span>
           ->
           <span>{{score}}p</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GAMES } from '@/stuff'
import { mapState } from 'vuex'
import TimeInput from './TimeInput'
import NumberInput from './NumberInput'

export default {
  name: 'Game',
  components: {
    TimeInput,
    NumberInput
  },
  data () {
    return {
      result: null
    }
  },
  computed: {
    game () {
      const gameId = this.$route.params.game
      const game = GAMES.find(game => game.id === gameId)
      const results = (this.user && this.user.games) || {}
      const result = results[gameId]

      return {
        ...game,
        score: result && result.score,
        result: result && result.result
      }
    },
    previousResult () {
      return this.game && this.game.result
    },
    ...mapState(['user'])
  },
  methods: {
    updateResult () {
      if (this.result !== null) {
        this.$store.dispatch('updateResult', { game: this.game, result: this.result })
          .then(() => {
            this.$router.push({
              name: 'home'
            })
          })
      }
    },
    getImgUrl (pic) {
      return require('../assets/' + pic)
    }
  }
}
</script>
<style scoped>

.gameSelected {
  color: #bbb;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.hero {
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
h2 {
  color: #758190;
}
.gameName {
    flex: 1;
    text-align: center;
}
form {
  background-color: #323c48 !important;
  padding: 20px;
}
.scoreMap {
  text-align: center;
}
.scoreMap span {
  padding: 2px 10px;
  font-size: 1.2em;
}
.previous {
  text-align: center;
  color:758190;
  margin:0 0 10px;
}
.input-group__input input {
  background: blue !important;
  text-align: center !important;
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  background: #323c48;
  border-radius: 50%;
}
.back img {
  height: 40%;
}
.information {
  margin: 40px 0;
  padding: 20px;
  color: #fff;
  background: #2a323c;
}
.done {
  background: #fff;
  color: #323c48;
  margin: 4vmin;
  width: 80%;
  height: 80px;
}
:disabled {
  display: none;
}
.primary--text {
    color: #fff !important;
}
</style>
