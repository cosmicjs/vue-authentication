<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form ref="form" v-model="formValid">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login to your account</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-icon large>mdi-login</v-icon>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mdi-email" name="login-email" label="Email" type="text"></v-text-field>
                <v-text-field prepend-icon="mdi-lock" name="password" label="Password" id="password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" flat to="/forgot-password">Forgot Password?</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
      </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    formValid: false,
    login: {
      email: '',
      password: ''
    }
  }),
  methods: {
    onLogin () {
      this.$store.dispatch('AUTH_REQUEST', this.login)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
