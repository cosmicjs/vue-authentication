<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Your Password</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon large>mdi-lock-reset</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mdi-numeric" name="OTP" label="Code from email" type="text"></v-text-field>
              <v-text-field prepend-icon="mdi-email" name="email" label="Email" type="text"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" name="password" label="New Password" id="new-password" type="password"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" name="confirmPassword" label="Confirm New Password" id="confirm-password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Change Password</v-btn>
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
