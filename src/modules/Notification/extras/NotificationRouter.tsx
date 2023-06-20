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

    },

  ],
};
export default notificationPageRoutes;
