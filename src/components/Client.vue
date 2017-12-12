<template>
  <Wrapper>
    <transition :name="transitionName">
      <router-view class="router-view"></router-view>
    </transition>
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

  data () {
    return {
      transitionName: 'slide-right'
    }
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
  },

  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split(/\/./).length
    const fromDepth = from.path.split(/\/./).length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  width: 100%;
  padding: 1em;
  position: absolute;
  transition: all .5s;
}
</style>

<style lang="scss">
.slide-left-enter, .slide-right-leave-active {
  -webkit-transform: translate(100vw, 0);
  transform: translate(100vw, 0);
}
.slide-left-leave-active, .slide-right-enter {
  -webkit-transform: translate(-100vw, 0);
  transform: translate(-100vw, 0);
}
</style>
