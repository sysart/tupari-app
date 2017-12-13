<template>
  <div v-html="castButton"></div>
</template>

<script>
export default {
  name: 'Cast',
  computed: {
    castButton () {
      return '<button is="google-cast-button"></button>'
    }
  },
  mounted () {
    cast.framework.CastContext.getInstance().setOptions({ // eslint-disable-line no-undef
      receiverApplicationId: '3BCD22C3',
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED // eslint-disable-line no-undef
    })
  }
}
</script>

