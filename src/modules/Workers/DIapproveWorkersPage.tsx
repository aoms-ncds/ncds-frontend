import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import UsersList from '../User/components/UsersList';
import { Button, Card, Grid, Tab, Tabs } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
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

const DisapproveWorkersPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [users, setUsers] = useState<IWorker[]>([]);
  const [spouseList, setSpouseList] = useState<Spouse[]>([]);
  const [childList, setChildList] = useState<Child[]>([]);


  useEffect(() => {
    if (currentTab == 0) {
      WorkersServices.getAll({ status: UserLifeCycleStates.DISAPPROVE })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 1) {
      SpousesServices.getAll({ status: UserLifeCycleStates.DISAPPROVE })
        .then((res) => {
          setSpouseList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 2) {
      ChildrenServices.getAll({ status: UserLifeCycleStates.DISAPPROVE })
        .then((res) => {
          setChildList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [currentTab]);
  return (
    <CommonPageLayout title="Disapprove Associates">
      <Grid container spacing={2}>
        <Grid item xs={12}>
        </Grid>
      </Grid>
      <Card>
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
          <UsersList<IWorker>
            value={users}

            onChange={(newUsers) => {
              setUsers(newUsers);
            }}
            action={'view'}
            options={{ kind: 'worker', showEditButton: false }}
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

export default DisapproveWorkersPage;
