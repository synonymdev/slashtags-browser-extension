<template>
<v-container fill-height class="loginOverlay">
    <v-layout align-center justify-center>
      <v-flex elevation-0>
        <v-card class="transparent elevation-0">
          <v-card-title>
            Add Profile
          </v-card-title>
          <v-card-text class="pt-4 transparent elevation-0">
            <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Enter profile name"
                    v-model="name"
                    min="8"
                    color="rgba(255, 92, 0, 1)"
                    type="text"
                    required
                  ></v-text-field>
                  <v-file-input v-show="!this.avatar"
                      :rules="rules"
                      accept="image/png, image/jpeg"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Avatar"
                      @change="onFileChange"
                  ></v-file-input>
                  <v-card class="transparent elevation-0">
                    <v-card-text>
                      <div style="text-align:center">
                        <img v-if="avatar" :src="avatar" class="avatar" />
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-layout justify-space-between>
                    <v-btn @click="submit" :class=" { 'orange darken-4 white--text' : valid, disabled: !valid }">Add</v-btn>
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
  name: 'Profile_Add',
  methods: {
    ...mapActions([
        'addProfile'
    ]),
    onFileChange(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e)
        reader.onload = e =>{
            this.avatar = e.target.result;
        };
    },
    submit () {
        if (this.$refs.form.validate()) {
            this.addProfile({name: this.name, image: this.avatar})
            this.$router.push({path:"/profile/list"})
        }
    }
  },
  data () {
    return {
      valid: false,
      name: null,
      image: false,
      avatar: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ]
    }
  }
}
</script>

<style scoped>
.avatar {
  border-radius: 100%;
}
</style>