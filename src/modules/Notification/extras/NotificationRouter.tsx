import { Notifications as NotificationsIcon } from '@mui/icons-material';
import MyMessagePage from '..';

const notificationPageRoutes: ModuleRoute = {
  base: '/notification',
  pages: [
    {
      title: 'Notification',
      path: '',
      element: <MyMessagePage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <NotificationsIcon/>,
    },
    // {
    //   title: 'Message',
    //   path: '/:_id',
    //   private: true,
    //   element: <MessageContent />,
    // },

  ],
};
export default notificationPageRoutes;
