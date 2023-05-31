import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import StaffServices from './extras/StaffServices';

const HRDashboard = () => {
  const [staffCount, setStaffCount] = useState<number | null>(null);

  useEffect(() => {
    StaffServices.getCount().then((res) => setStaffCount(res.data));
  }, []);

  return (
    <CommonPageLayout title="HR Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage Staff" secondaryText={staffCount ? staffCount?.toString() : undefined} color="#29cc39" targetRoute="/hr/manage" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage Workers" secondaryText="556" color="#0dcaf0" targetRoute="/workers" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Approve New Worker" secondaryText="27" color="#8833ff" targetRoute="/workers/approve" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRDashboard;
