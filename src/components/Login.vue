<template>
  <v-container fill-height class="loginOverlay">
    <v-layout align-center justify-center>
      <v-flex elevation-0>
        <v-card class="transparent elevation-0">
          <v-card-text>
            <div style="text-align:center">
              <v-img src="/logo.svg" style="width:100px;margin:auto" align-center></v-img>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="transparent elevation-0">
          <v-card-title>
            Unlock Wallet
          </v-card-title>
          <v-card-text class="pt-4 transparent elevation-0">
            <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Enter your password"
                    v-model="password"
                    min="8"
                    color="rgba(255, 92, 0, 1)"
                    :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    @click:append="e1 = !e1"
                    required
                  ></v-text-field>
                  <p> or <span @click="$router.push({path:'/account/import'})" style="text-decoration: underline; cursor:pointer">import an existing</span>.</p>
                  <v-bottom-navigation app grow class="transparent">
                    <v-btn @click="submit" :class=" { 'orange darken-4 white--text' : valid, disabled: !valid }">Unlock</v-btn>
                  </v-bottom-navigation>
                </v-form>
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
    name: 'Login',
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
              'decodeAccount',
              'unlockWallet'
          ]),
          async submit () {
            if (this.$refs.form.validate()) {
              var resp = await this.decodeAccount({data:this.$store.state.encryptedAccounts[0],password:this.password})
              if (resp) {
                console.log("success")
                this.unlockWallet()
                this.$router.push({path:"/account/list"})
              } else {
                console.log("fail",resp)
                this.error = resp
              }              
            }
          },
          clear () {
            this.$refs.form.reset()
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
</style>
