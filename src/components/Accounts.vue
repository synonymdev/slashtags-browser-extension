<template>
  <div>
    <h1>Accounts</h1>
    <ul id="accounts" v-if="accountLen">
      <li v-for="item in accounts" :key="item.id">
        {{ item.title }} <button v-on:click="deleteAccount">delete</button>
      </li>
    </ul>
    <p v-else>There are currently no accounts.</p>
    <!--button v-on:click="addAccount">Add one</button-->
  </div>
</template>

<script>
export default {
  name: 'Accounts',
  mounted () {
    browser.runtime.sendMessage({})
  },
  methods: {
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
