import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import LanguagesService from './extras/LanguagesService';
import DesignationService from './extras/DesignationService';
import { useState, useEffect } from 'react';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import ChildSupportService from './extras/ChildSupportService';
import ButtonCard from '../../components/ButtonCard';


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
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Manage Languages" count={LanguageCount?.toString()} color="#75C2F6" targetRoute="/settings/Languages" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Manage Designation" count={DesignationCount?.toString()} color="#75C2F6" targetRoute="/settings/Designation" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Child support" count={ChildSupportCount?.toString()} color="#75C2F6 " targetRoute="/settings/ChildSupport" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText="E-Signature" color="#75C2F6" targetRoute="/settings/Esignature" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText="Department" color="#75C2F6" targetRoute="/settings/Department" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default SettingsDashboard;
