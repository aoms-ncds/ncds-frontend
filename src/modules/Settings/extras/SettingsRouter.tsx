import SettingsDashboard from '..';
import { Settings as SettingsIcon, Language as Lang } from '@mui/icons-material';
import Languages from '../Languages';


const settingsRoutes: ModuleRoute = {
  base: '/settings',
  pages: [
    {
      title: 'Settings ',
      path: '/',
      element: <SettingsDashboard />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      icon: <SettingsIcon />,
    },
    {
      title: 'Languages',
      path: '/languages',
      element: <Languages />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },

  ],
};
export default settingsRoutes;
