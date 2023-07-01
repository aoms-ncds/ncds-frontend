import ExtensionIcon from '@mui/icons-material/Extension';
import DivisionsPage from '..';
import DivisionDetailsPage from '../DivisionDetails';

const divisionsPageRoutes: ModuleRoute = {
  base: '/divisions',
  pages: [
    {
      title: 'Divisions',
      path: '/',
      element: <DivisionsPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
    {
      title: 'Divisions',
      path: '/add',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    {
      title: 'Divisions',
      path: '/details/:divisionIDs',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    {
      title: 'Divisions',
      path: '/edit/:editID',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
  ],
};
export default divisionsPageRoutes;
