<template>
  <div class="wrapper">

    <div class="box logo">
      <h2 class="session">{{sessionKey}}</h2>
      <p class="slogan">kotikisat</p></div>
    <div class="box livescore">
      <div class="notification">
        Notifikaatio
        </div>
      
      </div>
    <div class="box scoreboard">
      <h2>Tulokset</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <!-- <th><img :src="getImgUrl('koko.svg')"></th> -->
            <th v-for="game in games" :key="game.id" class="events">
              <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teamScore in teamScores" :key="teamScore.name">
          <td class="left" >{{teamScore.name}}</td>
          <!-- <td>{{teamScore.members}}</td> -->
          <td v-for="result in teamScore.results" :key="result.index" class="events">
            {{result}}
          </td>
          <td class="right">{{teamScore.total}}</td>
          </tr>
        </tbody>
      </table>

      </div>
    <div class="box stats">
      <h2>Pelaajia yhteensä</h2>
      <p class="huge">{{totalPlayers}}</p>
      
    </div>
    <div class="box mvps">
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
    this.$store.dispatch('bindRef', { key: 'session', ref: sessionRef(this.sessionKey) })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'session')
  }
}
</script>

<style>
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 0;
  margin: 0;
}

table {
  width: 80%;
}
.top {
  width: 50%;
}
.top td {
  padding-top: 0;
}
th,td {
  text-align: center;
  padding: 1vmin;
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
  font-size: 6em;
  line-height: 1em;
}
h2 {
  font-weight: 100;
  color: #758190;
  text-transform: lowercase;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: grid;
  display: -ms-grid;
  grid-template-columns: 1fr 1fr 1fr;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  -ms-grid-rows: 1fr 1fr 1fr;
  width: 100vw;
  height: 100vh;
  background: #2a323c;
  padding: 2vmin;
}

.box {
  background: #323c48;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  font-size: 2em;
  margin: 2vmin;
}

.logo {
  grid-column-start: 1;
  grid-row-start: 1;
  -ms-grid-column: 1;
  -ms-grid-row: 1;
  background: transparent;
  justify-content: center;
}
.session {
  font-size: 4em;
}
.slogan {
  font-size: 2em;
}

.livescore {
  grid-column-start: 1;
  grid-row-start: 2;
  -ms-grid-column: 1;
  -ms-grid-row: 2;
  background: transparent;
  overflow: hidden;
  grid-row-end: 4;
}
.notification {
  padding: 1em 0;
  text-align: center;
  background: #323c48;
  color: #fff;
  width: 100%;
  margin: 1vmin 0;
}
.scoreboard {
  grid-column-start: 2;
  grid-row-start: 1;
  -ms-grid-column: 2;
  -ms-grid-row: 1;
  grid-column-end: 4;
  grid-row-end: 3;
  -ms-grid-column-span: 2;
  -ms-grid-row-span: 2;
}

.stats {
  grid-column: 2;
  grid-row-start: 3;
  -ms-grid-column: 2;
  -ms-grid-row: 3;
}

.mvps {
  grid-column: 3;
  grid-row-start: 3;
  -ms-grid-column: 3;
  -ms-grid-row: 3;
}

</style>

