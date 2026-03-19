import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, Grid, Alert } from '@mui/material';
import FRForm from './components/FRForm';
import FRFormAdmin from './components/FRFormAdmin';
import ViewFR from './components/ViewFR';
import FRServices from './extras/FRServices';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';
import PermissionChecks from '../User/components/PermissionChecks';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import IROServices from '../IRO/extras/IROServices';
import FRFormEdit from './components/FRFormEdit';
interface FRFormPageProps {
  action: 'add' | 'edit' | 'view'| 'custom'| 'customIRO' | 'reopen'| 'customEdit'| 'editAdmin';
  actionAd?: 'view';
}
const FRFormPage = (props: FRFormPageProps) => {
  const navigate = useNavigate();
  const { frID } = useParams();
  const [FRLoaded, setFRLoaded] = useState(false);
  const [requisition, setRequisition] = useState<CreatableFR>({
    FRdate: moment(),
    kind: 'FRs',
    particulars: [],
    reasonForSentBack: '',
    reasonForReject: '',
    sanctionedAsPer: '',
    status: 0,
  });
  console.log(requisition, 'props.action');

  useEffect(() => {
    if (props.action !== 'add' && !frID) {
      if (props.action !== 'custom' && !frID) {
        if (props.action !== 'customIRO' && !frID) {
          throw new Error('FR ID Missing in URL');
        }
      }
    }
    if (props.action === 'edit' || props.action === 'view'|| props.action === 'custom'||props.action === 'reopen'||props.action === 'customEdit'|| props.action =='editAdmin' ) {
      if (props.action as any === 'custom' ||props.action === 'customEdit' ) {
        console.log('A1');
        // if (frID) {
        frID && FRServices.getByIdCustom(frID as string)
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
      } else {
        console.log('A2');
        // if (frID) {
        FRServices.getById(frID as string)
.then((res) => {
  const convertedData: CreatableFR = {
    ...res.data,
    requestAmount: ['requestedAmount'],
  };
  setRequisition(convertedData);
  setFRLoaded(true);
  console.log({ res });
})
.catch((error) => {
  enqueueSnackbar({
    variant: 'error',
    message: error.message,
  });
});
        // }
        // }
      }
    }
  }, []);
  const addFR = async (requisition: CreatableFR) => {
    try {
      // const snackbarId =
      let res;
      // navigate('/fr/');
      if (props.action === 'custom') {
        if (res) {
          navigate('/fr/');
        }
      } else if (props.action === 'add') {
        navigate('/fr/');
      } else if (props.action === 'customIRO') {
        if (res) {
          navigate('/iro/');
        }
      }
      enqueueSnackbar({
        message: 'Creating Request',
        variant: 'info',
      });
      if (props.action === 'custom') {
        res = await FRServices.createFRRequestsCustom(requisition);
        if (res) {
          navigate('/fr/');
        }
      } else if (props.action === 'add') {
        res = await FRServices.createFRRequests(requisition);
      } else if (props.action === 'customIRO') {
        res = await IROServices.createFRRequestsIRO(requisition);
                  navigate('/iro/');

        if (res) {
          navigate('/iro/');
        }
      }

      enqueueSnackbar({
        message: res?.message,
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
      console.log(requisition.status, 'requisition.status');

      if (frID) {
        if (props.action === 'customEdit') {
          const res = await FRServices.updateFRRequestsCustom(frID, requisition);
          if (res) {

            // FRServices.addParticularscustomFR(addNewParticulars, frID).then((res)=>{
            //   console.log(res.data);
            // });
          }
          navigate('/fr/CustomFR');
          enqueueSnackbar({
            message: res.message,
            variant: 'success',
          });
        } else {
          console.log(requisition, '0990');

          const res = await FRServices.updateFRRequests(frID, requisition);
          navigate('/fr/manage');
          enqueueSnackbar({
            message: res.message,
            variant: 'success',
          });
          window.location.reload();
          return; // 🔥 THIS IS REQUIRED
        }
      }
      if (requisition.status ==FRLifeCycleStates.REOPENED) {
        navigate('/fr/reopened');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (props.action === 'customEdit') {
        navigate('/fr/CustomFR');
        window.location.reload();
      } else if (requisition.status ==FRLifeCycleStates.FR_SEND_BACK) {
        navigate('/fr/sentBack');
        window.location.reload();
      } else {
        navigate('/fr');
        window.location.reload();
      }

      enqueueSnackbar({
        message: 'Updating FR Request',
        variant: 'info',
      });
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
            'Verifying' :
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
    <CommonPageLayout
      title={
        props.action === 'add' ?
          'Create New FR' :
          props.action === 'edit' ?
            'Edit FR' :
            props.action === 'customIRO' ?
              'Custom IRO' :
              'View And Manage FR'
      }
    >      <PermissionChecks
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
                // <ViewFR value={requisition} options={{ FRLoaded }} onChange={(newReq) => setRequisition(newReq)} action={props.action} onSubmit={editFR} />

              ): props.action === 'reopen' ? (
                <FRFormEdit
                  value={requisition}
                  onChange={(newReq) => setRequisition(newReq)}
                  action={props.action}
                  onSubmit={editFR} // Pass the addFR function to the onSubmit prop
                />
                // <ViewFR value={requisition} options={{ FRLoaded }} onChange={(newReq) => setRequisition(newReq)} action={props.action} onSubmit={editFR} />

              ) : props.action === 'custom' || props.action === 'customIRO' ? (
                <FRForm
                  value={requisition}
                  onChange={(newReq) => setRequisition(newReq)}
                  action={props.action}
                  actionAdi={props.actionAd}
                  onSubmit={addFR} // Pass the addFR function to the onSubmit prop
                />
              ) : props.action === 'customEdit' ? (
                <FRForm
                  value={requisition}
                  onChange={(newReq) => setRequisition(newReq)}
                  action={props.action}
                  onSubmit={editFR} // Pass the addFR function to the onSubmit prop
                />
              ) : props.action === 'editAdmin' ? (
                <FRFormAdmin
                  value={requisition}
                  onChange={(newReq) => setRequisition(newReq)}
                  action={props.action}
                  onSubmit={editFR} // Pass the addFR function to the onSubmit prop
                />
              ) :
                (
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
