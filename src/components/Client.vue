<template>
  <div >
    <Start v-if="!isLoggedIn"/>

      <div v-if="isLoggedIn && selectedGame == null" class="buttonWrap">
        <div class="menubar">
          {{user.name}}
        </div>
        <v-container fluid grid-list-md>
          <v-layout row wrap class="games">
            <v-flex d-flex xs6 sm6 md2 child-flex
            v-for="game in games" :key="game.id"
            @click="selectedGame = game.id"
            class="gameButton">
              <v-card dark elevation-15>
                <img :src="getImgUrl(game.img)" v-bind:alt="game.name">
                <v-card-text>
                  {{game.result}} / {{game.max}}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn @click="leaveSession">Leave Session</v-btn>
      </div>

      <Game
        v-for="game in games"
        :key="game.id"
        v-if="isLoggedIn && selectedGame == game.id"
        :previousResult="game.result"
        :game="game"
        @updateResult="updateResult"
        @back="selectedGame = null"
      />


  </div>
</template>

<script>
import Start from "./Start";
import Game from "./Game";
import { mapState } from "vuex";
import { userRef$, scoreboard } from "@/firebase";
import { GAMES } from "@/stuff";

export default {
  name: "Client",

  components: {
    Start,
    Game
  },

  computed: {
    isLoggedIn() {
      return this.user && this.user.name;
    },
    games() {
      const results = (this.user && this.user.games) || {};
      return GAMES.map(game => {
        return {
          ...game,
          result: results[game.id]
        };
      });
    },
    ...mapState(["user"])
  },

  data() {
    return {
      selectedGame: null
    };
  },

  methods: {
    updateResult(gameId, result) {
      this.$store.dispatch("updateResult", { game: gameId, result });
      this.selectedGame = null;
    },
    leaveSession() {
      this.$store.dispatch("leaveSession");
    },
    getImgUrl(pic) {
    return require('../assets/'+pic)
    }
  },

  created () {
    this.subscription = userRef$.subscribe((ref) => {
      if (ref) {
        this.$store.dispatch('bindRef', { key: 'user', ref })
      } else {
        this.$store.dispatch('unbindRef', 'user')
      }
    })
  },

  destroyed () {
    this.subscription.unsubscribe()
    this.$store.dispatch('unbindRef', 'user')
  }
};
</script>

<style scoped>
.grid-list-md {
  padding: 0;
}
.menubar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.card {
  background: linear-gradient(to bottom, #FF8818, #F06712);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
}
.card img {
  padding: 10px;
}
.card__text {
    padding: 10px;
    text-align: center;
}
.gameButton {
  display: flex;
  justify-content: center;
  width: 100px;
}
</style>
