import { Home as HomeIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';
import HomePage from '../../Home';
import CustomReport from '../CustomReport';
import IROReportFilter from '../CustomReportIROFilterPage';
import CustomReportFRFilterPage from '../CustomReportFRFilterPage';

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
