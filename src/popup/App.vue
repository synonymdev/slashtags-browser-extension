<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
      <v-navigation-drawer app>
      </v-navigation-drawer>

      <v-app-bar app v-show="showMenu">
                <span class="text-h5">Slashtags</span>

                <v-spacer></v-spacer>

                <v-menu
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

      </v-app-bar>
      
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app dark>
        
      </v-footer>
    </v-app>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    showMenu : function() {
      return !/^\/account\/add/.test(this.$route.path)
    }
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}

body {
  background: #151718;
  color:#fff;
}
</style>
