import WorkersDashboard from '..';
import ManageWorkerPage from '../ManageWorkersPage';
import WorkerFormPage from '../WorkerFormPage';
import ApproveWorkerPage from '../ApproveWorkersPage';
import SendBackWorkersPage from '../SendBackWorkersPage';
import DeactivatedWorkersPage from '../DeactivatedWorkersPage';
import DisapproveWorkersPage from '../DIapproveWorkersPage';

const workersPageRoutes: ModuleRoute = {
  base: '/workers',
  pages: [
    {
      title: 'Associates',
      path: '/',
      element: <WorkersDashboard />,
      private: true,
      requiredAccessRights: ['READ_WORKERS'],
      showInDrawer: true,
      // icon: <Diversity2Icon />,
      icon: <img src="/mod_icons/workers.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Manage Associates',
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
      title: 'Approve Associates',
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
      title: 'Edit Worker',
      path: '/edit/:id/:tabNO',
      element: <WorkerFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['WRITE_WORKERS'],
    },
    // {
    //   title: 'Edit child',
    //   path: '/:userKind/:userId',
    //   element: <WorkerFormPage action="edit" />,
    //   private: true,
    //   requiredAccessRights: ['READ_ACCESS'],
    // },
    {
      title: 'In Process Associates',
      path: '/reject',
      element: <SendBackWorkersPage />,
      private: true,
      requiredAccessRights: ['WRITE_WORKERS'],
    },
    {
      title: 'Deactivated Associates',
      path: '/deactivated',
      element: <DeactivatedWorkersPage />,
      private: true,
      requiredAccessRights: ['READ_WORKERS'],
    },
    {
      title: 'Disapprove Associates',
      path: '/disapprove',
      element: <DisapproveWorkersPage />,
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
