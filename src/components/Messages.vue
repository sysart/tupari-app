<template>
  <div class="box trans livescore">
    <div v-if="messages">
      <transition-group name="list" tag="div">
        <div v-for="message of list" :key="message.id" class="notification">
          {{getContent(message)}}
          <div class="team-name">
            #{{message.team}}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPES } from '@/stuff'
import _ from 'lodash'

export default {
  name: 'Messages',
  props: ['messages'],
  computed: {
    list () {
      return _.map(this.messages, (message, key) => {
        return {
          id: key,
          ...message
        }
      }).reverse().slice(0, 20)
    }
  },
  methods: {
    getContent (message) {
      switch (message.type) {
        case MESSAGE_TYPES.MEET:
          return `${message.user} tapasi ${message.otherName}`
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
  line-height: 1.5em;
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

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  max-height: 0;
}

.list-enter-to {
  max-height: 200px;
}
</style>
