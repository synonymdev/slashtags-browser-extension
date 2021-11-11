import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { encrypt, decrypt } from '../utils/crypto'
import { Keychain } from '../utils/keychain'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      logins: [],
      encryptedAccounts: [],
      accounts: [],
      count: 0,
      network: 'bitcoin',
      locked: false
    },
    mutations: {
      addProfile (state, payload) {
        if (!state.accounts[0].profiles) {
          state.accounts[0].profiles = []
        }
        state.accounts[0].profiles.push(payload.data)
      },
      addLogin (state, payload) {
        if (!state.accounts[0].logins) {
          state.accounts[0].logins = []
        }
        payload.data.active = true
        state.accounts[0].logins.push(payload.data)
      },
      removeProfile (state, payload) {
        state.accounts[0].profiles.splice(payload.data, 1)
      },
      removeLogin (state, payload) {
        state.accounts[0].logins.splice(payload.data, 1)
        //state.accounts[0].logins[payload.data].active = false
      },
      addEncryptedAccount(state, payload) {
        state.encryptedAccounts.push(payload.data)
      },
      addAccount (state, payload) {
        state.accounts.push(payload.data)
      },
      removeAccount (state) {
        state.accounts.pop()
      },
      increment (state) {
        state.count++
      },
      lockWallet (state) {
        state.locked = true
      },
      unlockWallet (state) {
        state.locked = false
      }
    },
    actions: {
      addLogin (context, payload) {
        context.commit({
          "type": "addLogin",
          data: payload,
          meta: false
        })
      },
      addProfile (context, payload) {
        context.commit({
          "type": "addProfile",
          data: payload,
          meta: false
        })
      },
      async createAccount (context, payload) {
        var kc = false
          if (payload.mnemonic) { // new account
            kc = new Keychain({mnemonic: payload.mnemonic, network:this.network})
          } else { // existing account
            kc = new Keychain({network:this.network})
          }
          const account = {
            name: (payload.username) ? payload.username : 'Anonymous',
            mnemonic: kc._mnemonic,
            logins: [],
            profiles: [{
              name: 'Anonymous',
              image: 'https://pbs.twimg.com/profile_images/1406681834021339137/xV9wQjx4_400x400.png'
            }]
          }

          var encrypted = await encrypt(JSON.stringify(account), payload.password)
          
          context.commit({
            "type": "addEncryptedAccount",
            data: encrypted,
            meta: false
          })

          context.commit({
            "type": "addAccount",
            data: account,
            meta: false
          })

          return encrypted
      },
      lockWallet (context) {
        context.commit({
          "type": "lockWallet",
          meta: false
        })
      },
      unlockWallet (context) {
        context.commit({
          "type": "unlockWallet",
          meta: false
        })
      },
      async decodeAccount (context, payload) {
        var decrypted = await decrypt(payload.data.encrypted, payload.password, payload.data.keySalt)
        return decrypted
      },
      removeAccount (context) {
          context.commit("removeAccount")
      },
      removeLogin (context, index) {
        context.commit({
          "type": "removeLogin",
          data: index,
          meta: false
        })
      },
      removeProfile (context, index) {
        context.commit({
          "type": "removeProfile",
          data: index,
          meta: false
        })
      } 
    },
    getters: {
        accountCount: state => {
            return state.accounts.length
        },
        isLocked: state => {
          return state.locked
        },
        accounts: state => {
          return state.accounts.length
        },
        isLoggedIn: state => {
          return state.accounts.length
        }
    },
    plugins: [vuexLocal.plugin]
  })

export default store