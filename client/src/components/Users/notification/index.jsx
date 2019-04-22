import {
  NotificationManager
} from 'react-notifications';

const createNotification = (type) => {
  switch (type) {
    case 'password':
      NotificationManager.success('Password added successfully. Save all Changes Now', 5000);
      break;
    case 'success':
      NotificationManager.success('Added successfully', 4000);
      break;
    case 'warning':
      NotificationManager.warning('warning', 3000);
      break;
    case 'error':
      NotificationManager.error('Oops', 'Something went wrong!')
      break;
    default:
      return;
  }
};

export default createNotification;