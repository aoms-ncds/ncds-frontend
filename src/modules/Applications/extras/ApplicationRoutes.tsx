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
      requiredAccessRights: ['READ_ACCESS'],
      showInDrawer: true,
      icon: <NoteAltIcon/>,
    },
    {
      title: 'Add Request',
      path: '/list',
      element: <ApplicationsListingPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    {
      title: 'Application Manage',
      path: '/:applicationID/approval',
      element: <ApplicationApprovalPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    {
      title: 'Add New Application',
      path: '/add',
      element: <AddNewApplication />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
    },
    // {
    //   title: 'Add New Application',
    //   path: '/:applicationID/edit',
    //   element: <AddNewApplication />,
    //   private: true,
    //   requiredAccessRights: ['READ_ACCESS'],
    // },

  ],
};

export default applicationRoutes;
