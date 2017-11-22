<template>
  <div>
    <button @click="addTodo">jee</button>
    <div v-for="todo in todos" :key="todo['.key']">
      {{todo}}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Client',
  computed: {
    ...mapState(['todos'])
  },
  data () {
    return {
    }
  },
  methods: {
    addTodo () {
      this.$store.dispatch('addTodo')
    }
  }
}
</script>

<style scoped>

</style>
