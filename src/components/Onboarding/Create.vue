<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-0>
      <v-toolbar class="pt-5 transparent elevation-0">
        <v-toolbar-items>
            <v-toolbar-title class="white--text"><h4>Create Account</h4></v-toolbar-title>
        </v-toolbar-items>
      </v-toolbar>
      <v-card class="transparent">
        <v-card-text>
            <v-btn to="/account/import" block>Import</v-btn>
     <v-divider></v-divider>
            <v-btn to="/account/create" block>Create</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'OnboardingCreate',
    data () {
          return {
            valid: false,
            e1: true,
            password: '',
            passwordRules: [
              (v) => !!v || 'Password is required',
            ]
          }
        },
        methods: {
            ...mapActions([
              'createAccount',
              'decodeAccount'
          ]),
          importExisting () {
            return "/import"
          },
          accountCreate () {
            return "/account/create"
          }
        }
  }
</script>

<style scoped>
.v-btn {
  padding:10px;
  background:rgba(255, 255, 255, 0.07);
}
</style>
