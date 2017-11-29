<template>
  <div>
    mo
  </div>
</template>

<script>
import { teamsRef } from '@/firebase'

export default {
  name: 'Teams',
  computed: {
    session () {
      return this.$route.params.session
    }
  },
  created () {
    this.$store.dispatch('bindRef', { key: 'teams', ref: teamsRef(this.session) })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'teams')
  }
}
</script>
