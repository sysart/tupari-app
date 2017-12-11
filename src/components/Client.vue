<template>
  <Wrapper>
    <router-view></router-view>
  </Wrapper>
</template>

<script>
import { mapState } from 'vuex'
import { attach } from '@/firebase'

export default {
  name: 'Client',

  computed: {
    ...mapState(['user'])
  },

  methods: {
    leaveSession () {
      this.$store.dispatch('leaveSession')
    }
  },

  watch: {
    user (newUser, oldUser) {
      if (newUser && oldUser && oldUser.name && !newUser.name) {
        this.$router.replace({ name: 'start' })
      }
    }
  },

  mounted () {
    attach(this.$route.params.session)
      .then(({ userRef, team }) => {
        this.$store.commit('setTeam', team)
        this.$store.dispatch('bindRef', { key: 'user', ref: userRef })
      }, (error) => {
        console.error(error)
        this.$router.replace({ name: 'start' })
      })
  },

  beforeDestroy () {
    this.$store.commit('clearTeam')
    this.$store.dispatch('unbindRef', 'user')
  }
}
</script>
