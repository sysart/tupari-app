<template>
  <Wrapper>
    <div class="column c1">

      <div class="box slim trans logo">
        <img src="/static/images/logo.png"><p class="domain">.io</p>
      </div>

      <Messages :messages="session && session.messages"/>

    </div>
    <div class="column c2">
      <div class="box scoreboard">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th v-for="game in games" :key="game.id" class="events">
                <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(teamScore, pos) in teamScores" :key="teamScore.name">
            <td class="position">{{pos + 1}}</td>
            <td class="left" >
              <div class="teamName">
                {{teamScore.name}}
                <span class="members"><img v-for="n in teamScore.members" :key="n" src="/static/images/koko.svg"></span>
              </div>
            </td>
            <td v-for="result in teamScore.results" :key="result.index" class="events">
              {{result}}<span class="smaller">sp</span>
            </td>
            <td class="right">{{teamScore.total}}<span class="smaller">p</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row slim">
        <div class="box stats">
          <div class="statBox">
            <h2>Pelaajia</h2>
            <p class="huge">{{totalPlayers}}</p>
          </div>
          <div class="statBox">
            <h2>Joukkueita</h2>
            <p class="huge">{{teamScores && teamScores.length}}</p>
          </div>

        </div>
        <div class="box top">
          <Scroller>
            <table class="top">
              <tbody>
                <tr v-for="(player, pos) in bestPlayers" :key="player.index">
                  <td class="left name">{{pos + 1}}. {{player.name}}</td>
                  <td class="right">{{player.score}}p</td>
                </tr>
              </tbody>
            </table>
          </Scroller>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<script>
import { getSessionRef } from '@/firebase'
import { mapState } from 'vuex'
import { GAMES } from '@/stuff'
import Messages from './Messages'
import Wrapper from './Wrapper'
import * as computer from '@/computer'
import Scroller from './Scroller'

export default {
  name: 'Screen',
  components: {
    Messages,
    Wrapper,
    Scroller
  },
  data () {
    return {
      games: GAMES
    }
  },
  methods: {
    getImgUrl (pic) {
      return `/static/images/${pic}`
    }
  },
  computed: {
    sessionKey () {
      return this.$route.params.session
    },
    totalPlayers () {
      if (!this.session) return null
      return computer.totalPlayers(this.session)
    },
    teamScores () {
      if (!this.session) return null
      return computer.teamScores(this.session)
    },
    bestPlayers () {
      if (!this.session) return null
      return computer.bestPlayers(this.session)
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
  max-height: 100vh;
}

@keyframes animatedBackground {
	from { background-position: 0 0; }
	to { background-position: 100% 0; }
}

.domain {
  font-size: 50px !important;
  margin: 0;
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
.teamName {
  position: relative;
}
.box.stats {
  justify-content: space-around;
  align-items: space-around;
  flex-direction: row !important;
  text-align: center;
}

.c1 {
  max-width: 30vw;
}

.logo {
  background: transparent;
  justify-content: center;
  flex-direction: row;
}

.logo img {
  max-width: 320px;
  margin: 0 auto;
  width: 100%;
}

.trans {
  background: transparent !important;
  border: 0 !important;
}

.slim {
  max-height: 30vh;
}

.address {
  color: #2a323c;
  font-weight: bold;
}
.box {
  position: relative;
  background: rgba(50, 60, 72, 0.9);
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
  width: 85%;
  height: 80%;
  font-size: 25px;
  line-height: 30px;
  border-collapse: collapse;
}
.position {
  font-size: 30px;
  padding-right: 20px;
  font-weight: bold;
  color: #758190;
}
.members {
  position: absolute;
  left:0;
  width: 100%;
  height: 20px;
  margin: 4px 5px 0 0;
  bottom: -10px;
}
.members img {
  height: 10px;
  margin-right: 5px;
}

tbody td:not(:first-child):not(:last-child) {
  padding: 10px 0;
  border-bottom: 1px solid #fff;
}
td {
  position: relative;
}
.top tr {
  border: 0;
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
  margin: 0;
}
h2 {
  font-size: 3vmin;
  font-weight: 100;
  color: #758190;
  text-transform: lowercase;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
}
.livescore {
  justify-content: flex-start;
  overflow: hidden;
}

.scoreboard {
  line-height: 2em;
}

.smaller {
  font-size: 0.5em;
  line-height: 40px;
  color: #aaa;
}
</style>

