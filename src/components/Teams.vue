<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="team in teams" :key="team['.key']">
        <v-card>
          <v-container>
            <form @submit.prevent="update(team)">
              <v-text-field label="Name" v-model="team.name" />
              <v-text-field label="Emoji" v-model="team.emoji" />
              <v-btn @click="update(team)">Update</v-btn>
              <v-btn color="error" @click="remove(team)">Remove</v-btn>
              <h2>Members ({{team.members && Object.keys(team.members).length}}):</h2>
              <div v-for="member in team.members" :key="member['.key']">
                {{member.name}}
              </div>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container>
            <form @submit.prevent="create">
              <v-text-field label="Name" v-model="name" />
              <v-btn @click="create">Create</v-btn>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
