import HomePage from '..';
import { Home as HomeIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';

const homePageRoutes: ModuleRoute = {
  base: '',
  pages: [
    {
      title: 'Home',
      path: '/',
      element: <HomePage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      // icon: <HomeIcon />,
      icon: <img src="/mod_icons/home.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
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
