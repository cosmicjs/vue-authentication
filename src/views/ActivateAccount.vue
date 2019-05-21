<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title v-if="this.activated">Account Activated!</v-toolbar-title>
            <v-toolbar-title v-else>Account Failed Activation!</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon large v-if="this.activated">mdi-shield-check</v-icon>
            <v-icon large v-else>mdi-close-circle</v-icon>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import {settings} from '../settings'
  export default {
    data: () => ({
      activated: false
    }),
    methods: {

    },
    created () {
      //console.log(settings.API_SERVER+'ConfirmUserEmail?token='+this.$route.query.token)
      axios.post(settings.API_SERVER+'.netlify/functions/ConfirmUserEmail', {token: this.$route.query.token})
      .then(res => {
        if (res.status == 200) {
          this.activated = true
        }
      }).catch(err => {
        console.log(err)
      })
    }

  }
</script>
