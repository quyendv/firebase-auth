import { UserCredential, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, googleProvider, messaging } from './configs/firebase.config';
import { getToken, onMessage } from 'firebase/messaging';
import Message from './components/Message';
import 'react-toastify/dist/ReactToastify.css';
import { toast as toastLib, ToastContainer } from 'react-toastify';

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

  const signInAnoFn = () => {
    signInAnonymously(auth)
      .then(async (result: UserCredential) => {
        const token = await result.user.getIdToken();
        console.log('Anonymous access token:', token);

        console.log('Anonymous user:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in anonymously:', error);
      });
  };

  const signOutFn = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  useEffect(() => {
    const id = setTimeout(clearToast, 1000);
    return () => clearTimeout(id);
  }, [toast]);

  // Notification
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FCM_PUBLIC_KEY,
      });

      //We can send token to server
      console.log('Token generated : ', token);
    } else if (permission === 'denied') {
      //notifications are blocked
      alert('You denied for the notification');
    }
  }

  onMessage(messaging, (payload) => {
    console.log('incoming msg');
    toastLib(<Message notification={payload.notification!} />);
  });

  useEffect(() => {
    requestPermission();
  }, []);
  // Notification

  return (
    <>
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

          <button className="google-button" onClick={signInAnoFn}>
            Sign in anonymously
          </button>

          <button className="google-button" onClick={signOutFn}>
            Sign out
          </button>
        </div>

        <div className="toast">{toast}</div>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
