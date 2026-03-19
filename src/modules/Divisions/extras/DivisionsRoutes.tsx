import ExtensionIcon from '@mui/icons-material/Extension';
import DivisionsPage from '..';
import DivisionDetailsPage from '../DivisionDetails';
import { hasPermissions } from '../../User/components/PermissionChecks';

const divisionsPageRoutes: ModuleRoute = {
  base: '/divisions',
  pages: [
    {
      title: 'Divisions',
      path: '/',
      element: <DivisionsPage />,
      private: true,
      requiredAccessRights: ['READ_ALL_DIVISIONS'],
      showInDrawer: true,
      // icon: <ExtensionIcon />,
      icon: <img src="/mod_icons/division.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Divisions',
      path: '/view',
      element: <DivisionsPage />,
      private: true,
      requiredAccessRights: ['EDIT_DIVISION_ACCESS'],
      showInDrawer: true,
      // icon: <ExtensionIcon />,
      icon: <img src="/mod_icons/division.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Divisions',
      path: '/add',
      element: <DivisionDetailsPage action="add" />,
      private: true,
      requiredAccessRights: ['WRITE_DIVISIONS'],
    },
    {
      title: 'Divisions',
      path: '/details/:divisionIDs',
      element: <DivisionDetailsPage action="view"/>,
      private: true,
      requiredAccessRights: ['READ_DIVISIONS'],
    },
    {
      title: 'Divisions',
      path: '/edit/:editID',
      element: <DivisionDetailsPage action="edit"/>,
      private: true,
      requiredAccessRights: ['WRITE_DIVISIONS'],
    },
    {
      title: 'Divisions',
      path: '/editcoordinator/:editID',
      element: <DivisionDetailsPage coordinator={true} action="edit"/>,
      private: true,
      requiredAccessRights: ['EDIT_DIVISION_ACCESS'],
    },
  ],
};
export default divisionsPageRoutes;
