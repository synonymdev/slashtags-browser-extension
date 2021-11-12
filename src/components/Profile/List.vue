<template>
  <div>
    
    <div v-if="profileLen">
      <template v-for="(item, index) in accounts[0].profiles">
        <v-list-item
          :key="item.name" v-on:click="$router.push({path: `/profile/view/${index}`})" style="margin-bottom:10px">
          <v-list-item-avatar>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{item.publicKey}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action  v-on:click="removeLogin">
            <v-btn
              dark
              icon
              @click="$router.push({path:'/profile/view/' + 0})"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </div>
    <p v-else>There are no accounts logged in right now</p>
    <v-bottom-navigation app grow class="transparent">
      <v-btn @click="$router.push({path:'/profile/add'})">
        Add
      </v-btn>
    </v-bottom-navigation>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profiles',
  mounted () {
  },
  methods: {
    ...mapActions([
        'removeLogin',
        'removeAccount',
        'decodeAccount'
    ]),
  },
  computed: {
    accounts() {
      return this.$store.state.accounts
    },
    profileLen() {
      return this.$store.state.accounts[0].profiles.length
    }
  }
}
</script>

<style scoped>
.v-list-item__subtitle {
  text-overflow: ellipsis;
}
.v-bottom-navigation {
  margin-bottom:20px;
}
.v-bottom-navigation .v-btn {
  background:rgba(255, 255, 255, 0.07) !important;
  border-radius: 40px !important;
  padding:10px;
  margin:10px;
}

p {
  opacity: 0.4;
  font-size: 17px;
}
</style>
