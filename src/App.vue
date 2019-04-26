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
  }
}
</script>
