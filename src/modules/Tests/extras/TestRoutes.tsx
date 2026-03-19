import TestModule from '..';
import { Extension as ExtensionIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';
import ForgotPasswordFormPage from '../../User/ForgotPasswordForm';

const testsPageRoutes: ModuleRoute = {
  base: '/tests',
  pages: [
    // {
    //   title: ' Tests Module page',
    //   path: '',
    //   element: <TestModule />,
    //   private: true,
    //   requiredAccessRights: ['READ_ACCESS'],
    //   showInDrawer: true,
    //   icon: <ExtensionIcon />,
    // },
    {
      title: 'Login page',
      path: '/Users/Login',
      element: <LoginPage />,
      private: false,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: false,
    },
    {
      title: 'Reset Password Page',
      path: '/ForgotPasswordForm',
      element: <ForgotPasswordFormPage />,
      private: false,
      requiredAccessRights: [],
      showInDrawer: false,
    },
  ],
};
export default testsPageRoutes;
