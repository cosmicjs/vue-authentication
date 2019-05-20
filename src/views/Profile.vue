<template lang="html">
  <v-container fluid fill-height id="profile">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title>Your Account</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon large>mdi-account</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mdi-account" name="name" label="Name" type="text" v-model="this.username"></v-text-field>
              <v-text-field prepend-icon="mdi-email" name="login-email" label="Email" type="text" v-model="this.email"></v-text-field>
              <v-btn color="warning">Change Password</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="red lighten-1" dark @click="onLogout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    username: 'john doe',
    email: 'john@doe.com'
  }),
  methods: {
    onLogout () {
      this.$store.dispatch('AUTH_LOGOUT')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
