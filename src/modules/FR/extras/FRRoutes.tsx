import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import FRDashboard from '..';
import FRFormPage from '../FRFormPage';
import ClosedFR from '../ClosedFR';
import ManageFRPage from '../ManageFrPage';

const divisionsPageRoutes: ModuleRoute = {
  base: '/fr',
  pages: [
    {
      title: 'FR',
      path: '/',
      element: <FRDashboard />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Manage FR',
      path: '/manage',
      element: <ManageFRPage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Apply New FR',
      path: '/apply',
      element: <FRFormPage action="add" />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Closed FR',
      path: '/closed',
      element: <ClosedFR />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'View FR',
      path: '/:frID/view',
      element: <FRFormPage action="view" />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'edit FR',
      path: '/:frID/edit',
      element: <FRFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
  ],
};
export default divisionsPageRoutes;
