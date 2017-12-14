<template>
  <div class="box trans livescore">
    <div v-if="messages">
      <transition-group name="list" tag="div">
        <div v-for="message of list" :key="message.id" class="notification" :class="{ chat: message.type === 'CHAT' }">
          <div class="messageIcon">
          <img v-if="message.type === 'RESULT'" class="msgImg" :src="getImgUrl(message.game)">
          <img v-if="message.type === 'JOIN_TEAM'" class="msgImg" :src="getImgUrl('join')">
          <img v-if="message.type === 'CHAT'" class="msgImg" :src="getImgUrl('chat')">
          <img v-if="message.type === 'MEET'" class="msgImg" :src="getImgUrl('tapailu')">
          </div>
          <div class="message" v-html="getContent(message)"></div>
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
    getImgUrl (pic) {
      pic.toLowerCase();
      return `/static/images/${pic}.svg`
    },
    getContent (message) {
      let content = ''
      switch (message.type) {
        case MESSAGE_TYPES.CHAT:
          content = `<strong>${message.user}</strong><br>fdsdf<br> ${message.message}`
          break
        case MESSAGE_TYPES.MEET:
          return `${message.user}<br>tapasi ${message.otherName}`
        case MESSAGE_TYPES.JOIN_TEAM:
          return `${message.user}<br>liittyi joukkueeseen ${message.team}`
        case MESSAGE_TYPES.RESULT:
          if (message.prevScore) {
            if (message.score === message.result) {
              return `${message.user}<br><strong>${message.score}p</strong>`
            } else {
              return `${message.user}<br>Tulos: ${message.result}<br> <strong>${message.score}p</strong>`
            }
          } else {
            if (message.score === message.result) {
              return `${message.user}<br><strong>${message.score}p</strong>`
            } else {
              return `${message.user}<br>Tulos: ${message.result}<br> <strong> ${message.score}p</strong>`
            }
          }
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
  font-size: 25px;
  line-height: 1.5em;
  padding: 30px 40px;
  text-align: center;
  background: #323c48;
  border: 1px solid #48525d;
  color: #e0e0e0;
  width: 100%;
  margin: 0 0 1vmin;
  transition: all 1s;
  display: flex;
}
.notification.chat {
  background: #fff !important;
  color:#2a323c;
}

.messageIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20%;
}
.message {
  text-align: left;
  padding: 0 20px;
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
