<template>
  <div class="chatContainer">
    <PageHeader title="Tsätti" backTo="home" />

    <div class="chat" v-chat-scroll>
      <form @submit.prevent="send" class="chatBar">
        <md-card class="md-accent">
          <md-card-content>
            <md-field>
              <label>Message</label>
              <md-input
                v-model="message"
                :maxlength="80"
              ></md-input>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button type="submit" class="md-primary">Lähetä</md-button>
          </md-card-actions>
        </md-card>
      </form>

      <ul class="chatMessages">
        <li v-for="message in chatMessages" :key="message['.key']">
          <strong>{{message.user}}</strong> {{message.message}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader'
import { getMessagesRef } from '@/firebase'
import { mapState } from 'vuex'
import { MESSAGE_TYPES } from '@/stuff'

export default {
  name: 'Chat',
  components: {
    PageHeader
  },
  data () {
    return {
      message: null
    }
  },
  computed: {
    chatMessages () {
      return (this.messages || [])
        .filter(message => message.type === MESSAGE_TYPES.CHAT)
        .reverse()
    },
    ...mapState(['messages'])
  },
  methods: {
    send () {
      const message = this.message && this.message.trim()
      if (message) {
        this.message = null
        this.$store.dispatch('send', message)
      }
    }
  },
  mounted () {
    this.$store.dispatch('bindRef', {
      key: 'messages',
      ref: getMessagesRef(this.$route.params.session)
    })
  },
  beforeDestroy () {
    this.$store.dispatch('unbindRef', 'messages')
  }
}
</script>

<style lang="scss" scoped>
.chatContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat {
  flex: 1;
  margin: 0 -1em calc(160px - 1em);
  padding: 1em;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  overflow-y: auto;
}

.chatBar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.chatMessages {
  flex: 1;
  padding-left: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column-reverse;

  & > li {
    color: #222;
  }

  strong {
    font-weight: 700;
  }
}
</style>
