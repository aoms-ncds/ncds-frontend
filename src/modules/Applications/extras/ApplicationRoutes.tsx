// import ApplicationsDashboard from '..';
// import { NoteAlt as NoteAltIcon } from '@mui/icons-material/AccessAlarm';
import APPDashboard from '..';
import ApplicationsListingPage from '../ApplicationsListingPage';
import ApplicationApprovalPage from '../ApplicationApprovalPage';
import AddNewApplication from '../AddNewApplication';
import { NoteAlt as NoteAltIcon } from '@mui/icons-material';

const applicationRoutes: ModuleRoute = {
  base: '/application',
  pages: [
    {
      title: 'Application',
      path: '/',
      element: <APPDashboard />,
      private: true,
      requiredAccessRights: ['READ_APPLICATION'],
      showInDrawer: true,
      // icon: <NoteAltIcon/>,
      icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Add Request',
      path: '/manage',
      element: <ApplicationsListingPage action={'manage'} />,
      private: true,
      requiredAccessRights: ['READ_APPLICATION'],
    },
    {
      title: 'Application Manage',
      path: '/:applicationID/approval',
      element: <ApplicationApprovalPage />,
      private: true,
      requiredAccessRights: ['READ_APPLICATION'],
    },
    {
      title: 'Add New Application',
      path: '/add',
      element: <AddNewApplication />,
      private: true,
      requiredAccessRights: ['WRITE_APPLICATION'],
    },
    {
      title: 'Approve Request',
      path: '/hr_approve',
      element: <ApplicationsListingPage action={'hr'} />,
      private: true,
      requiredAccessRights: ['MANAGE_APPLICATION'],
    },
    {
      title: 'Approve Request',
      path: '/president_approve',
      element: <ApplicationsListingPage action={'president'} />,
      private: true,
      requiredAccessRights: ['PRESIDENT_ACCESS'],
    },
    {
      title: 'Welfare',
      path: '/Welfare',
      element: <ApplicationsListingPage action={'welfare'} />,
      private: true,
      requiredAccessRights: [],
    },

  ],
};

export default applicationRoutes;
