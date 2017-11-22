<template>
  <div>
    <Start v-if="!isLoggedIn"/>
    <div v-else>
      moi {{user.name}}
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
    }
  },
  methods: {
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
