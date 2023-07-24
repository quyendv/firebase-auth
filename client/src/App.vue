<template>
  <div id="app">
    <input name="username" type="text" v-model.trim="loginForm.email" />
    <br />
    <input name="password" type="password" v-model.trim="loginForm.password" />
    <br />
    <button @click="login()">Login</button>
    <br /><br />
    <button @click="accessToken()">Access Token</button>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import { auth } from "./auth/auth.service";
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(function(fbUser) {
          console.log(fbUser);
        });
    },
    async accessToken() {
      const token = await auth.currentUser?.getIdToken();
      console.log(token);
    }
  }
};
</script>