<template>
  <md-field>
    <label>{{label}}</label>
    <md-input
      type="number"
      :min="min"
      :max="max"
      step="1"
      v-model="value"
    ></md-input>
  </md-field>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    label: String,
    min: Number,
    max: Number
  },
  data () {
    return {
      value: null
    }
  },
  computed: {
    numberValue () {
      const value = parseInt(this.value, 10)
      if (isNaN(value)) return null
      if (this.max !== undefined && value > this.max) return null
      if (this.min !== undefined && value < this.min) return null
      return value
    }
  },
  watch: {
    numberValue () {
      this.$emit('input', this.numberValue)
    }
  }
}
</script>
