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
    // {
    //   title: 'Message',
    //   path: '/:_id',
    //   private: true,
    //   element: <MessageContent />,
    // },

  ],
};
export default notificationPageRoutes;
