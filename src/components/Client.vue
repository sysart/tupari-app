<template>
  <Wrapper>
    <router-view></router-view>
  </Wrapper>
</template>

<script>
import { mapState } from 'vuex'
import { userRef$, teamRef$ } from '@/firebase'

import { Observable } from 'rxjs'

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

  created () {
    this.subscription = Observable.combineLatest(userRef$, teamRef$).subscribe(([userRef, teamRef]) => {
      if (userRef && teamRef) {
        this.$store.dispatch('bindRef', { key: 'user', ref: userRef })
        this.$store.dispatch('bindRef', { key: 'team', ref: teamRef })
      } else {
        this.$store.dispatch('unbindRef', 'user')
        this.$store.dispatch('unbindRef', 'team')
      }
    })
  },

  beforeDestroy () {
    this.subscription.unsubscribe()
    this.$store.dispatch('unbindRef', 'user')
  }
}
</script>
