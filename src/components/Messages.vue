<template>
  <div class="box trans livescore">
    <div v-if="messages">
      <transition-group name="list" tag="div">
        <div v-for="message of list" :key="message.id" class="notification">
          <span v-html="getContent(message)"></span>
          <div class="team-name">
            #{{message.team}}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPES, sanitize } from '@/stuff'
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
      let content = ''
      switch (message.type) {
        case MESSAGE_TYPES.CHAT:
          content = `<strong>${message.user}</strong>: ${message.message}`
          break
        case MESSAGE_TYPES.MEET:
          content = `<strong>${message.user}</strong> tapasi <strong>${message.otherName}</strong>`
          break
        case MESSAGE_TYPES.JOIN_TEAM:
          content = `<strong>${message.user}</strong> liittyi joukkueeseen <strong>${message.team}</strong>`
          break
        case MESSAGE_TYPES.RESULT:
          if (message.prevScore) {
            if (message.score === message.result) {
              content = `<strong>${message.user}</strong> paransi ${message.game} pelissä ja sai <strong>${message.score}</strong> pistettä`
            } else {
              content = `<strong>${message.user}</strong> paransi ${message.game} pelissä ja sai <strong>${message.score}</strong> pistettä tuloksella <strong>${message.result}</strong>`
            }
          } else {
            if (message.score === message.result) {
              content = `<strong>${message.user}</strong> sai ${message.game} pelissä <strong>${message.score}</strong> pistettä`
            } else {
              content = `<strong>${message.user}</strong> sai ${message.game} pelissä <strong>${message.score}</strong> pistettä tuloksella <strong>${message.result}</strong>`
            }
          }
          break
        default:
          content = 'Jotain tapahtui'
      }
      return sanitize(content)
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: relative;
  font-size: 20px;
  line-height: 1.5em;
  padding: 30px 40px;
  text-align: center;
  background: #323c48;
  color: #e0e0e0;
  width: 100%;
  margin: 0 0 1vmin;
  transition: all 1s;
}

.notification /deep/ strong {
  color: #fff;
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

.list-enter, .list-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 0.5s;
}
</style>
