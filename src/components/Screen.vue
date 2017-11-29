<template>
  <div>
    <h1>Tupari-app</h1>
    <h2>Session: {{session}}</h2>
  </div>
</template>

<script>

export default {
  name: 'Screen',
  data () {
    return {

    }
  },
  computed: {
    session () {
      return this.$route.params.session
    }
  }
}
</script>
