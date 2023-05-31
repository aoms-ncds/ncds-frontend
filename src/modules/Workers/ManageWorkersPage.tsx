import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import UsersList from '../User/components/UsersList';
import { Button, Card, Grid, Tab, Tabs } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TabPanel, a11yProps } from './components/TabDetails';
import ChildListPage from './components/ChildList';
import SpouseListPage from './components/SpouseList';
import { Link } from 'react-router-dom';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import WorkersServices from './extras/WorkersServices';

const ManageWorkerPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [users, setUsers] = useState<IWorker[]>([]);

  useEffect(() => {
    if (currentTab == 0) {
      WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 3) {
      WorkersServices.getAll({ status: UserLifeCycleStates.INACTIVE })
        .then((res) => {
          console.log(res);
          setUsers(res.data);
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
          <br />
          <br />
        </Grid>
      </Grid>
      <Card>
        <Grid container spacing={0} justifyContent="space-between">
          <Grid item xs={12} lg={9}>
            <Tabs value={currentTab} onChange={switchTab} aria-label="basic tabs example">
              <Tab label="Workers" {...a11yProps(0)} />
              <Tab label="Spouses" {...a11yProps(1)} />
              <Tab label="Children" {...a11yProps(2)} />
              <Tab label="Deactivated" {...a11yProps(3)} />

              {/* <Tab label="Files" {...a11yProps(4)} /> */}
            </Tabs>
          </Grid>
          <Grid item xs={12} lg={3}>
            {[0, 1, 2].includes(currentTab) && (
              <Button
                variant="contained"
                sx={{ float: 'right', mt: 2, mr: 2 }}
                startIcon={<AddIcon />}
                component={Link}
                to={currentTab === 0 ? '/workers/add' : currentTab === 1 ? '/workers/addspouse' : '/workers/addchild'}
              >
                {currentTab === 0 ? 'Add new' : currentTab === 1 ? 'Add Spouse' : 'Add Child'}
              </Button>
            )}
          </Grid>
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
          <SpouseListPage />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <ChildListPage />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <UsersList<IWorker>
            value={users}
            onChange={(newUsers) => {
              setUsers(newUsers);
            }}
            action={'view'}
          />
        </TabPanel>
      </Card>
    </CommonPageLayout>
  );
};

export default ManageWorkerPage;
