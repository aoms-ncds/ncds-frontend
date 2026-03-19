import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ClosedIRO from '../ClosedIRO';
import ManageIRO from '../ManageIRO';
import ViewIRO from '../ViewIRO';
import ReconciliationIRO from '../ReconciliationIRO';
import OfficeMangerApprove from '../OfficeManagerApprovel';
import EditIRO from '../EditIRO';
import ReleaseFmRequest from '../ReleaseFmRequest';
import RejectedIRO from '../RejectedIRO';
import ReleaseAmountAudit from '../ReleaseAmountAudit';
import CustomIRO from '../CustomIRO';
import FRFormPage from '../../FR/FRFormPage';
import ReopenedIRO from '../ReopenedIRO';
import EditIROForRevert from '../EditIROForRevert';
import AccountApprove from '../AccountApprovel';
import EditForCustom from '../EditForCustom';
import EditIROCustom from '../EditIROCustom';
import RevertedIRO from '../Reverted';
import DisapprovedIRO from '../Disapproved';


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
      requiredAccessRights: ['AUDIT_VIEW'],
    },
    {
      title: 'Closed IRO',
      path: '/closed',
      element: <ClosedIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'custom IRO',
      path: '/custom',
      element: <CustomIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Apply Custom IRO',
      path: '/applyCustom',
      element: <FRFormPage action="customIRO" />,
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
      title: 'Rejected IRO',
      path: '/disapproved',
      element: <DisapprovedIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Rejected IRO',
      path: '/reverted',
      element: <RevertedIRO />,
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
      title: 'Re opened IRO',
      path: '/reopened',
      element: <ReopenedIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'View IRO',
      path: '/:iroID/custom',
      element: <ViewIRO action={'custom'} />,
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
    {
      title: 'Edit Custom',
      path: '/:iroID/editCustom',
      element: <EditIROCustom/>,
      private: true,
      requiredAccessRights: ['MANAGE_IRO'],
    },
    {
      title: 'Edit IRO REVERT',
      path: '/:iroID/EditIROForRevert',
      element: <EditIROForRevert />,
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
