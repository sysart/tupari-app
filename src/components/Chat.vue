<template>
  <div class="container">
    <PageHeader title="Tsätti" backTo="home" />

    <form @submit.prevent="send">
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

    <div class="messages">
      <div v-for="message in chatMessages" :key="message['.key']">
        <strong>&lt;{{message.user}}&gt;</strong> {{message.message}}
      </div>
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
.md-card {
  margin-bottom: 16px;
}
</style>
