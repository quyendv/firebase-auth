import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getMessaging /* getToken, onMessage */ } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');
facebookProvider.addScope('user_friends');
// facebookProvider.setCustomParameters({
//   display: 'popup',
// });

// auth.languageCode = 'vi';

const messaging = getMessaging(app);

// Lấy registration token
// getToken(messaging, {
//   vapidKey: import.meta.env.VITE_FCM_PUBLIC_KEY, // https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_with
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log('Registration token:', currentToken);
//       // Lưu trữ hoặc gửi token này đến server nếu cần
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//     }
//   })
//   .catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//   });

// Lắng nghe các thông báo đến
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // Tùy chỉnh cách hiển thị thông báo tại đây
// });

// (function requestPermission() {
//   console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//     }
//   });
// })();

export { auth, googleProvider, facebookProvider, messaging };
