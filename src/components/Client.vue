<template>
  <div>
    <Start v-if="!isLoggedIn"/>
    <div v-else>
      moi {{user.name}}
      <div v-for="(score, game) of user.games" :key="game">
        {{game}} {{score}}
      </div>
      <form @submit.prevent="updateScore">
        <input v-model="score"/>
      </form>
    </div>
  </div>
</template>

<script>
import Start from './Start'
import { mapState } from 'vuex'
import { userRef } from '@/firebase'

export default {
  name: 'Client',
  components: {
    Start
  },
  computed: {
    isLoggedIn () {
      return this.user && this.user.name
    },
    ...mapState(['user'])
  },
  data () {
    return {
      score: null
    }
  },
  methods: {
    updateScore () {
      this.$store.dispatch('updateScore', { game: 'ralli', score: this.score })
    }
  },
  created () {
    userRef().then(ref => {
      this.$store.dispatch('setUserRef', ref)
    })
  }
}
</script>

<style scoped>

</style>
