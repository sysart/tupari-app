<template>
  <div class="wrapper">
    <div class="column c1">

      <div class="box slim trans logo">
        <p class="slogan">{{sessionKey}}</p>
        <h2 class="session">sysart.io</h2>

      </div>

      <Messages :messages="session && session.messages"/>

    </div>
    <div class="column c2">
      <div class="box scoreboard">
        <h2>Tulokset</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th><img :src="getImgUrl('koko.svg')"></th>
              <th v-for="game in games" :key="game.id" class="events">
                <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teamScore in teamScores" :key="teamScore.name">
            <td class="left" >{{teamScore.name}}</td>
            <td>{{teamScore.members}}</td>
            <td v-for="result in teamScore.results" :key="result.index" class="events">
              {{result}}
            </td>
            <td class="right">{{teamScore.total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row slim">
        <div class="box stats">
          <h2>Pelaajia yhteensä</h2>
          <p class="huge">{{totalPlayers}}</p>
        </div>
        <div class="box top">
          <h2>Top 3</h2>
          <table class="top">
            <tbody>
              <tr v-for="player in bestPlayers" :key="player.index">
                <td class="left name">{{player.name}}</td>
                <td class="right">{{player.score}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSessionRef } from '@/firebase'
import { mapState } from 'vuex'
import * as _ from 'lodash'
import { GAMES, GAME_IDS } from '@/stuff'
import Messages from './Messages'

export default {
  name: 'Screen',
  components: {
    Messages
  },
  data () {
    return {
      games: GAMES
    }
  },
  methods: {
    getImgUrl (pic) {
      return require('../assets/' + pic)
    }
  },
  computed: {
    sessionKey () {
      return this.$route.params.session
    },
    totalPlayers () {
      if (!this.session) return null

      return _(this.session.teams)
      .filter(team => team.members)
        .reduce((sum, team) => {
          return sum + Object.keys(team.members).length
        }, 0)
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
            emoji: team.emoji,
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
        .take(3)
        .value()
    },
    ...mapState(['session'])
  },
  mounted () {
    this.$store.dispatch('bindRef', { key: 'session', ref: getSessionRef(this.sessionKey) })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'session')
  }
}
</script>

<style scoped>
html, body {
  margin:0;
}

.wrapper {
  display: flex;
  background: #2a323c;
  max-height: 100vh;
}

/* Layout */
.column {
  flex: 1;
  justify-content: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.c1 {
  padding-top: 1vmin;
  padding-left: 1vmin;
  padding-right: 0;
  padding-bottom: 1vmin;
}

.c2 {
  padding-top: 1vmin;
  padding-left: 0;
  padding-right: 1vmin;
  padding-bottom: 1vmin;
}

.row {
  flex: 1;
  display: flex;
  max-height: 30vh;
}

.c1 {
  max-width: 30vw;
}

.logo {
  background: transparent;
  justify-content: center;
  flex-direction: column;
}

.trans {
  background: transparent !important;
  border: 0 !important;
}

.session {
  font-size: 9vmin;
  line-height: 1em;
}

.slogan {
  font-size: 2em;
}

.slim {
  max-height: 30vh;
}

.address {
  color: #2a323c;
  font-weight: bold;
}
.box {
  background: #323c48;
  border: 1px solid #48525d;
  color: #fff;
  flex: 1;
  display:flex;
  margin: 1vmin;
  align-items: center;
  justify-content:center;
  flex-direction: column;
}
p {
  margin-bottom: 0;
}
table {
  width: 80%;
  font-size: 20px;
}
.top {
  width: 50%;
}
.top td {
  padding-top: 0;
}
th,td {
  text-align: center;
  padding: .2vmin;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.name{
  text-transform: capitalize;
}
.huge {
  font-size: 8vmin;
  line-height: 1em;
}
h2 {
  font-size: 3vmin;
  font-weight: 100;
  color: #758190;
  text-transform: lowercase;
  display: flex;
  justify-content: center;
  align-items: center;
}
.livescore {
  justify-content: flex-start;
  overflow: hidden;
}

</style>

