<template>
  <form @submit.prevent="join" dark class="text-xs-center register">
    <v-text-field label="Name" v-model="name" dark />
    <!--<v-text-field label="Session" v-model="session" dark />-->
    <button @click="join" class="bigButton">Join</button>
  </form>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      name: '',
      session: 'sysart',
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

<style>
.register {
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.register * {
max-height: 20vh;
}
.primary--text {
    color: #fff !important;
}
.bigButton {
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 100%;
}

</style>

