<template>
  <div>
    <v-col
    cols="12"
    sm="6"
    offset-sm="3"
    v-if="accountLen"
    >
      <v-card>
        <v-subheader :inset="inset">
          Accounts
        </v-subheader>

        <v-list rounded>
          <template v-for="(item) in accounts">
            <v-list-item
              :key="item.title"
            >
              <v-list-item-avatar>
                <v-img :src="item.image"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{item.pubKey}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action  v-on:click="removeAccount">
                <v-list-item-action-text>Delete</v-list-item-action-text>

              </v-list-item-action>


            </v-list-item>

            <v-divider :key="item.id"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <p v-else>There are currently no accounts.</p>
    <!--button v-on:click="addAccount">Add one</button-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Accounts',
  mounted () {
    console.log(this.$store.state.accounts)
    browser.runtime.sendMessage({})
  },
  methods: {
    ...mapActions([
        'removeAccount'
    ]),
    addAccount: function() {
      console.log("adding")
      this.$store.dispatch('addAccount')
    },
    deleteAccount: function() {
      console.log("Deleting")
      this.$store.dispatch('removeAccount')
    }

  },
  computed: {
    accountLen() {
      return this.$store.getters.accountCount
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
p {
  opacity: 0.4;
  font-size: 20px;
}
</style>
