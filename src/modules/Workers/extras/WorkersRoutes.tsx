import WorkersDashboard from '..';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ManageWorkerPage from '../ManageWorkersPage';
import WorkerFormPage from '../WorkerFormPage';
import ApproveWorkerPage from '../ApproveWorkersPage';
import SendBackWorkersPage from '../SendBackWorkersPage';
import DeactivatedWorkersPage from '../DeactivatedWorkersPage';

const workersPageRoutes: ModuleRoute = {
  base: '/workers',
  pages: [
    {
      title: 'Workers',
      path: '/',
      element: <WorkersDashboard />,
      private: true,
      requiredAccessRights: ['READ_WORKERS'],
      showInDrawer: true,
      // icon: <Diversity2Icon />,
      icon: <img src="/workers.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Manage Workers',
      path: '/manage',
      element: <ManageWorkerPage />,
      private: true,
      requiredAccessRights: ['READ_WORKERS'],
    },
    {
      title: 'Add New Worker',
      path: '/add',
      element: <WorkerFormPage action="add" />,
      private: true,
      requiredAccessRights: ['WRITE_WORKERS'],
    },
    {
      title: 'Approve Workers',
      path: '/approve',
      element: <ApproveWorkerPage />,
      private: true,
      requiredAccessRights: ['MANAGE_WORKER'],
    },
    {
      title: 'Edit Worker',
      path: '/edit/:id',
      element: <WorkerFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['WRITE_WORKERS'],
    },
    {
      title: 'In Process Workers',
      path: '/reject',
      element: <SendBackWorkersPage />,
      private: true,
      requiredAccessRights: ['WRITE_WORKERS'],
    },
    {
      title: 'Deactivated Workers',
      path: '/deactivated',
      element: <DeactivatedWorkersPage />,
      private: true,
      requiredAccessRights: ['READ_WORKERS'],
    },
    // {
    //   title: 'edit child',
    //   path: '/child_edit/:childId',
    //   element: <AddNewChildPage action={'edit'} />,
    //   private: true,
    //   requiredAccessRights: ['READ_WORKERS'],
    // },
    // {
    //   title: 'add Spouse',
    //   path: '/add_spouse',
    //   element: <AddNewSpousePage action={'add'} />,
    //   private: true,
    //   requiredAccessRights: ['READ_WORKERS'],
    // },
    // {
    //   title: 'edit Spouse',
    //   path: '/edit_spouse/:spouseId',
    //   element: <AddNewSpousePage action={'edit'} />,
    //   private: true,
    //   requiredAccessRights: ['READ_WORKERS'],
    // },
  ],
};
export default workersPageRoutes;
