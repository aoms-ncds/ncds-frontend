import Profile from '../Profile';
import PermissionManager from '../PermissionManager';
import ForgottenPasswordFormPage from '../ForgotPasswordForm';
import ResetPasswordFormPage from '../rest_password_form';
import WorkerFormPage from '../../Workers/WorkerFormPage';

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
      title: 'Reset Password',
      path: '/reset_password',
      element: <ResetPasswordFormPage />,
      private: false,
    },
    {
      title: 'Reset Password',
      path: '/reset_password_form',
      element: <ForgottenPasswordFormPage />,
      private: false,
    },
    {
      title: 'View spouse',
      path: '/:userKind/:userId/:tabNO',
      element: <Profile />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    {
      title: 'Edit child',
      path: '/:userKind/:userId/:tabNO',
      element: <WorkerFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
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
