<template>
  <router-view></router-view>
</template>

<script>
import { todosRef } from '@/firebase'

export default {
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('setTodosRef', todosRef)
  }
}
</script>
