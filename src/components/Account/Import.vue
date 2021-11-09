<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 orange darken-4">
          <v-toolbar-items>
              <v-toolbar-title class="white--text"><h4>Import Account</h4></v-toolbar-title>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Enter account name"
                    v-model="username"
                    min="8"
                    :type="text"
                    counter
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Enter your password"
                    v-model="password"
                    min="8"
                    :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    @click:append="e1 = !e1"
                    counter
                    required
                  ></v-text-field>
                                    <v-text-field
                    label="Confirm password"
                    v-model="password_confirm"
                    min="8"
                    :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    @click:append="e1 = !e1"
                    counter
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Enter mnemonic"
                    v-model="mnemonic"
                    :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    @click:append="e1 = !e1"
                    counter
                    required
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn @click="$router.go(-1)">Cancel</v-btn>
                    <v-btn @click="submit" :class=" { 'orange darken-4 white--text' : valid, disabled: !valid }" :disabled="!validate">Import</v-btn>
                  </v-layout>

                </v-form>
                <p v-if="error">{{error}}</p>
                Address: {{address}}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Import',
    data () {
        return {
          e1: false,
          mnemonic : null,
          address : null,
          valid: false,
          error : false
        }
    },
    methods : {
      ...mapActions([
        'createAccount',
        'decodeAccount'
      ]),
      validate () {
        return true
      },
      submit () {
        if (this.$refs.form.validate()) {
          try {
            this.createAccount(this.mnemonic)
          } catch(e) {
            console.log("Exception", e)
          }
        }
        /*
          try {
            console.log(this.mnemonic)
            var wallet = new Wallet(this.mnemonic)
            this.address = wallet.getAddress()
          } catch (e) {
            this.error = e
          }
        }*/
      }
    }
  }
</script>
