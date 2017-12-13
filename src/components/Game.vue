<template>
  <div class="gameSelected">
    <div class="hero">
      <button class="back" @click="$router.push({ name: 'home' })">
        <img src="/static/images/takaisin.svg" >
      </button>
      <h2 class="gameName">{{game.name}}</h2>
    </div>

    <form @submit.prevent="updateResult" novalidate v-if="game.id != 'meet'">
      <md-card class="md-accent">
        <md-card-content>
          <div class="previous" v-if="previousResult">
            {{game.prevResult}}: {{previousResult}}
          </div>
          <div>
            <TimeInput v-model="result" v-if="game.inputMode == 'time'" :label="game.inputLabel" />
            <NumberInput v-model="result" v-if="game.inputMode == 'number'" :label="game.inputLabel" :min="game.min" :max="game.max" />
            <ScoreInput @input="updateResult" v-model="result" v-if="game.inputMode == 'score'" :label="game.inputLabel" />
          </div>
        </md-card-content>
        <md-card-actions v-if="game.inputMode != 'score'">
          <md-button type="submit" class="md-raised md-primary" :disabled="result === null">
            Päivitä
          </md-button>
        </md-card-actions>
      </md-card>
    </form>

    <form @submit.prevent="meet" novalidate v-if="game.id == 'meet'">
      <md-card class="md-accent" >
        <md-card-content>
          <h1>{{user && user.code}}</h1>
          <div v-if="user.meets">
            Olet tavannut:
            <div v-for="(meet, meetKey) in user.meets" :key="meetKey">
              {{meet.name}}
            </div>
          </div>
          <md-field>
            <label>Koodi</label>
            <md-input
              type="number"
              :min="1000"
              :max="9999"
              :step="1"
              v-model="code"
            ></md-input>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="!code">
            Tutustu
          </md-button>
        </md-card-actions>
      </md-card>
    </form>

    <md-card class="md-primary" v-if="game.info">
      <md-card-content>
        <p>{{game.info}}</p>
      </md-card-content>
    </md-card>

    <md-card class="md-primary" v-if="game.scoreMap">
      <md-card-content>
        <h2>Pistejakauma</h2>
        <div v-for="(result, score) in game.scoreMap" :key="score">
            <span>{{result}}</span>
            ->
            <span>{{score}}p</span>
        </div>
      </md-card-content>
    </md-card>

    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showError" md-persistent>
      <span>{{errorMessage}}</span>
      <md-button class="md-accent" @click="errorMessage = null">Sulje</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import { GAMES } from '@/stuff'
import { mapState } from 'vuex'
import TimeInput from './TimeInput'
import NumberInput from './NumberInput'
import ScoreInput from './ScoreInput'

export default {
  name: 'Game',
  components: {
    TimeInput,
    NumberInput,
    ScoreInput
  },
  data () {
    return {
      result: null,
      code: null,
      errorMessage: null
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
    showError: {
      get () {
        return !!this.errorMessage
      },
      set (value) {
        if (!value) {
          this.errorMessage = null
        }
      }
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
    meet () {
      this.$store.dispatch('meet', parseInt(this.code, 10))
        .then((otherUser) => {
          const result = Object.keys(this.user.meets || {}).length + 1
          if (result <= 6) {
            this.$store.dispatch('updateResult', { game: this.game, result, otherUser })
          }
        }, (error) => {
          this.errorMessage = error.message
        })
        .then(() => {
          this.code = ''
        })
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

.md-card {
  margin: 16px;
  vertical-align: top;
}

.hero {
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.gameName {
  color: #fff;
  flex: 1;
  text-align: center;
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

.done {
  background: #fff;
  color: #323c48;
  margin: 4vmin;
  width: 80%;
  height: 80px;
}
</style>
