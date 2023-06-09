// import ApplicationsDashboard from '..';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import APPDashboard from '..';
import ApplicationsListingPage from '../ApplicationsListingPage';
import ApplicationApprovalPage from '../ApplicationApprovalPage';
import AddNewApplication from '../AddNewApplication';

const applicationRoutes: ModuleRoute = {
  base: '/application',
  pages: [
    {
      title: 'Application',
      path: '/',
      element: <APPDashboard />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <AccessAlarmIcon />,
    },
    {
      title: 'Add Request',
      path: '/list',
      element: <ApplicationsListingPage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Application Manage',
      path: '/:applicationID/approval',
      element: <ApplicationApprovalPage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Add New Application',
      path: '/add',
      element: <AddNewApplication />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    // {
    //   title: 'Add New Application',
    //   path: '/:applicationID/edit',
    //   element: <AddNewApplication />,
    //   private: true,
    //   requiredAccessRights: ['ADMIN_ACCESS'],
    // },

  ],
};

export default applicationRoutes;
