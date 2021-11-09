<template>
  <v-container fluid fill-height>
    <v-container fluid fill-height>
      <v-layout>
      <router-view></router-view>
      </v-layout>
    </v-container>
    <!--v-container fluid fill-height>
      <v-layout justify-space-between>
        <v-btn v-if="prev" :to="prev">Prev</v-btn>
        <v-btn v-if="next" :to="next">Next</v-btn>
        <v-btn v-if="last" :to="done">Done</v-btn>
      </v-layout>
    </v-container-->
   </v-container>
</template>

<script>
export default {
  name: 'OnBoarding',
  data () {
    return {
      e1: 1,
    }
  },
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    routes() {
      console.log(this.$router.options.routes.find(r => r.name === 'onboarding').children)
      return this.$router.options.routes.find(r => r.name === 'onboarding').children;
    },
    routeIndex() {
      return this.routes.findIndex(r => r.name === this.$route.name);
    },
    last() {
      return this.routeIndex == (this.routes.length - 1)
    },
    prev() {
      const route = this.routes[this.routeIndex - 1];
      return route && { name: route.name };
    },
    next() {
      const route = this.routes[this.routeIndex + 1];
      return route && { name: route.name };
    },
    done() {
      return "/login"
    }
  }
}
</script>

<style scoped>
p {
  opacity: 0.4;
  font-size: 20px;
}
</style>
