<template>
  <div>Your account has been activated!</div>
</template>

<script>
  import axios from 'axios'
  import {settings} from '../settings'
  export default {
    data: () => ({
      //
    }),
    methods: {

    },
    created () {
      // axios.post()
      console.log(this.$route.query.token)
      console.log(settings.API_SERVER)
    }

  }
</script>
