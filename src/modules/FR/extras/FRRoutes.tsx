import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import FRDashboard from '..';
import FRFormPage from '../FRFormPage';
import ClosedFR from '../ClosedFR';
import ManageFRPage from '../ManageFrPage';
import PresidentApproval from '../PresidentApproval';
import SentBack from '../SendBack';
         

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
      title: 'FR Verify',
      path: '/Approve',
      element: <PresidentApproval />,
      private: true,
      requiredAccessRights: ['PRESIDENT_ACCESS'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Apply New FR',
      path: '/apply',
      element: <FRFormPage action="add" />,
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
      title: 'View FR',
      path: '/:frID/view',
      element: <FRFormPage action="view" />,
      private: true,
      requiredAccessRights: ['READ_FR'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'edit FR',
      path: '/:frID/edit',
      element: <FRFormPage action="edit" />,
      private: true,
      requiredAccessRights: ['WRITE_FR'],
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
  ],
};
export default divisionsPageRoutes;
