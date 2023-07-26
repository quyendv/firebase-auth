<template>
  <div id="app">
    <div class="login-form">
      <h2>Login</h2>
      <div class="input-row">
        <input
          name="username"
          type="text"
          v-model.trim="loginForm.email"
          placeholder="Email"
        />
      </div>
      <div class="input-row">
        <input
          name="password"
          type="password"
          v-model.trim="loginForm.password"
          placeholder="Password"
        />
      </div>
      <div class="button-group">
        <button @click="login()">Login</button>
        <button @click="accessToken()">Access Token</button>
      </div>
      <button class="google-button" @click="signInWithGoogle()">
        <span class="icon"><i class="fab fa-google"></i></span>
        Sign in with Google
      </button>
    </div>
    <div class="toast"></div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding: 30px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h2 {
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  button + button {
    margin-left: 5px;
  }
}

button {
  flex: 1;
  padding: 10px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #2e8540;
}

.google-button {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  width: 100%;
}

.google-button .icon {
  margin-right: 10px;
}

.google-button:hover {
  background-color: #0c7cd5;
}

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  opacity: 0;
  transition: all 0.5s;
}

.toast.active {
  opacity: 1;
  bottom: 30px;
}
</style>
<script>
import { auth, googleProvider } from './auth/auth.service';

let toastEl;
let timeoutId;
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password,
        )
        .then(function(fbUser) {
          console.log(fbUser);
        });
    },
    async accessToken() {
      const token = await auth.currentUser?.getIdToken();
      console.log(token);

      // Copy the token to the clipboard
      const textArea = document.createElement('textarea');
      textArea.value = token;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      this.showToast('Copied token to clipboard');
    },
    showToast(message) {
      if (toastEl) {
        toastEl.classList.remove('active');
      }

      toastEl = document.querySelector('.toast');
      toastEl.textContent = message;
      toastEl.classList.add('active');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        toastEl.classList.remove('active');
      }, 1000);
    },
    signInWithGoogle() {
      auth
        .signInWithPopup(googleProvider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          console.log('Google access token:', token);

          // The signed-in user info.
          const user = result.user;
          console.log('Google user:', user);
        })
        .catch(function(error) {
          // Handle Errors here.
          console.error('Error signing in with Google:', error);
        });
    },
  },
};
</script>
