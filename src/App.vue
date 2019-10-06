<template>
  <div id="app">
    <amplify-sign-out v-if='signed'></amplify-sign-out>
    <div id="nav" v-if='signed'>
      <router-link to="/">Home</router-link> |
      <router-link to="/demo">Demo</router-link>|
      <router-link to="/status">Status</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { components, AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from "aws-amplify";


export default {
  name: 'App',
  components: {
    ...components
  },
  data: function () {
    return {
      status: 'good',
      signed: false,
    }
  },
  created() {
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.signed = true
        console.log("Just signed in")
        this.$router.push("/")
      } else if (info === "signedOut") {
        console.log('Signedout')
        this.$router.push({
          name: "Login"
        });
        this.signed = false
      }
    });
  },
  updated() {
    Auth.currentAuthenticatedUser().then(user => {
        this.signed = true;
      }).catch(error=>{
        console.log(error);
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
