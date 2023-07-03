import SettingsDashboard from '..';
import { Settings as SettingsIcon, Language as Lang } from '@mui/icons-material';
import Languages from '../Languages';
import Designation from '../Designation';
import ChildSupport from '../ChildSupport';

const settingsRoutes: ModuleRoute = {
  base: '/settings',
  pages: [
    {
      title: 'Settings ',
      path: '/',
      element: <SettingsDashboard />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <SettingsIcon />,
    },
    {
      title: 'Languages',
      path: '/languages',
      element: <Languages />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Designation',
      path: '/Designation',
      element: <Designation/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'ChildSupport',
      path: '/ChildSupport',
      element: <ChildSupport />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },

  ],
};
export default settingsRoutes;
