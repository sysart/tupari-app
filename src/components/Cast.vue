<template>
  <div>
    <div v-html="castButton"></div>
  </div>
</template>

<script>
import { initSender } from '@/cast'

export default {
  name: 'Cast',
  computed: {
    castButton () {
      return '<button is="google-cast-button"></button>'
    }
  },
  mounted () {
    initSender()
  }
}
</script>
