<template>
  <div>
    <Start v-if="!isLoggedIn"/>
    <div v-else>
      <div v-if="selectedGame == null">
        moi {{user.name}}
        <div v-for="game in games" :key="game.id">
          <v-btn @click="selectedGame = game.id">{{game.name}}</v-btn>
        </div>
        <v-btn @click="leaveSession">Leave Session</v-btn>
      </div>

      <Game
        v-for="game in games"
        :key="game.id"
        v-if="selectedGame == game.id"
        :previousResult="game.result"
        :game="game"
        @updateResult="updateResult"
        @back="selectedGame = null"
      />
    </div>
  </div>
</template>

<script>
import Start from './Start'
import Game from './Game'
import { mapState } from 'vuex'
import { userRef$ } from '@/firebase'
import { GAMES } from '@/stuff'

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
        return {
          ...game,
          result: results[game.id]
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
    }
  },

  created () {
    this.subscription = userRef$.subscribe((ref) => {
      console.log('new ref', ref && ref.path.toString())
      if (ref) {
        this.$store.dispatch('setUserRef', ref)
      } else {
        this.$store.dispatch('unsetUserRef')
      }
    })
  }
}
</script>

<style scoped>

</style>
