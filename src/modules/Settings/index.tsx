import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import LanguagesService from './extras/LanguagesService';
import DesignationService from './extras/DesignationService';
import React, { useState, useEffect } from 'react';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import ChildSupportService from './extras/ChildSupportService';
import ButtonCard from '../../components/ButtonCard';
import PermissionChecks from '../User/components/PermissionChecks';


const SettingsDashboard = () => {
  const [LanguageCount, setLanguageCount] = useState<number | null>(null);
  const [DesignationCount, setDesignationCount] = useState<number | null>(null);
  const [ChildSupportCount, setChildSupportCount] = useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<any>();
  console.log(age);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitData = () => {
    console.log(age);
    ChildSupportService.edithildAgeLimit(age)
      .then((res) => {
        console.log(res.data);
        // setAge(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };
  useEffect(() => {
    ChildSupportService.getAge()
      .then((res) => {
        setAge(res.data?.age);
      });
  }, []);
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
        <PermissionChecks
          permissions={['SETTINGS_MANAGE_LANGUAGES_ACCESS']}
          granted={(
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <ButtonCard secondaryText="Manage Languages" count={LanguageCount?.toString()} color="#ff0000" targetRoute="/settings/Languages" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={[]}
          granted={(
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <ButtonCard secondaryText="Add Custom User" count={LanguageCount?.toString()} color="#fffb00" targetRoute="/settings/customUsers" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_DESIGNATION_ACCESS']}
          granted={(
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <ButtonCard secondaryText="Manage Designation" count={DesignationCount?.toString()} color="#00ff0d" targetRoute="/settings/Designation" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_CHILD_SUPPORT_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3} width={350}>
              <ButtonCard secondaryText="Child support" count={ChildSupportCount?.toString()} color="#00ffea " targetRoute="/settings/ChildSupport" />
            </Grid>
          )} />


        <PermissionChecks
          permissions={['SETTINGS_E_SIGN_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="E-Signature" color="#fff" targetRoute="/settings/Esignature" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_DEPARTMENT_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="Department" color="#fff" targetRoute="/settings/Department" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_CHILD_SUPPORT_AGE_EDIT_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="Child Support Age Edit" color="#fff" onClick={handleClickOpen} />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_ADD_GENDER_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText=" Add Gender" color="#fff" targetRoute="/settings/Gender" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_ADD_RELIGION_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText=" Add Religion" color="#fff" targetRoute="/settings/Relogion" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_REASON_FOR_DEACTIVATION_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText=" Reason for Deactivation" color="#fff" targetRoute="/settings/ReasonforDeactivation" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_ADD_SANCTION_ASS_PER_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText=" Add Sanctioned as  per" color="#fff" targetRoute="/settings/SanctionedAsPer" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_PARTICULARS_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText=" Add Particulars" color="#fff" targetRoute="/settings/Particulars" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_ADD_PAYMENT_METHOD_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="Add Payment methods" color="#fff" targetRoute="/settings/PaymentMethods" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_DESIGNATION_CATEGORY_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="Designation Category" color="#fff" targetRoute="/settings/designationParticulars" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_LEADER_DETAILS_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="Leader Details" color="#fff" targetRoute="/settings/leaderDetails" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['SETTINGS_FR_IRO_LOG_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="FR/IRO Log" color="#fff" targetRoute="/settings/transactionLog" />
            </Grid>
          )} />

        <PermissionChecks
          permissions={['SETTINGS_APPLICATION_ACCESS']}
          granted={(

            <Grid item xs={12} md={4} xl={3} width={350}>
              <DashboardCardButton primaryText="Application Settings" color="#fff" targetRoute="/settings/applicationSettings" />
            </Grid>
          )} />
      </Grid>


      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit Age</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="Age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={age}
            onChange={(e: any) => {
              setAge(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitData}>Edit</Button>
        </DialogActions>
      </Dialog>
    </CommonPageLayout>
  );
};

export default SettingsDashboard;
