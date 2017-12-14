<template>
  <div class="gameSelected">
    <PageHeader :title="game.name" :image="game.img" backTo="home" />

    <form @submit.prevent="updateResult" novalidate v-if="game.id != 'meet'" class="gameResultForm">
      <md-card class="md-accent">
        <md-card-content>
          <div class="previous" v-if="previousResult">
            {{game.prevResult}}: <strong>{{previousResult}}</strong>
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

    <form @submit.prevent="meet" novalidate v-if="game.id == 'meet'" class="gameResultForm">
      <md-card class="md-accent" >
        <md-card-content>
          <div class="code-container">
          <h3>Salainen koodisi on:</h3>
          <h1>{{user && user.code}}</h1>
          </div>
   
          <div v-if="user.meets">
            Olet tavannut:
            <div v-for="(meet, meetKey) in user.meets" :key="meetKey">
              {{meet.name}}
            </div>
          </div>
          <md-field>
            <label>Kilpailijan koodi...</label>
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

    <section class="gameTabs">
      <md-tabs class="md-primary" md-alignment="fixed">
        <md-tab id="tab-help" md-label="Ohjeet" v-if="game.info">
          <p>{{game.info}}</p>
        </md-tab>
        <md-tab id="tab-points" md-label="Pisteytys" v-if="game.scoreMap">
          <div v-for="(result, score) in game.scoreMap" :key="score">
            <Stars :value="parseInt(score, 10)"/>
            {{result}}
          </div>
        </md-tab>
        <md-tab id="tab-results" md-label="Tulokset" v-if="scoreboard && scoreboard.length">
          <ScoreBoard :scoreboard="scoreboard"/>
        </md-tab>
      </md-tabs>
    </section>

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
import PageHeader from './PageHeader'
import Stars from './Stars'
import { getSession, getSessionRef } from '@/firebase'
import { gameScoreboard } from '@/computer'
import ScoreBoard from './ScoreBoard'

export default {
  name: 'Game',
  components: {
    TimeInput,
    NumberInput,
    ScoreInput,
    PageHeader,
    Stars,
    ScoreBoard
  },
  data () {
    return {
      result: null,
      code: null,
      errorMessage: null,
      scoreboard: null
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
  mounted () {
    getSession(getSessionRef(this.$route.params.session))
      .then(session => {
        this.scoreboard = gameScoreboard(session, this.game.id)
      })
  },
  methods: {
    updateResult () {
      if (this.result !== null) {
        const game = this.game
        const result = this.result

        this.$router.push({
          name: 'home'
        })

        this.$store.dispatch('updateResult', { game, result })
      }
    },
    meet () {
      this.$store.dispatch('meet', parseInt(this.code, 10))
        .then(({ otherUser, result }) => {
          this.$store.dispatch('updateResult', { game: this.game, result, otherUser })
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

<style lang="scss" scoped>
.gameSelected {
  color: #bbb;
  display: flex;
  flex-direction: column;
}

.input-group__input input {
  background: blue !important;
  text-align: center !important;
}

.done {
  background: #fff;
  color: #323c48;
  margin: 4vmin;
  width: 80%;
  height: 80px;
}

.gameResultForm {
  flex: 1;
  margin: 0 0 1.5em;

  .md-card {
    vertical-align: top;
    background-color: rgba(50, 60, 72, 0.9);
    box-shadow: 4px 2px 10px rgba(0,0,0,0.3);
    border: 1px solid #48525d;
  }

  .previous {
    font-size: 1rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    text-align: center;
  }
  .code-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
