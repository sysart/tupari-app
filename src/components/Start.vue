<template>
  <form @submit.prevent="join">
    <v-text-field label="Name" v-model="name" />
    <v-btn @click="join">Join</v-btn>
  </form>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    join () {
      if (this.name) {
        this.$store.dispatch('join', this.name)
      }
    }
  }
}
</script>
