<template>
  <Wrapper>
    <div class="formWrap">
      <form @submit.prevent="join" dark class="text-xs-center register">
        <v-text-field label="Nimimerkki" v-model="name" dark />
        <!--<v-text-field label="Session" v-model="session" dark />-->
        <button class="bigButton">Ilmoittaudu mukaan</button>
      </form>
    </div>
  </Wrapper>
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
      const session = this.session.trim().toLowerCase()
      const secret = this.secret.trim()

      if (name && session) {
        this.$store.dispatch('join', {
          name,
          session,
          secret
        }).then(() => {
          this.$router.replace({
            name: 'home',
            params: {
              session
            }
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.formWrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register {
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
  background: #323c48;
  color: #fff;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 100%;
}

</style>

