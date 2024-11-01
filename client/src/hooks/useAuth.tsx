/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { UserCredential, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth/cordova';
import { auth, facebookProvider, googleProvider } from '../configs/firebase.config';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleError = (error: any) => {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error.message,
    });
    setIsLoading(false);
  };

  const handleSuccess = async (result: UserCredential) => {
    const token = await result.user.getIdToken();
    console.log('Access token:', token);

    toast({
      title: 'Success',
      description: 'Successfully signed in!',
    });
    setIsLoading(false);
  };

  const handleEmailLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleSuccess(result);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await handleSuccess(result);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      await handleSuccess(result);
    } catch (error: any) {
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.error('Facebook auth error:', error, credential);
      handleError(error);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInAnonymously(auth);
      await handleSuccess(result);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      toast({
        title: 'Success',
        description: 'Successfully signed out!',
      });
      setIsLoading(false);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleCopyToken = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        await navigator.clipboard.writeText(token);
        toast({
          title: 'Success',
          description: 'Token copied to clipboard!',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No user is signed in',
        });
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleEmailLogin,
    handleGoogleLogin,
    handleFacebookLogin,
    handleAnonymousLogin,
    handleSignOut,
    handleCopyToken,
  };
};
