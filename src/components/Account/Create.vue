<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-0>
        <v-toolbar class="pt-5 transparent elevation-0">
          <v-toolbar-items>
              <v-toolbar-title class="white--text"><h4>Create new Account</h4></v-toolbar-title>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="transparent elevation-0">
          <v-card-text class="pt-4">
            <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Enter account name"
                    color="rgba(255, 92, 0, 1)"
                    v-model="username"
                    min="8"
                    :type="text"
                    counter
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Enter your password"
                    v-model="password"
                    color="rgba(255, 92, 0, 1)"
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
                    color="rgba(255, 92, 0, 1)"
                    v-model="password_confirm"
                    min="8"
                    :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    @click:append="e1 = !e1"
                    counter
                    required
                    orange
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn @click="$router.go(-1)">Cancel</v-btn>
                    <v-btn @click="submit" :class=" { 'orange darken-4 white--text' : valid, disabled: !valid }" :disabled="!validate">Create</v-btn>
                  </v-layout>

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
    name: 'Create',
    data () {
          return {
            valid: false,
            e1: true,
            username: '',
            password: '',
            password_confirm: '',
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
          validate: function() {
             console.log(this.password === this.password_confirm)
          },
          submit () {
            if (this.$refs.form.validate()) {
              var _ = this;
              this.createAccount({username: this.username, password: this.password}).then((data) => {
                var payload = {}
                payload.password = _.password
                payload.data = data
                console.log("hre",payload)
                this.$router.push({path: '/account/list'})
              })
              
            }
          },
          clear () {
            this.$refs.form.reset()
          }
        }
  }
</script>
