<template>
  <div>
      <v-container>
        <div style="text-align:center">
        <v-img :src="account.profiles[this.$route.params.id].image" style="border-radius:100%;width:40px;margin:auto" align-center></v-img>
        </div>
           
        <p class="header">Profile</p>
        <p class="content">{{account.profiles[this.$route.params.id].name}}</p>
      </v-container>
    
    <v-bottom-navigation app grow class="transparent">
      <v-btn v-on:click="deactiveProfile($route.params.id)" large rounded text>Delete</v-btn>
    </v-bottom-navigation>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile_View',
  methods: {
    ...mapActions([
        'removeProfile'
    ]),
    deactiveProfile(id) {
      this.removeProfile(id)
      this.$router.push({path: "/profile/list"})
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

p.header {
color: rgba(247, 92, 26, 1);;font-weight:bold;font-size:13px;margin:0px
}

p.content {
    width:200px;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 1);font-size:17px
}

</style>