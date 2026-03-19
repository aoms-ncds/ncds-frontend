import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import FRDashboard from '..';
import FRFormPage from '../FRFormPage';
import ClosedFR from '../ClosedFR';
import ManageFRPage from '../ManageFrPage';
import PresidentApproval from '../PresidentApproval';
import SentBack from '../SendBack';
import WorkerSupportPage from '../WorkerSupport';
import ChildeSupportPage from '../ChildeSupprt';
import ManageFrForDivision from '../ManagrFrForDivision';
import SupportFrPage from '../SupportFr';
import RejectedFr from '../RejectedFr';
import ReopenedFr from '../ReopenedFr';
import CustomFR from '../CustomFR';
import NonSupport from '../Non-Support';
import Resubmitted from '../Resubmitted';


const divisionsPageRoutes: ModuleRoute = {
  base: '/fr',
  pages: [
    {
      title: 'FR',
      path: '/',
      element: <FRDashboard />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      showInDrawer: true,
      icon: <img src="/mod_icons/fr.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Manage FR',
      path: '/manage',
      element: <ManageFRPage />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Manage FR',
      path: '/manageForDivision',
      element: <ManageFrForDivision />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'FR Verify',
      path: '/Approve',
      element: <PresidentApproval />,
      private: true,
      requiredAccessRights: ['PRESIDENT_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Create New FR',
      path: '/apply',
      element: <FRFormPage action="add" />,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Create Custom FR',
      path: '/applyCustom',
      element: <FRFormPage action="custom" />,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Closed FR',
      path: '/closed',
      element: <ClosedFR />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Resubmitted FR',
      path: '/resubmitted',
      element: <Resubmitted />,
      private: true,
      requiredAccessRights: ['MANAGE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Re opened FR',
      path: '/reopened',
      element: <ReopenedFr />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'View FR',
      path: '/:frID/view',
      element: <FRFormPage action="view" />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'View FR',
      path: '/:frID/viewCustom',
      element: <FRFormPage action="custom" actionAd='view' />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Edit FR',
      path: '/:frID/edit',
      element: <FRFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Edit FR',
      path: '/:frID/editAdmin',
      element: <FRFormPage action="editAdmin" />,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Edit FR',
      path: '/:frID/editReopen',
      element: <FRFormPage action="reopen" />,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Edit FR',
      path: '/:frID/editCustom',
      element: <FRFormPage action="customEdit" />,
      private: true,
      requiredAccessRights: ['MANAGE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Revert Fr',
      path: '/sentBack',
      element: <SentBack/>,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Reject Fr',
      path: '/rejected',
      element: <RejectedFr/>,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Support structure',
      path: '/worker_support',
      element: <WorkerSupportPage/>,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Support structure',
      path: '/child_support',
      element: <ChildeSupportPage/>,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Support FR',
      path: '/support',
      element: <SupportFrPage/>,
      private: true,
      requiredAccessRights: ['HR_DPARTMENT_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Non Support FR',
      path: '/Non-support',
      element: <NonSupport/>,
      private: true,
      requiredAccessRights: ['HR_DPARTMENT_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Custom FR',
      path: '/CustomFR',
      element: <CustomFR/>,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
  ],
};
export default divisionsPageRoutes;
