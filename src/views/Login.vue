<template>
  <div align="center" valign="middle">

    uid/pwd: test/Complexpass#9876

    <!-- <button @click="federatedSignIn" >Federated Login</button> -->
      <amplify-authenticator></amplify-authenticator>
      <!-- <amplify-sign-in></amplify-sign-in> -->
      <!-- <br><a href="https://generic2.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=k1m8k2uejmb3ii6jt27fd1fio&redirect_uri=http://localhost:8080">Login using cognito</a> -->
  </div>
</template>

<script>
import { components, AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";

export default {
  computed: {
    signedIn: function() { return this.$store.state.signedIn  }
  },
  created() {
    this.isUserSignedIn();
    // AmplifyEventBus.$on("authState", info => {
    //   if (info === "signedIn") {
    //     this.$store.state.signedIn = true;
    //     this.$router.push({
    //       name: "demo"
    //     });
    //   } else if (info === "signedOut") {
    //     this.$store.state.signedIn = false;
    //     // this.$router.push({
    //     //   name: "Login"
    //     // });
    //   }
    //   console.log(this.$store.state);
    // });
  },
  methods: {
    isUserSignedIn: async function() {
      try {
        var userObject = await Auth.currentAuthenticatedUser();
        this.$store.state.signedIn = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>