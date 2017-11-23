<template>
  <v-text-field
    type="number"
    v-model="value"
    :label="label"
    :min="min"
    :max="max"
  />
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
      const value = parseInt(this.value)
      return (value >= this.min && value <= this.max) ? value : null
    }
  },
  watch: {
    numberValue () {
      this.$emit('input', this.numberValue)
    }
  }
}
</script>
