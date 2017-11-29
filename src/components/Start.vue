<template>
  <form @submit.prevent="join">
    <v-text-field label="Name" v-model="name" />
    <v-text-field label="Session" v-model="session" />
    <v-btn @click="join">Join</v-btn>
  </form>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      name: '',
      session: '',
      secret: 'perrier'
    }
  },
  methods: {
    join () {
      const name = this.name.trim()
      const session = this.session.trim()
      const secret = this.secret.trim()

      if (name && session) {
        this.$store.dispatch('join', {
          name,
          session,
          secret
        })
      }
    }
  }
}
</script>
