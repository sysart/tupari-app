<template>
  <md-field>
    <label>{{label}}</label>
    <md-input
      type="tel"
      v-mask="['#.##,###']"
      :masked="true"
      v-model="value"
    ></md-input>
    <span class="md-helper-text">Kirjoita aika ilman pisteitä: 123 -> 1.23</span>
  </md-field>
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
