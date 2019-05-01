<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Forgot Password?</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon large>mdi-lock-question</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="email" name="email" label="Email" type="text"></v-text-field>
              <!-- <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field> -->
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block>Reset Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
