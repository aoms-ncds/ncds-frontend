import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import LanguagesService from './extras/LanguagesService';
import { useState, useEffect } from 'react';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';


const SettingsDashboard = () => {
  const [LanguageCount, setLanguageCount] = useState<number | null>(null);

  useEffect(() => {
    LanguagesService.getCount({ status: CommonLifeCycleStates.ACTIVE })
      .then((res) => setLanguageCount(res.data))
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
      </Grid>
    </CommonPageLayout>
  );
};

export default SettingsDashboard;
