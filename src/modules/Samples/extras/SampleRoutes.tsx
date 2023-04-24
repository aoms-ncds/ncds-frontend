import React from 'react';
import SamplesHome from '..';
import { Science as ScienceIcon } from '@mui/icons-material';
import ApplicationForm from '../ExcelUploaderSample';

const samplesPageRoutes: ModuleRoute = {
  base: '/samples',
  pages: [
    {
      title: 'Samples Module',
      path: '',
      element: <SamplesHome />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <ScienceIcon />,
    },
    {
      title: 'Application form',
      path: '/apply',
      element: <ApplicationForm />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default samplesPageRoutes;
