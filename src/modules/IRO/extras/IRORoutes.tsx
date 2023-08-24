import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ClosedIRO from '../ClosedIRO';
import ManageIRO from '../ManageIRO';
import ReleaseAmount from '../ReleaseAmount';
import ViewIRO from '../ViewIRO';
import ReconciliationIRO from '../ReconciliationIRO';

const iroPageRoutes: ModuleRoute = {
  base: '/iro',
  pages: [
    {
      title: 'IRO',
      path: '/',
      element: <IRODashboard />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
      showInDrawer: true,
      // icon: <RequestQuoteIcon />,
      icon: <img src="/IroLogo.png" alt="Logo" style={{ width: '30px', height: '30x' }} />,
    },
    {
      title: 'Manage IRO',
      path: '/manage',
      element: <ManageIRO action='manage'/>,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Release Amount',
      path: '/release_amount',
      element: <ManageIRO action='release'/>,
      private: true,
      requiredAccessRights: ['MANAGE_IRO'],
    },
    {
      title: 'Closed IRO',
      path: '/closed',
      element: <ClosedIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Reconciliation IRO',
      path: '/reconciliation',
      element: <ReconciliationIRO/>,
      private: true,
      requiredAccessRights: ['MANAGE_IRO'],
    },
    {
      title: 'View IRO',
      path: '/:iroID',
      element: <ViewIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    // {
    //   title: 'Release Amount',
    //   path: '/release_amount/:iroID/add',
    //   element: <ReleaseAmount action='add'/>,
    //   private: true,
    //   requiredAccessRights: ['WRITE_IRO'],
    //   icon: <RequestPageOutlinedIcon />,
    // },
    // {
    //   title: 'Release Amount',
    //   path: '/release_amount/:iroID/view',
    //   element: <ReleaseAmount action='view'/>,
    //   private: true,
    //   requiredAccessRights: ['READ_IRO'],
    //   icon: <RequestPageOutlinedIcon />,
    // },
  ],
};
export default iroPageRoutes;
