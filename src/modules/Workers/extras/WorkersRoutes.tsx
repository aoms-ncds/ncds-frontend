import React from 'react';
import WorkersDashboard from '..';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ManageWorkerPage from '../ManageWorkersPage';
import AddNewWorker from '../AddNewWorker';
import ApproveWorkerPage from '../ApproveWorkersPage';
import Profile from '../Profile';


const workersPageRoutes: ModuleRoute = {
  base: '/workers',
  pages: [
    {
      title: 'Workers',
      path: '/',
      element: <WorkersDashboard />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <Diversity2Icon />,
    },
    {
      title: 'Manage Workers',
      path: '/manage',
      element: <ManageWorkerPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Add New Worker',
      path: '/add_new_worker',
      element: <AddNewWorker />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Approve Workers',
      path: '/approve',
      element: <ApproveWorkerPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'View Profile',
      path: '/profile/:workersId',
      element: <Profile />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default workersPageRoutes;
