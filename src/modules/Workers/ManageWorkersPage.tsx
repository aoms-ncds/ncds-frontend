import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import UsersList from '../User/components/UsersList';
import { Button, Card, Grid, Tab, Tabs } from '@mui/material';
import { Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material';
import { TabPanel, a11yProps } from './components/TabDetails';
import ChildListPage from './components/ChildList';
import SpouseListPage from './components/SpouseList';
import { Link } from 'react-router-dom';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import WorkersServices from './extras/WorkersServices';
import PermissionChecks from '../User/components/PermissionChecks';
import SpousesServices from './extras/SpousesServices';
import ChildrenServices from './extras/ChildrenServices';
import * as XLSX from 'xlsx';
import moment from 'moment';

const ManageWorkerPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [users, setUsers] = useState<IWorker[]>([]);
  const [spouseList, setSpouseList] = useState<Spouse[]>([]);
  const [childList, setChildList] = useState<Child[]>([]);


  useEffect(() => {
    if (currentTab == 0) {
      WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 1) {
      SpousesServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setSpouseList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 2) {
      ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setChildList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [currentTab]);
  return (
    <CommonPageLayout title="Manage Workers">
      <Grid container spacing={2}>
        <Grid item xs={12}>

        </Grid>
      </Grid>
      <Card>
        <Grid container spacing={0} justifyContent="space-between">
          <Grid item xs={12} lg={8}>
            <Tabs value={currentTab} onChange={switchTab} aria-label="basic tabs example">
              <Tab label="Workers" {...a11yProps(0)} />
              <Tab label="Spouses" {...a11yProps(1)} />
              <Tab label="Children" {...a11yProps(2)} />
              {/* <Tab label="Files" {...a11yProps(4)} /> */}
            </Tabs>
          </Grid>
          {/* <Grid item xs={12} lg={4}>

            <PermissionChecks
              permissions={['WRITE_WORKERS']}
              granted={currentTab === 0 && (
                <>
                  <Button
                    onClick={async () => {
                      const sheet =
                        users ?
                          users.map((user: IWorker) => ([
                            user.workerCode,
                            user.basicDetails.firstName,
                            user.basicDetails.lastName,
                            user.division?.details.name,
                            user?.officialDetails?.divisionHistory[user?.officialDetails?.divisionHistory?.length - 1]?.subDivision,
                            user.basicDetails.phone,
                            user.basicDetails.email,
                            user.basicDetails.alternativePhone,
                            user.basicDetails.dateOfBirth,
                            user.basicDetails.field,
                            user.basicDetails.martialStatus,
                            user.basicDetails.knownLanguages?.map((lang) => lang.name)?.join(', '),
                            user.basicDetails.highestQualification,
                            user.status && UserLifeCycleStates.getStatusNameByCode(user.status as number),
                            user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                            user.officialDetails.status == 'Left' && user.officialDetails.dateOfLeaving ?
                              moment(user.officialDetails.dateOfLeaving)?.from(user.officialDetails.dateOfJoining, true) :
                              (moment(user.officialDetails.dateOfJoining)?.fromNow(true)),
                            user.spouse?.spouseCode,
                            user.spouse && user.spouse?.firstName + ' ' + user.spouse?.lastName,
                            ((user.supportStructure?.basic ?? 0) +
                              (user.supportStructure?.HRA ?? 0) +
                              (user.supportStructure?.spouseAllowance ?? 0) +
                              (user.supportStructure?.positionalAllowance ?? 0) +
                              (user.supportStructure?.specialAllowance ?? 0) +
                              (user.supportStructure?.telAllowance ?? 0)),
                            user.insurance?.impactNo,
                          ])) :
                          [];
                      const headers = [
                        'Workers Code',
                        'First Name',
                        'Last Name',
                        'Division',
                        'Sub Division',
                        'Mobile No',
                        'Email ID',
                        'Alt Phone',
                        'DOB',
                        'Field',
                        'Marital Status',
                        'Known Languages',
                        'Highest Qualifications',
                        'Status',
                        'Date of Joining',
                        'No of year in Org',
                        'Spouse Code',
                        'Spouse Name',
                        'Net Support',
                        'Insurance No',
                      ];
                      const worksheet = XLSX.utils.json_to_sheet(sheet);
                      const workbook = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                      XLSX.writeFile(workbook, 'WorkerReport.xlsx', { compression: true });
                    }}
                    startIcon={<DownloadIcon />}
                    color="primary" sx={{ float: 'right', mt: 2, mr: 2 }}
                    variant="contained"
                  >Export</Button>
                  <Button
                    variant="contained"
                    sx={{ float: 'right', mt: 2, mr: 2 }}
                    startIcon={<AddIcon />}
                    component={Link}
                    to={'/workers/add'}
                  >
                    Add New
                  </Button>
                </>
              ) || null}
            />
          </Grid> */}
        </Grid>
        <TabPanel value={currentTab} index={0}>
          <UsersList<IWorker>
            value={users}
            onChange={(newUsers) => {
              setUsers(newUsers);
            }}
            action={'view'}
            options={{ kind: 'worker' }}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <SpouseListPage
            value={spouseList}
            action={'view'}
            onChange={(newUsers) => {
              setSpouseList(newUsers);
            }}
            options={{ status: 'active' }}
          />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <ChildListPage
            value={childList}
            onChange={(newUsers) => {
              setChildList(newUsers);
            }}
            action={'view'}
          />
        </TabPanel>
      </Card>
    </CommonPageLayout>
  );
};

export default ManageWorkerPage;
