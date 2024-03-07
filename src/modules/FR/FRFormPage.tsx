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
import FRLifeCycleStates from './extras/FRLifeCycleStates';
interface FRFormPageProps {
  action: 'add' | 'edit' | 'view';
}
const FRFormPage = (props: FRFormPageProps) => {
  const { frID } = useParams();
  const [FRLoaded, setFRLoaded] = useState(false);
  const [requisition, setRequisition] = useState<CreatableFR>({
    FRdate: moment(),
    kind: 'FRs',
    particulars: [],
    reasonForSentBack: '',
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
          };
          setRequisition(convertedData);
          setFRLoaded(true);
          console.log({ convertedData });
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
        message: 'Updating FR Request',
        variant: 'info',
      });

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
      //   message: err.message,zz
      //   variant: 'error',
      // });
    }
  };
  const manageFR = async (requisition: CreatableFR) => {
    try {
      const operation =
        requisition.status == FRLifeCycleStates.FR_APPROVED ? 'Approve' :
          requisition.status == FRLifeCycleStates.REJECTED ? 'reject' :
            requisition.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS ? 'sendToAccounts' :
              requisition.status == FRLifeCycleStates.WAITING_FOR_PRESIDENT ? 'sendToPresident' : 'sendBack'
        ;

      enqueueSnackbar({
        // eslint-disable-next-line max-len
        message:
          operation === 'Approve' ?
            'Verifyng' :
            operation === 'reject' ?
              'Disapproving' :
              operation === 'sendToAccounts' ?
                'Sending To Accounts' :
                operation === 'sendToPresident' ?
                  'Sending To President' :
                  'Send Back' + 'FR Request',
        variant: 'info',
      });


      if (operation && frID) {
        const res = await FRServices.manageFRRequests(frID, operation, requisition);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        if (operation == 'Approve') {
          enqueueSnackbar({
            message: 'IRO  CREATED',
            variant: 'success',
          });
        }
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
                <ViewFR value={requisition} options={{ FRLoaded }} onChange={(newReq) => setRequisition(newReq)} action={props.action} onSubmit={manageFR} />
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
