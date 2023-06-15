import WorkersDashboard from '..';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ManageWorkerPage from '../ManageWorkersPage';
import WorkerFormPage from '../WorkerFormPage';
import ApproveWorkerPage from '../ApproveWorkersPage';

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

    // {
    //   title: 'edit child',
    //   path: '/child_edit/:childId',
    //   element: <AddNewChildPage action={'edit'} />,
    //   private: true,
    //   requiredAccessRights: ['ADMIN_ACCESS'],
    // },
    // {
    //   title: 'add Spouse',
    //   path: '/add_spouse',
    //   element: <AddNewSpousePage action={'add'} />,
    //   private: true,
    //   requiredAccessRights: ['ADMIN_ACCESS'],
    // },
    // {
    //   title: 'edit Spouse',
    //   path: '/edit_spouse/:spouseId',
    //   element: <AddNewSpousePage action={'edit'} />,
    //   private: true,
    //   requiredAccessRights: ['ADMIN_ACCESS'],
    // },
  ],
};
export default workersPageRoutes;
