import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { encrypt, decrypt } from '../utils/crypto'
import { Keychain} from 'keychainjs'

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
      locked: false
    },
    mutations: {
      addLogin (state, payload) {
        if (!state.accounts[0].logins) {
          state.accounts[0].logins = []
        }
        state.accounts[0].logins.push(payload.data)
      },
      removeLogin (state) {
        state.accounts[0].logins.pop()
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
        console.log("Logibn", payload)
        context.commit({
          "type": "addLogin",
          data: payload,
          meta: false
        })
      },
      async createAccount (context, payload) {
        var kc = false
          if (payload.mnemonic) { // new account
            kc = new Keychain({mnemonic: payload.mnemonic, network:'bitcoin'})
          } else { // existing account
            kc = new Keychain({network:'bitcoin'})
          }
          const account = {
            name: payload.username,
            mnemonic: kc._mnemonic,
            logins: []
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
      removeLogin (context) {
        context.commit("removeLogin")
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