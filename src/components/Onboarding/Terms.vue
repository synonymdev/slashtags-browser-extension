<template>
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-0>
        <v-card class="transparent elevation-0">
          <v-card-text>
            <div style="text-align:center">
              <v-img src="/logo.svg" style="width:100px;margin:auto" align-center class="fade-in"></v-img>
            </div>
          </v-card-text>
        </v-card>
        <!--v-card class="transparent elevation-0">
        <v-btn @click="$router.push({path:'/account/create'})">Next</v-btn>
        </v-card-->
      </v-flex>
     
    </v-layout>
</template>

<script>
  export default {
    name: 'OnboardingTerms',
    data () {
        return {}
    },
    created() {
      setTimeout(() => {
        this.$router.push({path: "/account/create"})
      },3000)
    }
  }
</script>

<style scoped>
.layout {
  padding-top:140px;
}

.fade-in {
  animation: fadeIn 2s;
  opacity: 1;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.v-btn {
  padding:10px;
  background:rgba(255, 255, 255, 0.07);
}
</style>
