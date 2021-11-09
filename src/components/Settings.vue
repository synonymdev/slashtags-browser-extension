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
         
        <v-spacer></v-spacer>
        <v-toolbar-title align-center>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
</template>

<script>
  export default {
    name: 'Settings',
    data () {
        return {
        
        }
    },
    methods: {
    }
  }
</script>
