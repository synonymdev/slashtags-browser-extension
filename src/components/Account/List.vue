<template>
  <div>
    <div v-if="loginLen">
      <template v-for="(item, index) in accounts[0].logins">
        <v-list-item
          :key="item.name" v-on:click="$router.push({path: `/account/view/${index}`})" style="margin-bottom:10px">
          <v-list-item-avatar>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{item.publicKey}}</v-list-item-subtitle>
          </v-list-item-content>

          <!--v-list-item-action  v-on:click="removeLogin">
            <v-list-item-action-text>Delete</v-list-item-action-text>
          </v-list-item-action-->
        </v-list-item>
      </template>
    </div>
    <p v-else style="padding:80px;padding-top:200px;text-align:center;">There are no accounts logged in right now</p>
    </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Accounts',
  mounted () {
    browser.runtime.sendMessage({})
  },
  methods: {
    ...mapActions([
        'removeLogin',
        'removeAccount',
        'decodeAccount'
    ]),
    addAccount: function() {
      this.$store.dispatch('addAccount')
    },
    deleteAccount: function() {
      this.$store.dispatch('removeAccount')
    }
  },
  computed: {
    inset() {
      return true
    },
    loginLen() {
      return this.$store.state.accounts[0].logins.length
    },
    accounts() {
      return this.$store.state.accounts
    },
    defaultText () {
      return browser.i18n.getMessage('accountsNone')
    }
  }
}
</script>

<style scoped>

.v-list-item__subtitle {
  text-overflow: ellipsis;
  width:200px;
}

.v-list-item {
  background:rgba(255, 255, 255, 0.07);border-radius: 10px;
}

p {
  opacity: 0.4;
  font-size: 17px;
}
</style>
