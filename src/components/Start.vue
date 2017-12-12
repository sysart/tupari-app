<template>
  <Wrapper background="no">
    <div class="formWrap">
      <form @submit.prevent="join" dark class="text-xs-center register">
        <md-field>
          <label>Nimimerkki</label>
          <md-input v-model="name"></md-input>
        </md-field>
        <md-button type="submit" class="md-raised md-primary">
          Ilmoittaudu mukaan
        </md-button>
      </form>
    </div>
  </Wrapper>
</template>

<script>
import { join } from '@/firebase'

export default {
  name: 'Start',
  data () {
    return {
      name: '',
      session: 'sysart'
    }
  },
  methods: {
    join () {
      const name = this.name.trim()
      const session = this.session.trim().toLowerCase()

      if (name && session) {
        join(session, name)
          .then(() => {
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

