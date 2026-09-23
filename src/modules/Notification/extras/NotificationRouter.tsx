<<<<<<< HEAD
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import NotificationPage from '..';
import MessageContent from '../components/MessageContent';

const notificationPageRoutes: ModuleRoute = {
  base: '/notification',
  pages: [
    {
      title: 'Notification',
      path: '',
      element: <NotificationPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: false,
      icon: <NotificationsIcon/>,
    },
    {
      title: 'Message',
      path: '/:_id',
      private: true,
      element: <MessageContent />,
    },

  ],
};
export default notificationPageRoutes;
=======
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import NotificationPage from '..';
import MessageContent from '../components/MessageContent';

const notificationPageRoutes: ModuleRoute = {
  base: '/notification',
  pages: [
    {
      title: 'Notification',
      path: '',
      element: <NotificationPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: false,
      icon: <NotificationsIcon/>,
    },
    {
      title: 'Message',
      path: '/:_id',
      private: true,
      element: <MessageContent />,
    },

  ],
};
export default notificationPageRoutes;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
