<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <section>
       <v-layout
         column
         wrap
         class="my-5"
         align-center
       >
         <v-flex xs12 sm4 class="my-3">
           <div class="text-xs-center">
             <h2 class="headline">Vue Authentication with Cosmic JS backend</h2>
             <span class="subheading">
               AWS Lambda functions hosted via Netlify
             </span>
           </div>
         </v-flex>
         <v-flex xs12>
           <v-container grid-list-xl>
             <v-layout row wrap align-center>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-text class="text-xs-center">
                     <v-icon x-large class="blue--text text--lighten-2">star</v-icon>
                   </v-card-text>
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center">Cosmic JS</div>
                   </v-card-title>
                   <v-card-text>
                     Maybe a little unorthodox to use a CMS for your user database but Cosmic is extremely flexible and works great in many use cases.
                   </v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-text class="text-xs-center">
                     <v-icon x-large class="blue--text text--lighten-2">lock</v-icon>
                   </v-card-text>
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline">PBKDF2 Password Hashing</div>
                   </v-card-title>
                   <v-card-text>
                     PBKDF2 applies a pseudorandom function, such as hash-based message authentication code (HMAC), to the input password or passphrase along with a salt value and repeats the process many times to produce a derived key, which can then be used as a cryptographic key -Wikipedia
                   </v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-text class="text-xs-center">
                     <v-icon x-large class="blue--text text--lighten-2">email</v-icon>
                   </v-card-text>
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center">Verification Email</div>
                   </v-card-title>
                   <v-card-text>
                     Using SendInBlue SMTP we can send out transactional emails containing a URL which verifies the Token generated upon account creation to confirm the user submitted a real email they can access.
                   </v-card-text>
                 </v-card>
               </v-flex>
             </v-layout>
           </v-container>
         </v-flex>
       </v-layout>
     </section>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
//
    })
  }
</script>

<style>

</style>
