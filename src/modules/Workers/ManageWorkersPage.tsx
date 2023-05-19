import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import UsersList from './components/WorkersList';
import { Button, Card, Grid, Tab, Tabs } from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { TabPanel, a11yProps } from './components/TabDetails';
import ChildListPage from './components/ChildList';
import SpouseListPage from './components/SpouseList';
import { Link } from 'react-router-dom';
const ManageWorkerPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  return (
    <CommonPageLayout title='Manage Workers'>
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
              <Tab label="Spouces" {...a11yProps(1)} />
              <Tab label="Child" {...a11yProps(1)} />
              {/* <Tab label="Files" {...a11yProps(4)} /> */}
            </Tabs>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Button
              variant='contained'
              sx={{ float: 'right', mt: 2, mr: 2 }}
              startIcon={<AddIcon />}
              component={Link}
              to='/workers/add'
            >
        Add new
            </Button>
          </Grid>
        </Grid>
        <TabPanel value={currentTab} index={0}>
          <UsersList />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <SpouseListPage />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          < ChildListPage />
        </TabPanel>

      </Card>

    </CommonPageLayout>
  );
};

export default ManageWorkerPage;
