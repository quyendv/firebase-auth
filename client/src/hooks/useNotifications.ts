import { useToast } from '@/hooks/use-toast';
import { getToken } from 'firebase/messaging';
import { messaging } from '../configs/firebase.config';

export const useNotifications = () => {
  const { toast } = useToast();

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FCM_PUBLIC_KEY,
        });
        console.log('FCM Token:', token);
      } else {
        toast({
          variant: 'destructive',
          title: 'Notification Permission',
          description: 'Notifications are blocked. Please enable them in your browser settings.',
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  // useEffect(() => {
  //   requestPermission();

  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log('incoming msg', payload);
  //     if (payload.notification) {
  //       const { title, body } = payload.notification;
  //       toast({
  //         title: title || 'New Notification',
  //         description: body,
  //       });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return { requestPermission };
};
