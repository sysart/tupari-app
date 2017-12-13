<template>
  <Wrapper>
    <div class="column c1">

      <div class="box slim trans logo">
        <img src="/static/images/logo.png">
        <p class="slogan">avaa</p>
        <h2 class="session">sysart.io</h2>
      </div>

      <Messages :messages="session && session.messages"/>

    </div>
    <div class="column c2">
      <div class="box scoreboard">
        <table>
          <thead>
            <tr>
              <th></th>
              <th v-for="game in games" :key="game.id" class="events">
                <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teamScore in teamScores" :key="teamScore.name">
            <td class="left" >{{teamScore.name}}
              <div class="members"><img v-for="member in teamScore.members" :key="member.index" src="/static/images/koko.svg"></div>
            </td>
            <td v-for="result in teamScore.results" :key="result.index" class="events">
              {{result}}
            </td>
            <td class="right">{{teamScore.total}}p</td>
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
                <td class="right">{{player.score}}p</td>
              </tr>
            </tbody>
          </table>
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

export default {
  name: 'Screen',
  components: {
    Messages,
    Wrapper
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
.session {
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

.c1 {
  max-width: 30vw;
}

.logo {
  background: transparent;
  justify-content: center;
  flex-direction: column;
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
  font-size: 30px;
  line-height: 30px;
  border-collapse: collapse;
}
.members {
  width: 100%;
  height: 20px;
  bottom: 0;
}
.members img{
  height: 15px;
  position: absolute;
  margin-right: 5px;
}
tr {
  padding: 10px 0;
}
td {
  border-bottom: 1px solid #fff;
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

</style>

