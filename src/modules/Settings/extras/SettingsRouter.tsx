import SettingsDashboard from '..';
import { Settings as SettingsIcon, Language as Lang } from '@mui/icons-material';
import Languages from '../Languages';
import Designation from '../Designation';
import ChildSupport from '../ChildSupport';
import ESignature from '../ESignature';
import Department from '../Department';
import Gender from '../Gender';
import Relogion from '../Religion';
import ReasonforDeactivation from '../ReasonforDeactivation';
import SanctionedAsPer from '../SanctionedAsPer';
import Particulars from '../Particulars';
import PaymentMethod from '../PaymentMethod';
import DesignationParticulars from '../DesignationParticular';
import LeaderDetails from '../LeaderDetails';
import TransactionLog from '../TransactionLog';
import ApplicationSettings from '../ApplicationSettings';
import ApplicationNames from '../ApplicationNames';
import AppliedFor from '../AppliedFor';
import CustomUsers from '../CustomUsers';

const settingsRoutes: ModuleRoute = {
  base: '/settings',
  pages: [
    {
      title: 'Settings ',
      path: '/',
      element: <SettingsDashboard />,
      private: true,
      requiredAccessRights: ['SETTINGS_SETTINGS_BASE_ACCESS'],
      showInDrawer: true,
      // icon: <SettingsIcon />,
      icon: <img src="/mod_icons/settings.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Languages',
      path: '/languages',
      element: <Languages />,
      private: true,
      requiredAccessRights: ['WRITE_STAFFS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Custom Users',
      path: '/customUsers',
      element: <CustomUsers />,
      private: true,
      requiredAccessRights: [],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Designation',
      path: '/Designation',
      element: <Designation />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'ChildSupport',
      path: '/ChildSupport',
      element: <ChildSupport />,
      private: true,
      requiredAccessRights: ['WRITE_STAFFS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Designation',
      path: '/Designation',
      element: <Designation />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'ApplicationSettings',
      path: '/applicationSettings',
      element: <ApplicationSettings/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'ChildSupport',
      path: '/ChildSupport',
      element: <ChildSupport />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'ESignature',
      path: '/Esignature',
      element: <ESignature />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Department',
      path: '/Department',
      element: <Department />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'ApplicationNames',
      path: '/applicationName',
      element: <ApplicationNames />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'AppliedFor',
      path: '/appliedFor',
      element: <AppliedFor />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Gender',
      path: '/Gender',
      element: <Gender />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Relogion',
      path: '/Relogion',
      element: <Relogion />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Deactivarion Resaon',
      path: '/ReasonforDeactivation',
      element: <ReasonforDeactivation />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Santioned As Per',
      path: '/SanctionedAsPer',
      element: <SanctionedAsPer />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Particulars',
      path: '/Particulars',
      element: <Particulars/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Payment Methods',
      path: '/PaymentMethods',
      element: <PaymentMethod/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Assign Particulars for Designation',
      path: '/designationParticulars',
      element: <DesignationParticulars/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'Leader Details',
      path: '/leaderDetails',
      element: <LeaderDetails/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },
    {
      title: 'FR/IRO Log',
      path: '/transactionLog',
      element: <TransactionLog/>,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: false,
      icon: <Lang />,
    },

  ],
};
export default settingsRoutes;
