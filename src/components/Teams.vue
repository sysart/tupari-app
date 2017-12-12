<template>
  <div>
    <md-card v-for="team in teams" :key="team['.key']">
      <md-card-content>
        <form @submit.prevent="update(team)">
          <md-field>
            <label>Name</label>
            <md-input
              v-model="team.name"
            ></md-input>
          </md-field>
          <md-field>
            <label>Emoji</label>
            <md-input
              v-model="team.emoji"
            ></md-input>
          </md-field>
          <md-button class="md-raised md-primary" @click="update(team)">Update</md-button>
          <md-button class="md-raised md-accent" @click="remove(team)">Remove</md-button>
          <h2>Members ({{team.members && Object.keys(team.members).length}}):</h2>
          <div v-for="member in team.members" :key="member['.key']">
            {{member.name}}
          </div>
        </form>
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-content>
        <form @submit.prevent="create">
          <md-field>
            <label>Name</label>
            <md-input
              v-model="name"
            ></md-input>
          </md-field>
          <md-button class="md-raised md-primary" @click="create">Create</md-button>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { getTeamsRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Teams',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    session () {
      return this.$route.params.session
    },
    ...mapState(['teams'])
  },
  methods: {
    create () {
      this.$store.dispatch('createTeam', this.name)
      this.name = ''
    },
    update (team) {
      this.$store.dispatch('updateTeam', team)
    },
    remove (team) {
      this.$store.dispatch('removeTeam', team)
    }
  },
  mounted () {
    this.$store.dispatch('bindRef', { key: 'teams', ref: getTeamsRef(this.session) })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'teams')
  }
}
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
