<template>
  <div class="box trans livescore">
    <div v-if="messages">
      <div v-for="message of list" :key="message['.key']" class="notification">
        {{message.team.emoji}}
        {{message.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  props: ['messages'],
  computed: {
    list () {
      return Object.values(this.messages).reverse().slice(0, 5)
    }
  }
}
</script>
