/* eslint-disable @typescript-eslint/naming-convention */
import { Autocomplete, Button, Card, CardContent, Container, Grid, TextField, TextFieldProps, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { DatePicker } from '@mui/x-date-pickers';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import moment from 'moment';
import IROServices from './extras/IROServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { hasPermissions } from '../User/components/PermissionChecks';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
// import FileUploader from '../../components/FileUploader/FileUploader';
// import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
// import { MB } from '../../extras/CommonConfig';

interface ReleasePageProps {
  action: 'add' | 'view';
}

const ReleaseAmount = (props:ReleasePageProps) => {
  const navigate = useNavigate();
  const { iroID } = useParams();
  const [iroStatus, setIroStatus] = useState(false);
  const [releaseAmount, setReleaseAmount] = useState<IReleaseAmount>({
    _id: '',
    modeOfPayment: '',
    releaseAmount: 0,
    transactionNumber: '',
    transferredAmount: 0,
    transferredDate: null,
    transferredBank: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
    },
    attachment: [],
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [showFileUploader, setShowFileUploader] = useState(false);

  const saveReleaseAmount = (e: { preventDefault: () => void }) => {
    // console.log(IRO, 'IRO');
    e.preventDefault();
    const approvalSnack = enqueueSnackbar({ message: 'Releasing Amount ', variant: 'info' });

    if (iroID && releaseAmount) {
      IROServices.releaseAmount(iroID, releaseAmount).then((res) => {
        console.log(res.data);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        navigate('/iro/');
      });
      setTimeout(() => {
        closeSnackbar(approvalSnack);
      }, 500);
    }
  };
  useEffect(() => {
    IROServices.getById(iroID??'').then(
      (res)=>{
        if (res.data.releaseAmount) {
          setReleaseAmount(res.data.releaseAmount);
        } else {
          setReleaseAmount(()=> ({
            ...releaseAmount,
            releaseAmount: res.data.particulars?.reduce(
              (total, particular) => total + Number(particular.requestedAmount),
              0,
            ),
          }));
        }
        setIroStatus(res.data.status==IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE);
      },
      // if (res.data.releaseAmount) {
      //   setReleaseAmount(res.data.releaseAmount);
      // }
    );
  }, []);
  return (
    <CommonPageLayout title="Release Amount Page">
      <Container>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <form onSubmit={saveReleaseAmount}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Release Amount"
                    type='number'
                    value={releaseAmount?.releaseAmount!=0?releaseAmount?.releaseAmount:''}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setReleaseAmount(()=>({
                        ...releaseAmount,
                        releaseAmount: Number(e.target.value),
                      } ))
                    }
                    variant="outlined"
                    fullWidth
                    disabled={props.action=='view'}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Amount Transferred"
                    type='number'
                    value={releaseAmount?.transferredAmount!=0?releaseAmount?.transferredAmount:''}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setReleaseAmount(()=> ({
                        ...releaseAmount,
                        transferredAmount: Number(e.target.value),
                      } ))}
                    fullWidth
                    variant="outlined"
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date"
                    value={releaseAmount?.transferredDate}
                    format="DD/MM/YYYY"
                    sx={{ width: '100%' }}
                    disabled={props.action=='view'}

                    // onChange={(e) =>
                    // // eslint-disable-next-line @typescript-eslint/naming-convention
                    //   setIRO((IRO: any) => ({
                    //     ...IRO,
                    // releaseAmount:{
                    // ...releaseAmount,
                    //     transferredDate: e.target.value,
                    // }
                    //   }))
                    // }
                  />
                </Grid>
                {/* <Grid item xs={12} > */}
                {/* { <BankDetailsForm
                  value={IRO?.transferredBank}
                  onChange={(newbankDetails) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setIRO((IRO) => ({
                      ...IRO,
                      releaseAmount:{
                        ...releaseAmount,
                        transferredBank: newbankDetails,
                      }
                    }));
                  }}
                  action={'add'}
                  options={{ title: 'Amount Transferred (Bank) Details' }}
                /> */}


                <Grid item xs={12}>
                  <Typography variant="h4" component="h4">
                    Amount Transferred (Bank) Details
                  </Typography>
                </Grid>
                <br />
                {/* <Grid container spacing={3}> */}
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Bank Name"
                    value={releaseAmount?.transferredBank?.bankName}
                    onChange={(e) =>
                      setReleaseAmount(()=>(
                        {
                          ...releaseAmount,
                          transferredBank: {
                            ...releaseAmount.transferredBank,
                            bankName: e.target.value,
                          } } ))}
                    variant="outlined"
                    fullWidth
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Branch Name"
                    value={releaseAmount?.transferredBank?.branchName}
                    onChange={(e) =>
                      setReleaseAmount(()=>( {

                        ...releaseAmount,
                        transferredBank: {
                          ...releaseAmount.transferredBank,
                          branchName: e.target.value,
                        } } ))}
                    variant="outlined"
                    fullWidth
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Account Number"
                    value={releaseAmount?.transferredBank?.accountNumber}
                    onChange={(e) =>
                      setReleaseAmount(()=>( {
                        ...releaseAmount,
                        transferredBank: {
                          ...releaseAmount.transferredBank,
                          accountNumber: e.target.value },
                      } ))}
                    variant="outlined"
                    fullWidth
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="IFSC Code"
                    value={releaseAmount?.transferredBank?.IFSCCode}
                    onChange={(e) =>
                      setReleaseAmount(()=>(
                        {

                          ...releaseAmount,
                          transferredBank: {
                            ...releaseAmount.transferredBank,
                            IFSCCode: e.target.value },
                        } ))}
                    variant="outlined"
                    fullWidth
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Beneficiary"
                    value={releaseAmount?.transferredBank?.beneficiary}
                    onChange={(e) =>
                      setReleaseAmount(()=>(
                        {
                          ...releaseAmount,
                          transferredBank: {
                            ...releaseAmount.transferredBank,
                            beneficiary: e.target.value,
                          },
                        } ))}
                    variant="outlined"
                    fullWidth
                    disabled={props.action=='view'}
                    InputLabelProps={{
                      shrink: Boolean(releaseAmount?.transferredBank?.beneficiary),
                    }}
                  />
                </Grid>

                {/* </Grid> */}
                <Grid item xs={12} md={6} lg={4}>
                  <Autocomplete
                    disablePortal
                    id="Payment_method"
                    value={releaseAmount?.modeOfPayment}
                    options={['Cash', 'Cheque', 'UPI', 'Credit Card', 'Debit Card']}
                    onChange={(_e, newValue) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                      setReleaseAmount(()=>( {

                        ...releaseAmount,
                        modeOfPayment: newValue??'',
                      } ))}
                    renderInput={(params) => <TextField {...params} label="Mode of payment"
                      required/>}
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Transaction No:"
                    value={releaseAmount?.transactionNumber}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setReleaseAmount(()=>(
                        {

                          ...releaseAmount,
                          transactionNumber: e.target.value,
                        } ))}
                    variant="outlined"
                    fullWidth
                    required
                    disabled={props.action=='view'}

                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                          Attachments
                  </Button>
                </Grid>
              </Grid>
              <br />
              {hasPermissions(['MANAGE_IRO'])&& iroStatus?(<>
                <Button variant="contained" style={{ textAlign: 'right', float: 'right' }} type="submit" >
                Release Amount
                </Button>
                <br />
              </>
              ):null}
            </form>
          </CardContent>
        </Card>
      </Container>
      {/* <FileUploader
        title="Attachments"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={newParticular.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'FR/Particulars', file.name)
          .then( (res)=>{
            console.log(res.data._id);

            setNewParticular(() => ({
              ...newParticular,
              attachment: [...newParticular.attachment, res.data],
            }));
            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.filter((file)=>file._id!==fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      /> */}
      <FileUploader
        title="Attachments"
        action={props.action}
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={releaseAmount.attachment??[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/ReleaseAmount', file.name)
          .then((res)=>{
            console.log(res.data._id);
            setReleaseAmount(()=>( {
              ...releaseAmount,
              attachment: [...(releaseAmount.attachment||[]), res.data],
            } ));
            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          setReleaseAmount(()=>( {

            ...releaseAmount,
            attachment: releaseAmount.attachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          } ));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={props.action=='add'?(fileId: string) => {
          setReleaseAmount(()=>( {
            ...releaseAmount,
            attachment: releaseAmount.attachment.filter((file)=>file._id!==fileId),
          } ));
          return FileUploaderServices.deleteFile(fileId);
        }:undefined}
      />
    </CommonPageLayout>
  );
};

export default ReleaseAmount;
