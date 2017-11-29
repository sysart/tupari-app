<template>
  <div>
    <h1>Tupari-app</h1>
    <h2>Session: {{sessionKey}}</h2>
    <div v-for="game in games" :key="game.id">
      {{game.name}}
    </div>
    <div v-for="teamScore in teamScores" :key="teamScore.name">
      {{teamScore.name}}
      Members: {{teamScore.members}}
      {{teamScore.results}}
      {{teamScore.total}}
    </div>
    {{bestPlayers}}
  </div>
</template>

<script>
import { sessionRef } from '@/firebase'
import { mapState } from 'vuex'
import * as _ from 'lodash'
import { GAMES, GAME_IDS } from '@/stuff'

export default {
  name: 'Screen',
  data () {
    return {
      games: GAMES
    }
  },
  computed: {
    sessionKey () {
      return this.$route.params.session
    },
    teamScores () {
      if (!this.session) return null

      return _(this.session.teams)
        .map((team) => {
          const results = GAME_IDS.map(gameId => {
            return _.reduce(team.members, (score, member) => {
              return score + _.get(member, `games[${gameId}].score`, 0)
            }, 0)
          })

          const total = results.reduce((sum, score) => sum + score, 0)

          return {
            name: team.name,
            members: team.members ? Object.keys(team.members).length : 0,
            results,
            total
          }
        })
      .sortBy(['name'])
      .reverse()
      .sortBy(['total'])
      .reverse()
      .value()
    },
    bestPlayers () {
      if (!this.session) return null

      return _(this.session.teams)
        .flatMap(team => {
          return _.values(team.members)
        })
        .map(member => {
          const score = member.games ? _.reduce(member.games, (score, game) => {
            return score + game.score
          }, 0) : 0
          return {
            name: member.name,
            score
          }
        })
        .sortBy(['name'])
        .reverse()
        .sortBy(['score'])
        .reverse()
        .take(5)
        .value()
    },
    ...mapState(['session'])
  },
  mounted () {
    this.$store.dispatch('bindRef', { key: 'session', ref: sessionRef(this.sessionKey) })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'session')
  }
}
</script>
