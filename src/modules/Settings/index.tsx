import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import LanguagesService from './extras/LanguagesService';
import DesignationService from './extras/DesignationService';
import React, { useState, useEffect } from 'react';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import ChildSupportService from './extras/ChildSupportService';
import ButtonCard from '../../components/ButtonCard';


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
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Manage Languages" count={LanguageCount?.toString()} color="#fff" targetRoute="/settings/Languages" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Manage Designation" count={DesignationCount?.toString()} color="#fff" targetRoute="/settings/Designation" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Child support" count={ChildSupportCount?.toString()} color="#fff " targetRoute="/settings/ChildSupport" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText="E-Signature" color="#fff" targetRoute="/settings/Esignature" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText="Department" color="#fff" targetRoute="/settings/Department" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText="Child Support Age Edit" color="#fff" onClick={handleClickOpen} />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText=" Add Gender" color="#fff" targetRoute="/settings/Gender" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText=" Add Religion" color="#fff" targetRoute="/settings/Relogion" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText=" Reason for Deactivation" color="#fff" targetRoute="/settings/ReasonforDeactivation" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText=" Add Sanctioned as  per" color="#fff" targetRoute="/settings/SanctionedAsPer" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <DashboardCardButton primaryText=" Add Particulars" color="#fff" targetRoute="/settings/Particulars" />
        </Grid>
      </Grid>


      <Dialog
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     console.log(age);

      //     handleClose();
      //   },
      // }}
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
