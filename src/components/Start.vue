<template>
  <Wrapper>
    <div class="formWrap">
      <form @submit.prevent="join" dark class="text-xs-center register">
        <md-field>
          <label>Nimi</label>
          <md-input v-model="name"></md-input>
        </md-field>
        <md-checkbox v-model="host" class="md-primary sysart-check">Sysarttilainen</md-checkbox>
        <md-button type="submit" :disabled="joining" class="md-raised md-primary">
          Ilmoittaudu mukaan
        </md-button>
      </form>
      <div class="regards">
        <h2 class="session">sysart</h2>
        <p class="slogan">tuparit</p>
      </div>
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
      session: 'sysart',
      joining: false,
      host: false
    }
  },
  mounted () {
    const session = localStorage.getItem('session')
    if (session) {
      this.$router.replace({
        name: 'home',
        params: {
          session
        }
      })
    }
  },
  methods: {
    join () {
      const name = this.name.trim()
      const session = this.session.trim().toLowerCase()

      if (name && session && !this.joining) {
        this.joining = true
        join(session, name, this.host)
          .then(() => {
            localStorage.setItem('session', session)
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
.sysart-check {
  position: absolute;
  bottom: 0;
}

.formWrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
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
.regards {
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:1em;
}
.session {
  font-size: 3em;
  font-weight: 100;
  line-height: 1em;
  color: #323c48;
  margin:0;
}
.slogan {
  font-size: 1em;
  color: #fff;
  margin: 0;
}

</style>

