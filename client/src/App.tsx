import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useNotifications } from '@/hooks/useNotifications';
import { onMessage } from 'firebase/messaging';
import { Facebook, LogOut, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { ToastContainer, toast as toastLib } from 'react-toastify';
import NotificationMessage from './components/NotificationMessage';
import { messaging } from './configs/firebase.config';
import { useAuth } from './hooks/useAuth';
import BulkAccountCreator from './components/BulkAccountCreator';

const App = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleEmailLogin,
    handleGoogleLogin,
    handleFacebookLogin,
    handleAnonymousLogin,
    handleSignOut,
    handleCopyToken,
    isLoading,
  } = useAuth();

  const { requestPermission } = useNotifications();

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('incoming msg', payload);
      if (payload.notification) {
        toastLib(<NotificationMessage notification={payload.notification} />, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'notification-toast',
        });
      }
    });

    return () => unsubscribe();
  }, [requestPermission]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email/Password Form */}
            <div className="space-y-2">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full" onClick={handleEmailLogin} disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in with Email'}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </Button>

              <Button variant="outline" className="w-full" onClick={handleFacebookLogin} disabled={isLoading}>
                <Facebook className="mr-2 h-4 w-4" />
                Sign in with Facebook
              </Button>

              <Button variant="outline" className="w-full" onClick={handleAnonymousLogin} disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                Sign in Anonymously
              </Button>
            </div>

            {/* Token and Sign Out */}
            <div className="space-y-2">
              <Button variant="secondary" className="w-full" onClick={handleCopyToken}>
                Copy Access Token
              </Button>

              <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <BulkAccountCreator />

      <ToastContainer />
      <Toaster />
    </>
  );
};

export default App;
