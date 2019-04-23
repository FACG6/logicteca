import {
  NotificationManager
} from 'react-notifications';

const createNotification = (type) => {
  switch (type) {
    case 'password':
      NotificationManager.success('Password added successfully. Save all Changes Now', null, 1000);
      break;
    case 'success':
      NotificationManager.success('Added successfully', null, 5000);
      break;
    case 'row exist':
      NotificationManager.error('Please, save the previous member before adding a new one!', null, 5000);
      break;
    case 'error':
      NotificationManager.error('Oops', 'Something went wrong!')
      break;
    default:
      return;
  }
};

export default createNotification;