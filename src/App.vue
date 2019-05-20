<template>
  <v-app id="app">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>V</span>
        <span class="font-weight-light">COSMIC AUTH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        to="/"
      >
        Home
      </v-btn>
      <v-btn
        flat
        to="/login"
        v-if="!this.$store.getters.isAuthenticated"
      >
        Login
      </v-btn>
      <v-btn
        flat
        v-if="!this.$store.getters.isAuthenticated"
        to="/signup"
      >
        Sign Up
      </v-btn>
      <v-btn
        flat
        v-if="this.$store.getters.isAuthenticated"
        to="/profile"
      >
        Profile
      </v-btn>
      <v-btn
        flat
        v-if="this.$store.getters.isAuthenticated"
        to="/logout"
        @click="onLogout"
      >
        Logout
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('AUTH_LOGOUT')
    }
  },
  created: function () {
    if(this.$store.getters.isAuthenticated) {
      this.$store.dispatch('AUTH_PERSIST', { token: localStorage.getItem('user-token') })
    }
    // INTERCEPT unauthorized REQUESTS AND LOGOUT
    // axios.interceptors.response.use(undefined, function (err) {
    //   return new Promise(function (resolve, reject) {
    //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //     // if you ever get an unauthorized, logout the user
    //       this.$store.dispatch(AUTH_LOGOUT)
    //     // you can also redirect to /login if needed !
    //     }
    //     throw err
    //   })
    // })
  }
}
</script>
