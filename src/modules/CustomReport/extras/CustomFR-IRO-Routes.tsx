import { Home as HomeIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';
import HomePage from '../../Home';
import CustomReport from '../CustomReport';
import IROReportFilter from '../CustomReportIROFilterPage';
import CustomReportFRFilterPage from '../CustomReportFRFilterPage';
<<<<<<< HEAD
import ProfileReports from '../ProfileReports';
import UserFilterReportMUI from '../ProfileReports/WorkerDetailsReport';
// import ReportView from '../ProfileReports/WorkerDetailsReportView';
import SpouseFilterReportMUI from '../ProfileReports/SpouseDetailsReport';
import ChildFilterReportMUI from '../ProfileReports/ChildDetailsReport';
=======
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0

const customFrIroRoute: ModuleRoute = {
  base: '/custom-report',
  pages: [
    {
      title: 'Reports',
      path: '/',
      element: <CustomReport />,
      private: true,
      requiredAccessRights: ['CUSTOM_REPORT'],
      showInDrawer: true,
      // icon: <HomeIcon />,
      icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Custom Filter',
      path: '/custom-filter-iro',
      element: <IROReportFilter />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      // showInDrawer: true,
      // icon: <HomeIcon />,
      // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Custom Filter',
      path: '/custom-filter-fr',
      element: <CustomReportFRFilterPage />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      // showInDrawer: true,
      // icon: <HomeIcon />,
      // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
<<<<<<< HEAD
    {
      title: 'Profile Reporters',
      path: '/profile-reporters',
      element: <ProfileReports />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      // showInDrawer: true,
      // icon: <HomeIcon />,
      // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Profile Reporters',
      path: '/worker-details-report',
      element: <UserFilterReportMUI />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      // showInDrawer: true,
      // icon: <HomeIcon />,
      // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Profile Reporters',
      path: '/spouse-details-report',
      element: <SpouseFilterReportMUI />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      // showInDrawer: true,
      // icon: <HomeIcon />,
      // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    {
      title: 'Profile Reporters',
      path: '/child-details-report',
      element: <ChildFilterReportMUI />,
      private: true,
      requiredAccessRights: ['READ_ACCESS'],
      // showInDrawer: true,
      // icon: <HomeIcon />,
      // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    },
    // {
    //   title: 'ReportView',
    //   path: '/reportView',
    //   element: <ReportView />,
    //   private: true,
    //   requiredAccessRights: ['READ_ACCESS'],
    //   // showInDrawer: true,
    //   // icon: <HomeIcon />,
    //   // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    // },
=======
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
    // {
    //   title: 'Custom Report Table',
    //   path: '/custom-report-table',
    //   element: <CustomReportTable />,
    //   private: true,
    //   requiredAccessRights: ['READ_ACCESS'],
    //   // showInDrawer: true,
    //   // icon: <HomeIcon />,
    //   // icon: <img src="/mod_icons/Applications.png" alt="Logo" style={{ width: '30px', height: '30px' }} />,
    // },
  ],
};
export default customFrIroRoute;
