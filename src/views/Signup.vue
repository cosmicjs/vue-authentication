<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>

        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Signup for your account</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon large>mdi-account-plus</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="formValid">
              <v-text-field prepend-icon="person"
              name="Full Name" label="Full Name" type="text" v-model="signUp.fullname" :rules="nameRules" required></v-text-field>
              <v-text-field prepend-icon="email"
              name="email" label="Email" type="text" v-model="signUp.email" :rules="emailRules" required></v-text-field>
              <v-text-field prepend-icon="lock"
              name="password" label="Password" id="password" type="password" v-model="signUp.password" :rules="passRules" required></v-text-field>
              <v-text-field prepend-icon="lock"
              name="password" label="Repeat Password" id="repeat-password" type="password" v-model="confirmpass" :rules="[comparePasswords]" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <router-link to="/login">Already have the account?</router-link>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSignup()">Sign up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    formValid: false,
    signUp: {
      fullname: '',
      email: '',
      password: ''
    },
    confirmpass: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length >= 3) || 'Name must be more than 3 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    confirmPass: [
      v => !!v || 'This field is required'
    ],
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Must have at least 6 characters'
    ]
  }),
  computed: {
    comparePasswords () {
      return this.signUp.password !== this.confirmPass ? 'Passwords do not match' : true
    }
  },
  methods: {
    onSignup () {
      this.$refs.form.validate()
      this.$store.dispatch('AUTH_SIGNUP', this.signUp)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
