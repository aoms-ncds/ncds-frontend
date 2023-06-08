import React from 'react';
import WorkersDashboard from '..';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ManageWorkerPage from '../ManageWorkersPage';
import WorkerFormPage from '../WorkerFormPage';
import ApproveWorkerPage from '../ApproveWorkersPage';
import Profile from '../../User/Profile';
import AddNewChildPage from '../AddNewChild';

const workersPageRoutes: ModuleRoute = {
  base: '/workers',
  pages: [
    {
      title: 'Workers',
      path: '/',
      element: <WorkersDashboard />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <Diversity2Icon />,
    },
    {
      title: 'Manage Workers',
      path: '/manage',
      element: <ManageWorkerPage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Add New Worker',
      path: '/add',
      element: <WorkerFormPage action="add" />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Approve Workers',
      path: '/approve',
      element: <ApproveWorkerPage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'Edit Worker',
      path: '/edit/:id',
      element: <WorkerFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'add child',
      path: '/addchild',
      element: <AddNewChildPage action={'add'} />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    {
      title: 'edit child',
      path: '/childedit/:childId',
      element: <AddNewChildPage action={'edit'} />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
    },
    // {
    //   title: 'add Spouse',
    //   path: '/addspouse',
    //   element: <AddNewSpousePage action={'add'} />,
    //   private: true,
    //   requiredAccessRights: ['ADMIN_ACCESS'],
    // },
    // {
    //   title: 'edit Spouse',
    //   path: '/editspouse/:spouseId',
    //   element: <AddNewSpousePage action={'edit'} />,
    //   private: true,
    //   requiredAccessRights: ['ADMIN_ACCESS'],
    // },
  ],
};
export default workersPageRoutes;
