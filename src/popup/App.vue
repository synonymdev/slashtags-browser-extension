<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <v-app>
      <v-app-bar app v-if="showMenu" color="transparent"  class="elevation-0">
         <v-btn
              dark
              icon
              @click="$router.go(-1)"
              v-show="showBack"
            >
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          dark
          icon
           v-show="showProfile"
          @click="$router.push({path:'/profile/list'})"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu
          bottom
          left
          class="elevation-0"
          origin="center center" transition="scale-transition">
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
              <v-list-item-title @click="$router.push({path:'/settings'})">Settings</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="lock">Lock</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      on : {},
      title: (this.$route.meta.title) ? this.$route.meta.title : "Accounts"
    }
  },
  methods: {
    ...mapActions([
        'lockWallet',
        'unlockWallet'
    ]),
    lock () {      
      this.lockWallet()
      this.$router.push({path:'/login'})
    }
  },
  computed: {
    showMenu () {
      return this.$route.meta.header
    },
    showBack() {
      return this.$route.meta.back
    },
    showProfile() {
      return this.$route.meta.profile
    }
  }
}
</script>

<style>

html {
  min-width: 375px;
  min-height: 600px;
}

#app {
  background: #151718 url(/bg.svg) no-repeat;
  
}
body {
  color:#fff;
}

</style>
