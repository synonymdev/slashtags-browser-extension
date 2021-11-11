<template>
  <div>
     <v-app-bar app color="transparent"  class="elevation-0">
         
            <v-btn
              dark
              icon
              @click="$router.push({path:'/account/list'})"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
         
        
        <v-toolbar-title>{{account.logins[this.$route.params.id].name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu
          bottom
          left
            class="elevation-0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-container>
           
        <div style="text-align:center">
        <v-img :src="account.logins[this.$route.params.id].image" style="border-radius:100%;width:40px;margin:auto" align-center></v-img>
        </div>
           
        <p class="header">Account Name</p>
        <p class="content">{{account.logins[this.$route.params.id].name}}</p>
        <p class="header">Username</p>
        <p class="content">{{account.name}}</p>
        <p class="header">Public Key</p>
        <p class="content">{{account.logins[this.$route.params.id].publicKey}}</p>
      </v-container>
    
    <v-bottom-navigation v-model="sheet">
        <v-btn v-on:click="deactiveLogin($route.params.id)" large rounded text>Delete</v-btn>
    </v-bottom-navigation>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Account_View',
  methods: {
    ...mapActions([
        'removeLogin'
    ]),
    deactiveLogin(id) {
      this.removeLogin(id)
      this.$router.push({path: "/account/list"})
    }
  },
  data () {
    return {
      sheet: true,
      attrs: false
    }
  },
  computed: {
      account() {
          return this.$store.state.accounts[0]
      }
  }
}
</script>

<style scoped>

p.header {
color: rgba(247, 92, 26, 1);;font-weight:bold;font-size:13px;margin:0px
}

p.content {
    width:200px;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 1);font-size:17px
}

</style>