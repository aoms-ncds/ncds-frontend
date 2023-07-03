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
