import HRDashboard from '..';
import { Diversity3 as Diversity3Icon } from '@mui/icons-material';
import HRManagePage from '../ManagePage';
import StaffFormPage from '../StaffFormPage';

const hrPageRoutes: ModuleRoute = {
  base: '/hr',
  pages: [
    {
      title: 'HR',
      path: '',
      element: <HRDashboard />,
      private: true,
      requiredAccessRights: ['READ_STAFFS'],
      showInDrawer: true,
      icon: <img src="/mod_icons/HR.png" alt="Logo" style={{ width: '35px', height: '36px' }} />,
    },
    {
      title: 'Manage staff',
      path: '/manage',
      element: <HRManagePage />,
      private: true,
      requiredAccessRights: ['READ_STAFFS'],
    },
    {
      title: 'Add New Staff',
      path: '/add',
      element: <StaffFormPage action="add" />,
      private: true,
      requiredAccessRights: ['WRITE_STAFFS'],
    },
    {
      title: 'Edit Staff',
      path: '/edit/:id',
      element: <StaffFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['WRITE_STAFFS'],
    },
  ],
};
export default hrPageRoutes;
