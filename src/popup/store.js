import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      accounts: [],
      count: 0
    },
    mutations: {
      addAccount (state, payload) {
        state.accounts.push(payload.data)
      },
      removeAccount (state) {
        state.accounts.pop()
      },
      increment (state) {
        state.count++
      }
    },
    actions: {
        addAccount (context, payload) {
            console.log("context", payload)
            context.commit({
             "type": "addAccount",
             data: payload,
             meta: false
            })
        },
        removeAccount (context) {
            context.commit("removeAccount")
        } 
    },
    getters: {
        accountCount: state => {
            return state.accounts.length
        }
    },
    plugins: [vuexLocal.plugin]
  })

export default store