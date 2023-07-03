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
      requiredAccessRights: ['WRITE_DIVISIONS'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
    {
      title: 'Divisions',
      path: '/add',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['WRITE_DIVISIONS'],
    },
    {
      title: 'Divisions',
      path: '/details/:divisionIDs',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['READ_DIVISIONS'],
    },
    {
      title: 'Divisions',
      path: '/edit/:editID',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['WRITE_DIVISIONS'],
    },
  ],
};
export default divisionsPageRoutes;
