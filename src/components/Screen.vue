<template>
  <div>
    <h1>Tupari-app</h1>
    <h2>Session: {{sessionKey}}</h2>
    {{session}}
  </div>
</template>

<script>
import { sessionRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Screen',
  computed: {
    sessionKey () {
      return this.$route.params.session
    },
    ...mapState(['session'])
  },
  created () {
    this.$store.dispatch('bindRef', { key: 'session', ref: sessionRef(this.sessionKey) })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'session')
  }
}
</script>
