<template>
  <div v-html="castButton"></div>
</template>

<script>
import { isAvailable } from '@/cast'

export default {
  name: 'Cast',
  computed: {
    castButton () {
      return '<button is="google-cast-button"></button>'
    }
  },
  methods: {
    init () {
      cast.framework.CastContext.getInstance().setOptions({ // eslint-disable-line no-undef
        receiverApplicationId: '3BCD22C3',
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED // eslint-disable-line no-undef
      })
    }
  },
  mounted () {
    isAvailable.then(() => this.init())
  }
}
</script>
