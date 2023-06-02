import React from 'react';
import SettingsDashboard from '..';
import { Settings as SettingsIcon, Language as Lang } from '@mui/icons-material';
import Languages from '../Languages';


const settingsRoutes: ModuleRoute = {
  base: '/settings',
  pages: [
    {
      title: 'Settings Dashboard',
      path: '/',
      element: <SettingsDashboard />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <SettingsIcon />,
    },
    {
      title: 'Languages',
      path: '/Languages',
      element: <Languages />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: false,
      icon: <Lang />,
    },
  ],
};
export default settingsRoutes;
