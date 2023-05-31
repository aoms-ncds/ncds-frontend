import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card } from '@mui/material';
import FRForm from './components/FRForm';
import FRServices from './extras/FRServices';
import { useParams } from 'react-router-dom';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { CreatableFR } from './extras/FRTypes';

interface FRFormPagerops{
  action: 'add'|'edit'|'view';
}
const FRFormPage = (props: FRFormPagerops) => {
  const { frID } = useParams();
  const [requisition, setRequisition] = useState<CreatableFR>({});
  useEffect(() => {
    if ( props.action !== 'add' && !frID) {
      throw new Error('FR ID Missing in URL');
    }
    if (props.action === 'edit' || props.action === 'view') {
      FRServices.getById(frID as string)
      .then((res) => setRequisition(res.data))
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
    }
  }, []);
  const addFR = async (requisition: CreatableFR) => {
    try {
      const snackbarId = enqueueSnackbar({
        message: 'Creating FR Request',
        variant: 'info',
      });
      console.log(requisition);
      const res = await FRServices.createFRRequests(requisition);

      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
    } catch (err) {
      console.log(err);
      // Handle error conditions if needed
      // closeSnackbar(snackbarId);
      // enqueueSnackbar({
      //   message: err.message,
      //   variant: 'error',
      // });
    }
  };
  const editFR = async (requisition: CreatableFR) => {
    try {
      const snackbarId = enqueueSnackbar({
        message: 'Creating FR Request',
        variant: 'info',
      });
      console.log(requisition);
      if (frID) {
        const res = await FRServices.updateFRRequests( frID, requisition);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      }
    } catch (err) {
      console.log(err);
      // Handle error conditions if needed
      // closeSnackbar(snackbarId);
      // enqueueSnackbar({
      //   message: err.message,
      //   variant: 'error',
      // });
    }
  };
  const manageFR = async (requisition: CreatableFR) => {
    try {
      const operation=requisition.status;


      const snackbarId = enqueueSnackbar({
        message: operation === 'approve' ? 'Approving' :operation === 'reject'? 'Rejecting':'Sending To President'+'FR Request',
        variant: 'info',
      });
      console.log(requisition);

      if (operation && frID) {
        const res = await FRServices.manageFRRequests(frID, operation, requisition);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      }
    } catch (err) {
      console.log(err);
      // Handle error conditions if needed
      // closeSnackbar(snackbarId);
      // enqueueSnackbar({
      //   message: err.message,
      //   variant: 'error',
      // });
    }
  };
  // const { frID }=useParams();

  return (
    <CommonPageLayout title={props.action === 'add' ? 'Apply New FR': props.action === 'edit'?'Edit FR':'View Details'}>
      <Card style={{ width: '100%' }}>
        <FRForm
          value={requisition}
          onChange={(newReq) => setRequisition(newReq)}
          action={props.action}
          onSubmit={props.action === 'add' ? addFR :props.action === 'edit'? editFR:manageFR} // Pass the addFR function to the onSubmit prop
        />
      </Card>

    </CommonPageLayout>
  );
};

export default FRFormPage;
