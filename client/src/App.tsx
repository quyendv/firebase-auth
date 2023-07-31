import { UserCredential, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, googleProvider } from './configs/firebase.config';

function App() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [toast, setToast] = useState<string>('');

  const login = () => {
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password).then((fbUser: UserCredential) => {
      console.log(fbUser);
    });
  };

  const accessToken = async () => {
    const token = await auth.currentUser?.getIdToken();
    console.log(token);

    // Copy token
    if (token) {
      const textArea = document.createElement('textarea');
      textArea.value = token;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      showToast('Copied token to clipboard');
    }
  };

  const showToast = (message: string) => {
    document.querySelector('.toast')?.classList.add('active');
    setToast(message);
  };

  const clearToast = () => {
    document.querySelector('.toast')?.classList.remove('active');
    setToast('');
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result: UserCredential) => {
        const token = await result.user.getIdToken();
        console.log('Google access token:', token);

        const user = result.user;
        console.log('Google user:', user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  useEffect(() => {
    const id = setTimeout(clearToast, 1000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div id="app">
      <div className="login-form">
        <h2>Login</h2>

        <div className="input-row">
          <input
            name="username"
            type="text"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="input-row">
          <input
            name="password"
            type="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        <div className="button-group">
          <button onClick={login}>Login</button>
          <button onClick={accessToken}>Access Token</button>
        </div>

        <button className="google-button" onClick={signInWithGoogle}>
          <span className="icon">
            <i className="fab fa-google"></i>
          </span>
          Sign in with Google
        </button>
      </div>

      <div className="toast">{toast}</div>
    </div>
  );
}

export default App;
