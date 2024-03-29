<template>
  <div>
    <div style="text-align:center" v-show="!login.image && !error">
     <v-progress-circular
      :width="3"
      color="white"
      indeterminate
    ></v-progress-circular>
    </div>
    <div v-if="!error" v-show="login.name">
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
    <v-select v-show="login.name"
          v-model="profile"
          color="rgba(255, 92, 0, 1)"
          :items="profiles"
          item-text="name"
          item-value="name"
          label="Select"
          persistent-hint
          return-object
          single-line
          >
         <template v-slot:selection="{ item }">
          <img :src="item.image" width="20px" style="border-radius:100%"> <v-spacer></v-spacer> {{ item.name }}
        </template>
        </v-select>
        <v-bottom-navigation app grow class="transparent elevation-0" elevation-0>
              <v-btn v-on:click="closeWindow" large rounded text>Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-on:click="signIn" :disabled="error" style="color: rgba(75, 196, 0, 1) !important;" large rounded text>Accept</v-btn>
        </v-bottom-navigation>
  </div>
</template>

<script>
import { Core } from '@synonymdev/slashtags-core';
import { Keychain } from '../../utils/keychain'
import { SlashtagsActions } from '@synonymdev/slashtags-actions';
import { mapActions } from 'vuex'

export default {
  name: 'Accounts',
  props: ['tag'],
  data() {
    return {
      theme : {
        isDark : true
      },
      title:"Connect",
      loggedIn: false,
      login : {},
      keychain : false,
      error: false,
      profile: this.$store.state.accounts[0].profiles[0]
    }
  },
  computed: {
    profiles() {
      return this.$store.state.accounts[0].profiles
    }
  },
  mounted () {
    this.keychain = new Keychain({mnemonic: this.$store.state.accounts[0].mnemonic})
    const url = atob(this.$route.params.tag)
    const node = Core(); 
    const slashActs = SlashtagsActions({ node })
    const _ = this;

    slashActs.handle(url, {
          ACT_1: {
            // When you get server's publicKey, challenge, and metadata (name, image ...etc)
            onChallenge:  async (data) => {
							var metadata = {}
              _.login = data.metadata
              _.login.publicKey = data.publicKey
              
              const existingLogin = this.$store.state.accounts[0].logins.filter((login) => {if (login.publicKey == _.login.publicKey) return 1})

              if (!existingLogin.length) { // new login

                await _.isLoggedIn()
                metadata = {
                  name: this.profile.name,
                  image: this.profile.image,
                  publicKey: this.keychain.getPublicKey()
                };

                _.login.profile = metadata
                this.addLogin(_.login)
              } else { // existing login
                metadata = existingLogin[0].profile;
              }
              return { metadata, keyPair: this.keychain.getKeypair()};
            },
            onSuccess: ({responderPK, metadata}) => {
              console.log(responderPK, metadata)
              this.closeWindow()
            },
            onError: (err) => {
              _.error = err
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
    closeWindow () {		
			window.close();	
    },
    async isLoggedIn() {
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
    async signIn() {
      this.loggedIn =true
    }
  }
}
</script>

<style scoped>

.v-list-item__subtitle {
  text-overflow: ellipsis;
}

.v-bottom-navigation .v-btn {
  background:rgba(255, 255, 255, 0.07) !important;
  border-radius: 40px !important;

}

p {
  opacity: 0.4;
}
</style>
