import {
  NotificationManager
} from 'react-notifications';

const createNotification = (type) => {
  switch (type) {
    case 'password':
      NotificationManager.success('Password added successfully. Save all Changes Now', 'Great');
      break;
    case 'success':
      NotificationManager.success('Added successfully', 'Good!');
      break;
    case 'warning':
      NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
      break;
    case 'error':
      NotificationManager.error('Oops', 'Something went wrong!', 5000, () => {
        alert('callback');
      });
      break;
    default:
      return;
  }
};

export default createNotification;