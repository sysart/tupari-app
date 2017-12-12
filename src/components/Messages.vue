<template>
  <div class="box trans livescore">
    <div v-if="messages">
      <div v-for="message of list" :key="message['.key']" class="notification">
        {{getContent(message)}}
        <div class="team-name">
          #{{message.team}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPES } from '@/stuff'

export default {
  name: 'Messages',
  props: ['messages'],
  computed: {
    list () {
      return Object.values(this.messages).reverse().slice(0, 5)
    }
  },
  methods: {
    getContent (message) {
      switch (message.type) {
        case MESSAGE_TYPES.JOIN_TEAM:
          return `${message.user} liittyi joukkueeseen ${message.team}`
        case MESSAGE_TYPES.RESULT:
          if (message.prevScore) {
            if (message.score === message.result) {
              return `${message.user} paransi ${message.game} pelissä ja sai ${message.score} pistettä`
            } else {
              return `${message.user} paransi ${message.game} pelissä ${message.result} tuloksella, jolla saa ${message.score} pistettä`
            }
          } else {
            if (message.score === message.result) {
              return `${message.user} sai ${message.game} pelissä ${message.score} pistettä`
            } else {
              return `${message.user} sai ${message.game} pelissä ${message.result} tuloksen, jolla saa ${message.score} pistettä`
            }
          }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: relative;
  font-size: 20px;
  padding: 2vmin 1vmin;
  text-align: center;
  background: #323c48;
  color: #fff;
  width: 100%;
  margin: 0 0 1vmin;
}

.team-name {
  opacity: 0.6;
  font-size: 10px;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  bottom: 0;
}
</style>
