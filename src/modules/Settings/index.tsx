import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import LanguagesService from './extras/LanguagesService';
import DesignationService from './extras/DesignationService';
import { useState, useEffect } from 'react';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import ChildSupportService from './extras/ChildSupportService';


const SettingsDashboard = () => {
  const [LanguageCount, setLanguageCount] = useState<number | null>(null);
  const [DesignationCount, setDesignationCount] = useState<number | null>(null);
  const [ChildSupportCount, setChildSupportCount] = useState<number | null>(null);

  useEffect(() => {
    LanguagesService.getCount({ status: CommonLifeCycleStates.ACTIVE })
      .then((res) => setLanguageCount(res.data))
      .catch((error) => {
        console.log(error);
      });

    DesignationService.getCount()
      .then((res) => setDesignationCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    ChildSupportService.getCount({ status: CommonLifeCycleStates.ACTIVE })
      .then((res) => setChildSupportCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CommonPageLayout title="Settings">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3} width={350}>
          <DashboardCardButton primaryText="Manage Languages" secondaryText={LanguageCount?.toString()} color="#003049" targetRoute="/settings/Languages" />
        </Grid>
        <Grid item xs={12} md={6} xl={3} width={350}>
          <DashboardCardButton primaryText="Manage Designation" secondaryText={DesignationCount?.toString()} color="#de2828" targetRoute="/settings/Designation" />
        </Grid>
        <Grid item xs={12} md={6} xl={3} width={350}>
          <DashboardCardButton primaryText="Child support" secondaryText={ChildSupportCount?.toString()} color="#3cb043" targetRoute="/settings/ChildSupport" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default SettingsDashboard;
