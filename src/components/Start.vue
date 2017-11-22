<template>
<form @submit.prevent="join">
  <label>
    nimi:
    <input v-model="name" />
  </label>
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
      this.$store.dispatch('join', this.name)
    }
  }
}
</script>
