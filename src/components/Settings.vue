<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-0 class="fadeIn">
        <v-toolbar class="pt-5 transparent elevation-0">
          <v-toolbar-items>
              <v-toolbar-title class="white--text"><h4>Settings</h4></v-toolbar-title>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="transparent elevation-0">
          <v-card-text class="pt-4">
            Export data <v-btn @click="exportData">Export</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Settings',
    data () {
        return {
        
        }
    },
    methods: {
      exportData() {
        var element = document.createElement('a');
        var backupObj = Object.assign({}, this.$store.state);
        backupObj.accounts[0].mnemonic = null
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(backupObj));
        element.setAttribute('download', "backup.txt");

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

      }
    }
  }
</script>
