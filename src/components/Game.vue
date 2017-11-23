<template>
  <div>
    {{game.name}}
    <div v-if="previousResult">
      Previous result {{previousResult}}
    </div>
    <v-form @submit.prevent="updateResult" novalidate>
      <div>
        <TimeInput v-model="result" v-if="game.inputMode == 'time'" :label="game.inputLabel" />
        <NumberInput v-model="result" v-if="game.inputMode == 'number'" :label="game.inputLabel" :min="game.min" :max="game.max" />
      </div>
      <v-btn @click="updateResult" :disabled="!result">Update</v-btn>
      <v-btn type="button" @click="$emit('back')">Back</v-btn>
    </v-form>
  </div>
</template>

<script>
import TimeInput from './TimeInput'
import NumberInput from './NumberInput'

export default {
  name: 'Game',
  components: {
    TimeInput,
    NumberInput
  },
  props: {
    previousResult: [String, Number],
    game: Object
  },
  data () {
    return {
      result: null
    }
  },
  methods: {
    updateResult () {
      if (this.result) {
        this.$emit('updateResult', this.game.id, this.result)
      }
    }
  }
}
</script>
