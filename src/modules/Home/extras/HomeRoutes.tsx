import HomePage from '..';
import { Home as HomeIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';

const homePageRoutes: ModuleRoute = {
  base: '',
  pages: [
    {
      title: 'Home Page',
      path: '/',
      element: <HomePage />,
      private: true,
      requiredAccessRights: [
        'ADMIN_ACCESS',
        'READ_WORKERS',
        'WRITE_WORKERS',
        'READ_STAFFS',
        'WRITE_STAFFS',
        'READ_DIVISIONS',
        'WRITE_DIVISIONS',
        'READ_FR',
        'WRITE_FR',
        'READ_IRO',
        'WRITE_IRO',
        'READ_XYZ',
        'WRITE_XYZ',
      ],
      showInDrawer: true,
      icon: <HomeIcon />,
    },
    {
      title: 'Login page',
      path: '/login',
      element: <LoginPage />,
      private: false,
    },
  ],
};
export default homePageRoutes;
