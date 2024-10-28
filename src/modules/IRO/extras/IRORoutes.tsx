import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ClosedIRO from '../ClosedIRO';
import ManageIRO from '../ManageIRO';
import ViewIRO from '../ViewIRO';
import ReconciliationIRO from '../ReconciliationIRO';
import AccountApprove from '../AccountApprovel';
import OfficeMangerApprove from '../OfficeManagerApprovel';
import EditIRO from '../EditIRO';
import ReleaseFmRequest from '../ReleaseFmRequest';
import RejectedIRO from '../RejectedIRO';
import ReleaseAmountAudit from '../ReleaseAmountAudit';


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
      icon: <img src="/mod_icons/IRO.png" alt="Logo" style={{ width: '30px', height: '30x' }} />,
    },
    {
      title: 'Manage IRO',
      path: '/manage',
      element: <ManageIRO action='manage'/>,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Office Verify',
      path: '/office_approve',
      element: <OfficeMangerApprove action={'manage'}/>,
      private: true,
      requiredAccessRights: ['OFFICE_MNGR_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    }, {
      title: 'Account Verify',
      path: '/account_approve',
      element: <AccountApprove action={'manage'}/>,
      private: true,
      requiredAccessRights: ['ACCOUNTS_MNGR_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Release Amount',
      path: '/release_amount',
      element: <ManageIRO action='release'/>,
      private: true,
      requiredAccessRights: ['MANAGE_IRO'],
    },
    {
      title: 'Release Amount FM Request',
      path: '/release_amount_fm_request',
      element: <ReleaseFmRequest action='release'/>,
      private: true,
      requiredAccessRights: ['MANAGE_IRO'],
    },
    {
      title: 'Release Amount audit',
      path: '/release_amount_audit',
      element: <ReleaseAmountAudit action='release'/>,
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
      title: 'Rejected IRO',
      path: '/rejected',
      element: <RejectedIRO />,
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
    {
      title: 'Edit IRO',
      path: '/:iroID/edit',
      element: <EditIRO />,
      private: true,
      requiredAccessRights: ['MANAGE_IRO'],
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
