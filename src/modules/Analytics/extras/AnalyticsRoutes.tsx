import { Analytics, Home as HomeIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';

const AnalyticsPageRoutes: ModuleRoute = {
  base: '',
  pages: [
    {
      title: 'Analytics',
      path: '/',
      element: <Analytics />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      // icon: <HomeIcon />,
      icon: <img src="/mod_icons/home.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },

  ],
};
export default AnalyticsPageRoutes;
