import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ClosedIRO from '../ClosedIRO';
import ManageIRO from '../ManageIRO';
import ReleaseAmount from '../ReleaseAmount';

const iroPageRoutes: ModuleRoute = {
  base: '/iro',
  pages: [
    {
      title: 'IRO',
      path: '/',
      element: <IRODashboard />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <RequestQuoteIcon />,
    },
    {
      title: 'Manage IRO',
      path: '/manage',
      element: <ManageIRO />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Closed IRO',
      path: '/closed',
      element: <ClosedIRO />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Release Amount',
      path: '/release_amount/:iroID',
      element: <ReleaseAmount />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
  ],
};
export default iroPageRoutes;
