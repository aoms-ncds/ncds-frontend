<<<<<<< HEAD
import SampleModule from '..';
import { Extension as ExtensionIcon } from '@mui/icons-material';

const samplesPageRoutes: ModuleRoute = {
  base: '/sample',
  pages: [
    {
      title: 'Samples Module page',
      path: '',
      element: <SampleModule />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
  ],
};
export default samplesPageRoutes;
=======
import SampleModule from '..';
import { Extension as ExtensionIcon } from '@mui/icons-material';

const samplesPageRoutes: ModuleRoute = {
  base: '/sample',
  pages: [
    {
      title: 'Samples Module page',
      path: '',
      element: <SampleModule />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
  ],
};
export default samplesPageRoutes;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
