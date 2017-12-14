<template>
  <div class="home">
    <div class="infoBar">
      <div class="infoBox">
        <label>{{user && user.name}}</label>
        <span>{{team && team.name}}</span>
      </div>
      <div class="infoBox">
        <label>pisteet</label>
        <span>{{totalScore}}</span>
      </div>
    </div>

    <div class="gameSelect">
      <GameButton
        v-for="game in games" :key="game.id"
        @click="selectGame(game)"
        class="gameButton"
        :game="game"
      />
    </div>

    <div class="chatButton">
      <md-button @click="$router.push({ name: 'chat' })"><img src="/static/images/chat.svg">Tsätti</md-button>
    </div>

    <div class="regards">
      <h2 class="session">sysart</h2>
      <p class="slogan">tuparit</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GAMES } from '@/stuff'
import GameButton from './GameButton'

export default {
  name: 'Home',

  components: {
    GameButton
  },

  computed: {
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
    totalScore () {
      return Object.values(this.user.games || {})
        .reduce((total, game) => {
          return total + game.score
        }, 0)
    },
    ...mapState(['user', 'team'])
  },

  methods: {
    selectGame (game) {
      this.$router.push({
        name: 'game',
        params: {
          game: game.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-list-md {
  padding: 0;
}

.infoBar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
  flex-wrap: wrap;
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

.infoBox {
  min-width:50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.infoBox label{
  font-size: .8em;
  color: #758190;
}

.infoBox span{
  font-size: 1.4em;
  color: #fff;
}

.gameSelect {
  flex:1;
  display: flex;
  flex-wrap: wrap;
  margin: -2vmin;
}

.regards {
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.session {
  font-size: 3em;
  font-weight: 100;
  line-height: 1em;
  color: #323c48;
  margin: 0;
}

.slogan {
  font-size: 1em;
  color: #fff;
  margin: 0;
}

.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chatButton {
  margin-top: 16px;
  background-color: #fff;
  display: flex;
  box-shadow: 4px 2px 10px rgba(0,0,0,0.3);
  border: 1px solid #fff;

  .md-button {
    color: #222;
    display: block;
    width: 100%;
  }

  img {
    max-height: 2rem;
    margin-right: .5rem;
  }
}
</style>
