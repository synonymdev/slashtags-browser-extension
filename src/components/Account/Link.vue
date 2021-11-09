<template>
  <div>
    <div v-if="!error">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="login.image"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ login.name }}</v-list-item-title>
          <v-list-item-subtitle style="text-overflow: ellipsis;width:20px;">{{login.publicKey}}</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </div> 
    <p v-else>{{error}}</p>
      <v-bottom-sheet inset persistent v-model="sheet">
        <v-card style="background:transparent">
          <v-card-actions>
              <v-btn v-on:click="closeWindow" large rounded text>Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-on:click="signIn" :disabled="error" style="color: rgba(75, 196, 0, 1);" large rounded text>Accept</v-btn>
          </v-card-actions>
        </v-card>
    </v-bottom-sheet>
    
  </div>
</template>

<script>
import { Core } from '@synonymdev/slashtags-core';
import { Keychain } from 'keychainjs';
import { SlashtagsActions } from '@synonymdev/slashtags-actions';
import { mapActions } from 'vuex'

export default {
  name: 'Accounts',
  props: ['tag'],
  data() {
    return {
      sheet: true,
      theme : {
        isDark : true
      },
      loggedIn: false,
      login : {},
      keychain : false,
      error: false
    }
  },
  mounted () {
    this.keychain = new Keychain({mnemonic: this.$store.state.accounts[0].mnemonic})
    var url = atob(this.$route.params.tag)
    const node = Core(); 
    const slashActs = SlashtagsActions({ node })
    var _ = this;
    slashActs.handle(url, {
          ACT_1: {
            // When you get server's publicKey, challenge, and metadata (name, image ...etc)
            onChallenge:  async (data) => {
              console.log("Data",data)
              _.login = data.metadata
              _.login.publicKey = data.publicKey
              var username = this.$store.state.accounts[0].name

              var metadata = {
                name: username,
                image: 'https://pbs.twimg.com/profile_images/1406681834021339137/xV9wQjx4_400x400.png',
                publicKey: this.keychain.getPublicKey()
              };
              console.log("Wiating here")
              await _.isLoggedIn()
              this.addLogin(_.login)
              console.log("Done waiting")
              return { metadata, keyPair: this.keychain.getKeypair()};
            },
            onSuccess: ({responderPK, metadata}) => {
              console.log("Success")
              console.log("Here", {responderPK, metadata})
              this.closeWindow()
            },
            onError: (err) => {
              _.error = err
              console.log("Error")
              console.log('got error', err);
            },
          },
        }).then(console.log)
        
        return {
          login : {
            title: 'test',
            pubKey: 'pubkey',
            image: 'img'
          },
        }
  }, 
  methods: {
    ...mapActions([
        'addLogin'
    ]),
    closeWindow: function () {		
			window.close();	
    },
    isLoggedIn : async function() {
      var _ = this;
      await new Promise((resolve) => {
        
        setInterval(() => {
          if (_.loggedIn) {
          resolve(_.this);
          }
        }, 1000);
      });
      return !this.loggedIn
    },
    signIn: async function() {
      this.loggedIn =true
    }
  }
}
</script>

<style scoped>
.v-card-actions,.v-card, .v-bottom-sheet {
  background:transparent;
}
.v-list-item__subtitle {
  text-overflow: ellipsis;
  width:200px;
}

.v-list-item {
  background:rgba(255, 255, 255, 0.07);
  border-radius: 10px;
}

.v-btn {
  padding:10px;
  background:rgba(255, 255, 255, 0.07);
}

p {
  opacity: 0.4;
  font-size: 17px;
}
</style>
