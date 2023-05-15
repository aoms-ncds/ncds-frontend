import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import WorkersListPage from './components/WorkersList';
import { Box, Button, Card, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabPanel, a11yProps } from './components/TabDetails';
import ChildListPage from './components/ChildList';
import SpouseListPage from './components/SpouseList';
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
          <Grid item>
            <Tabs value={currentTab} onChange={switchTab} aria-label="basic tabs example">
              <Tab label="Workers" {...a11yProps(0)} />
              <Tab label="Spouces" {...a11yProps(1)} />
              <Tab label="Child" {...a11yProps(1)} />
              {/* <Tab label="Files" {...a11yProps(4)} /> */}
            </Tabs>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <TabPanel value={currentTab} index={0}>
          <WorkersListPage />
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
