<template>
  <div class="box trans livescore">
    <div v-if="messages">
      <transition-group name="list" tag="div">
        <div v-for="message of list" :key="message.id" class="notification">
<<<<<<< HEAD
          <div class="messageIcon">
          <img v-if="message.type == 'RESULT'" class="msgImg" :src="getImgUrl(message.game)">
          <img v-if="message.type == 'JOIN_TEAM'" class="msgImg" :src="getImgUrl('join')">
          </div>
          <div class="message" v-html="getContent(message)"></div>
=======
          <span v-html="getContent(message)"></span>
>>>>>>> 06744bc70d86f4ee04e7367b6652451f036d0364
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
      return `/static/images/${pic}.svg`
    },
    getContent (message) {
      let content = ''
      switch (message.type) {
        case MESSAGE_TYPES.CHAT:
          content = `<strong>${message.user}</strong>: ${message.message}`
          break
        case MESSAGE_TYPES.MEET:
<<<<<<< HEAD
          return `${message.user} <br> tapasi ${message.otherName}`
        case MESSAGE_TYPES.JOIN_TEAM:
          return `${message.user} <br> liittyi joukkueeseen ${message.team}`
        case MESSAGE_TYPES.RESULT:
          if (message.prevScore) {
            if (message.score === message.result) {
              return `${message.user} <br> ${message.score}p`
            } else {
              return `${message.user} <br> Tulos: ${message.result}<br> ${message.score}p`
            }
          } else {
            if (message.score === message.result) {
              return `${message.user} <br> ${message.score}p`
            } else {
              return `${message.user} <br> Tulos: ${message.result}<br> ${message.score}p`
=======
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
>>>>>>> 06744bc70d86f4ee04e7367b6652451f036d0364
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
  font-size: 25px;
  line-height: 1.5em;
  padding: 30px 40px;
  text-align: center;
  background: #323c48;
<<<<<<< HEAD
  border: 1px solid #48525d;
  color: #fff;
=======
  color: #e0e0e0;
>>>>>>> 06744bc70d86f4ee04e7367b6652451f036d0364
  width: 100%;
  margin: 0 0 1vmin;
  transition: all 1s;
  display: flex;

<<<<<<< HEAD
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
=======
.notification /deep/ strong {
  color: #fff;
}

>>>>>>> 06744bc70d86f4ee04e7367b6652451f036d0364
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
