<template>
  <div>
    <h1>Tupari-app</h1>
    <h2>Session: {{session}}</h2>
    <h1 v-for="ppl in all" :key="ppl.id">Tupari-app</h1>
  </div>
</template>

<script>

export default {
  name: 'Screen',
  data () {
    return {
    all: [
        {
          id: guest1,
          team: t1,
          g1: 1,
          g2: 4,
          g3: 5,
          g4: 2,
          g5: 3,
          g6: 2
        },
        {
          id:  guest2,
          team: t2,
          g1: 1,
          g2: 4,
          g3: 5,
          g4: 2,
          g5: 3,
          g6: 2
        },
        {
          id: guest3,
          team: t1,
          g1: 1,
          g2: 4,
          g3: 5,
          g4: 2,
          g5: 3,
          g6: 2
        }
    ]
    }
  },
  computed: {
    session () {
      return this.$route.params.session
    }
  }
}
</script>
