import { NotificationPayload } from 'firebase/messaging';

const NotificationMessage = ({ notification }: { notification: NotificationPayload }) => {
  return (
    <div className="flex flex-col min-w-[300px]">
      <div className="flex items-center gap-3">
        {notification.image && (
          <div className="flex-shrink-0">
            <img
              src={notification.image}
              alt={notification.title || 'Notification'}
              className="w-12 h-12 rounded-md object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{notification.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{notification.body}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationMessage;
