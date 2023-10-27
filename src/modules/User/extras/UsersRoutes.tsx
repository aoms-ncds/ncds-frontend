import Profile from '../Profile';
import PermissionManager from '../PermissionManager';
import ForgottenPasswordFormPage from '../ForgotPasswordForm';

const usersPageRoutes: ModuleRoute = {
  base: '/users',
  pages: [
    // {
    //   title: 'Workers',
    //   path: '/',
    //   element: <WorkersDashboard />,
    //   private: true,
    //   requiredAccessRights: ['READ_ACCESS'],
    //   showInDrawer: true,
    //   icon: <Diversity2Icon />,
    // },
    {
      title: 'Forgot Password',
      path: '/reset_password_form',
      element: <ForgottenPasswordFormPage />,
      private: false,
    },
    {
      title: 'View Profile',
      path: '/:userKind/:userId',
      element: <Profile />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    {
      title: 'Permission Manager',
      path: '/:userId/permission_manager',
      element: <PermissionManager />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
  ],
};
export default usersPageRoutes;
