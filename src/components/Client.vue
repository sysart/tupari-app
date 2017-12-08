<template>

  <div class='wrapper'>
    <Start v-if='!isLoggedIn'/>

      <div v-if='isLoggedIn && selectedGame == null' class='mainMode'>
        <div class='infoBar'>
          <span class='userName'>{{user.name}}</span>

        </div>
        <div class='gameSelect'>
          <div
          v-for='game in games' :key='game.id'
          @click='selectedGame = game.id'
          class='gameButton'>

              <img :src='getImgUrl(game.img)' v-bind:alt='game.name'>
              <span class='gameResult'>
                {{game.score || '&nbsp;'}}
              </span>
            </v-card>
          </div>
        </div>
      <div class='regards'>
        <h2 class='session'>sysart</h2>
        <p class='slogan'>tuparit</p>
      </div>
        <!-- <v-btn @click='leaveSession'>Leave Session</v-btn> -->
      </div>

      <Game
        v-for='game in games'
        :key='game.id'
        v-if='isLoggedIn && selectedGame == game.id'
        :previousResult='game.result || game.score'
        :game='game'
        @updateResult='updateResult'
        @back='selectedGame = null'
      />

  </div>
</template>

<script>
import Start from './Start'
import Game from './Game'
import { mapState } from 'vuex'
import { userRef$, teamRef$ } from '@/firebase'
import { GAMES } from '@/stuff'
import { Observable } from 'rxjs'

export default {
  name: 'Client',

  components: {
    Start,
    Game
  },

  computed: {
    isLoggedIn () {
      return this.user && this.user.name
    },
    games () {
      const results = (this.user && this.user.games) || {}
      return GAMES.map(game => {
        const result = results[game.id]
        return {
          ...game,
          score: result && result.score,
          result: result && result.result
        }
      })
    },
    ...mapState(['user'])
  },

  data () {
    return {
      selectedGame: null
    }
  },

  methods: {
    updateResult (gameId, result) {
      this.$store.dispatch('updateResult', { game: gameId, result })
      this.selectedGame = null
    },
    leaveSession () {
      this.$store.dispatch('leaveSession')
    },
    getImgUrl (pic) {
      return require('../assets/' + pic)
    }
  },

  created () {
    this.subscription = Observable.combineLatest(userRef$, teamRef$).subscribe(([userRef, teamRef]) => {
      if (userRef && teamRef) {
        this.$store.dispatch('bindRef', { key: 'user', ref: userRef })
        this.$store.dispatch('bindRef', { key: 'team', ref: teamRef })
      } else {
        this.$store.dispatch('unbindRef', 'user')
        this.$store.dispatch('unbindRef', 'team')
      }
    })
  },

  beforeDestroy () {
    this.subscription.unsubscribe()
    this.$store.dispatch('unbindRef', 'user')
  }
}
</script>

<style scoped>
.wrapper {
  background: #2a323c !important;
  padding: 0 4vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.grid-list-md {
  padding: 0;
}
.infoBar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
}

.infoValue {
  color: #fff;
  font-size: 3em;
}
.card img {
  padding: 10px;
}
.card__text {
  padding: 10px;
  text-align: center;
}
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
.gameSelect {
  flex:1;
  display: flex;
  flex-wrap: wrap;
}
.regards {
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:1em;
}
.session {
  font-size: 3em;
  font-weight: 100;
  line-height: 1em;
  color: #323c48;
}
.gameResult {
  color: #fff;
  padding: 2vh 0 0;
}
.slogan {
  font-size: 1em;
  color: #fff;
  margin: 0;
}
.mainMode {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
