/* eslint-disable indent */
import React, { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import UsersList from '../User/components/UsersList';
import { Box, Button, Card, CircularProgress, Fade, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
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
import WorkerList from './components/WorkerList';
import SearchComponent from './components/SearchComponent';
import ReasonforDeactivationService from '../Settings/extras/ReasonforDeactivationService';

const ManageWorkerPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [loadingg, setLoadingg] = useState(false);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [users, setUsers] = useState<IWorker[]>([]);
  const [allusers, setUsersAll] = useState<IWorker[]>([]);
  const [spouseList, setSpouseList] = useState<Spouse[]>([]);
  const [childList, setChildList] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [reason, setReason] = useState<IReason[]>([]);

  useEffect(() => {
    ReasonforDeactivationService.getAll().then((res) => {
      setReason(res.data);
    });
  }, []);
  useEffect(() => {
    console.log(skip);
    fetchData({});
  }, [currentTab]);

  const fetchData = (args: { skip?: number }) => {
    setLoading(true);
    if (currentTab === 0 && searchText === '') {
      WorkersServices.getWorkers({ status: UserLifeCycleStates.ACTIVE, skip: args.skip ?? skip, limit: 300 })
        .then((res) => {
          console.log(res.data, 'OLD USER');

          setUsers((prevUsers) => [...prevUsers, ...res.data]);
        })
        .catch((error) => {
          console.error('Error fetching workers:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (currentTab == 1) {
      SpousesServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setSpouseList(res.data);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (currentTab == 2) {
      ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setChildList(res.data);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleSearchChange = (text: string) => {
    if (text === '') {
      WorkersServices.getWorkers({ status: UserLifeCycleStates.ACTIVE, skip: skip, limit: 300 })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.error('Error fetching workers:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      WorkersServices.getWorkerBySearch({ status: UserLifeCycleStates.ACTIVE, search: text })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.error('Error fetching workers:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom && !loading) {
      setSkip((prevSkip) => prevSkip + 300); // Increment skip when reaching bottom
      fetchData({ skip: skip + 300 }); // Fetch data with updated skip
    }
  };
  return (
    <CommonPageLayout title="Manage Associates">
      <Grid container spacing={0}>
        <Grid item xs={12} sx={{ alignItems: 'center' }}>
          {/* {loading && (
            <Box style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )} */}
        </Grid>
      </Grid>
      <Card sx={{ maxWidth: '78vw', alignItems: 'center' }}>
        <Grid container spacing={0} justifyContent="space-between">
          <Grid item xs={12} lg={8}>
            <Tabs value={currentTab} onChange={switchTab} aria-label="basic tabs example">
              <Tab label="Associates" {...a11yProps(0)} />
              <Tab label="Spouses" {...a11yProps(1)} />
              <Tab label="Children" {...a11yProps(2)} />
              {/* <Tab label="Files" {...a11yProps(4)} /> */}
            </Tabs>
          </Grid>
        </Grid>
        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={5} justifyContent="space-between">
            {/* <Grid sx={{ width: '30px', paddingLeft: '85%', paddingTop: '2px' }}> */}
            {/* </Grid> */}
            <Grid item xs={12} padding={2}>
              <SearchComponent onSearch={(searchKey) => {
                handleSearchChange(searchKey); setSearchText(searchKey);
              }} />
             <Grid item xs={12} padding={2}>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
    }}
  >
    {/* Left Side - Result Count */}
    <Card sx={{ px: 2, py: 1, borderRadius: 3, boxShadow: 2 }}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Associates Count
        </Typography>

        <Typography variant="h6" fontWeight={700}>
          {users.length}
        </Typography>
      </Box>
    </Card>

    {/* Right Side - Buttons */}
    <Box sx={{ display: 'flex', gap: 1 }}>
      <PermissionChecks
        permissions={['WRITE_WORKERS']}
        granted={
          (currentTab === 0 && (
            <>
              <Button
                onClick={async () => {
                  setLoadingg(true);
                  try {
                    const res = await WorkersServices.getAll({
                      status: UserLifeCycleStates.ACTIVE,
                    });
                    setUsersAll(res.data);

                    const sheet = res.data.map((user: IWorker) => [
                      user.workerCode,
                      user.basicDetails.firstName,
                      user.basicDetails.lastName,
                      user.division?.details.name,
                      user?.officialDetails?.divisionHistory?.[
                        user?.officialDetails?.divisionHistory?.length - 1
                      ]?.subDivision,
                      user.basicDetails.phone,
                      user.basicDetails.email,
                      user.basicDetails.alternativePhone,
                      user.basicDetails.dateOfBirth,
                      user.basicDetails.field,
                      user.basicDetails.martialStatus,
                      user.basicDetails.knownLanguages
                        ?.map((lang) => lang.name)
                        ?.join(', '),
                      user.basicDetails.highestQualification,
                      user.status &&
                        UserLifeCycleStates.getStatusNameByCode(
                          user.status as number,
                        ),
                      user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                      user.officialDetails.status == 'Left' &&
                      user.officialDetails.dateOfLeaving ?
                        moment(user.officialDetails.dateOfLeaving)?.from(
                            user.officialDetails.dateOfJoining,
                            true,
                          ) :
                        moment(user.officialDetails.dateOfJoining)?.fromNow(
                            true,
                          ),
                      user.spouse?.spouseCode,
                      user.spouse &&
                        user.spouse?.firstName +
                          ' ' +
                          user.spouse?.lastName,
                      (user.supportStructure?.basic ?? 0) +
                        (user.supportStructure?.HRA ?? 0) +
                        (user.supportStructure?.spouseAllowance ?? 0) +
                        (user.supportStructure?.positionalAllowance ?? 0) +
                        (user.supportStructure?.specialAllowance ?? 0) +
                        (user.supportStructure?.PIONMissionaryFund ?? 0) +
                        (user.supportStructure?.telAllowance ?? 0),
                      user.insurance?.impactNo,
                    ]);

                    const headers = [
                      'Associates Code',
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
                    XLSX.utils.sheet_add_aoa(worksheet, [headers], {
                      origin: 'A1',
                    });
                    XLSX.writeFile(workbook, 'WorkerReport.xlsx', {
                      compression: true,
                    });
                  } catch (error) {
                    console.error('Error fetching workers:', error);
                  } finally {
                    setLoadingg(false);
                  }
                }}
                startIcon={
                  loadingg ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <DownloadIcon />
                  )
                }
                variant="contained"
                disabled={loadingg}
              >
                {loadingg ? 'Fetching data...' : 'Export'}
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component={Link}
                to={'/workers/add'}
              >
                Add New
              </Button>
            </>
          )) || null
        }
      />
    </Box>
  </Box>
</Grid>
            </Grid>
            <Grid item xs={12}>
              <WorkerList users={users} reason={reason} onScroll={handleScroll} deleteUser={handleDelete}></WorkerList>
            </Grid>
          </Grid>
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
