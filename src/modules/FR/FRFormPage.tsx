import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, Grid, Alert } from '@mui/material';
import FRForm from './components/FRForm';
import ViewFR from './components/ViewFR';
import FRServices from './extras/FRServices';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';
import PermissionChecks from '../User/components/PermissionChecks';
interface FRFormPageProps {
  action: 'add' | 'edit' | 'view';
}
const FRFormPage = (props: FRFormPageProps) => {
  const { frID } = useParams();
  const [requisition, setRequisition] = useState<CreatableFR>({
    FRdate: moment(),
    kind: 'FRs',
    particulars: [],
    lastUpdateDate: moment(),
  });
  useEffect(() => {
    if (props.action !== 'add' && !frID) {
      throw new Error('FR ID Missing in URL');
    }
    if (props.action === 'edit' || props.action === 'view') {
      FRServices.getById(frID as string)
  .then((res) => {
    const convertedData: CreatableFR = {
      ...res.data,
      requestAmount: ['requestedAmount'],
      status: res.data.status.toString(),
    };
    setRequisition(convertedData);
  })
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
      // const snackbarId =
      enqueueSnackbar({
        message: 'Creating FR Request',
        variant: 'info',
      });
      console.log('fr request iss ', requisition);
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
      enqueueSnackbar({
        message: 'Updtaing FR Request',
        variant: 'info',
      });
      console.log(requisition);
      if (frID) {
        const res = await FRServices.updateFRRequests(frID, requisition);
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
      const operation = requisition.status;

      enqueueSnackbar({
        // eslint-disable-next-line max-len
        message:
          operation === 'Approved' ?
            'Approving' :
            operation === 'Rejected' ?
              'Rejecting' :
              operation === 'SendToAccounts' ?
                'Sending To Accounts' :
                operation === 'SendToPresident' ?
                  'Sending To President' :
                  'Send Back' + 'FR Request',
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
    <CommonPageLayout title={props.action === 'add' ? 'Apply New FR' : props.action === 'edit' ? 'Edit FR' : 'View And Manage FR'}>
      <PermissionChecks
        permissions={['READ_FR']}
        granted={
          <>
            <Card style={{ width: '100%' }}>
              {props.action === 'add' ? (
                <FRForm
                  value={requisition}
                  onChange={(newReq) => setRequisition(newReq)}
                  action={props.action}
                  onSubmit={addFR} // Pass the addFR function to the onSubmit prop
                />
              ) : props.action === 'edit' ? (
                <FRForm
                  value={requisition}
                  onChange={(newReq) => setRequisition(newReq)}
                  action={props.action}
                  onSubmit={editFR} // Pass the addFR function to the onSubmit prop
                />
              ) : (
                <ViewFR value={requisition} onChange={(newReq) => setRequisition(newReq)} action={props.action} onSubmit={manageFR} />
              )}
            </Card>
          </>
        }
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity="error">
              Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />
    </CommonPageLayout>
  );
};

export default FRFormPage;
