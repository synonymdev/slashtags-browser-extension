<template>
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-0>
        <v-toolbar class="pt-5 transparent elevation-0">
          <v-toolbar-items>
              <v-toolbar-title class="white--text"><h4>Terms and Conditions</h4></v-toolbar-title>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="transparent elevation-0">
          <v-card-text>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab iusto cum est, repellendus alias dicta maxime sequi totam sed vitae autem explicabo amet? Consectetur reprehenderit dolores iure veritatis sapiente maiores.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab iusto cum est, repellendus alias dicta maxime sequi totam sed vitae autem explicabo amet? Consectetur reprehenderit dolores iure veritatis sapiente maiores.</p>
          </v-card-text>
        </v-card>
        <v-card class="transparent elevation-0">
        <v-btn @click="$router.push({path:'/account/create'})">Next</v-btn>
        </v-card>
      </v-flex>
     
    </v-layout>
</template>

<script>
  export default {
    name: 'OnboardingTerms',
    data () {
        return {}
    }
  }
</script>

<style scoped>
.v-btn {
  padding:10px;
  background:rgba(255, 255, 255, 0.07);
}
</style>
