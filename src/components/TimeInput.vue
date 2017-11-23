<template>
  <v-text-field
    v-model="value"
    type="tel"
    :label="label"
    v-mask="['#.##,###']"
    :masked="true"
  />
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'TimeInput',
  props: {
    label: String
  },
  data () {
    return {
      value: null
    }
  },
  computed: {
    valid () {
      return this.value.match(/^\d\.\d{2}(,\d{1,3})?$/)
    }
  },
  watch: {
    value () {
      this.$emit('input', this.valid ? this.value : null)
    }
  },
  directives: {
    mask
  }
}
</script>
