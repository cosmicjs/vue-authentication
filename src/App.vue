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
      >
        Login
      </v-btn>
      <v-btn
        flat
        to="/signup"
      >
        Sign Up
      </v-btn>
      <v-btn
        flat
        to="/profile"
      >
        Profile
      </v-btn>
      <v-btn
        flat
        to="/logout"
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
  created: function () {
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
