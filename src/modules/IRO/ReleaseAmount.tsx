/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { DatePicker } from '@mui/x-date-pickers';
import IROServices from './extras/IROServices';
import { Attachment as AttachmentIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
// import FileUploader from '../../components/FileUploader/FileUploader';
// import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
// import { MB } from '../../extras/CommonConfig';

const ReleaseAmount = () => {
  const navigate = useNavigate();
  const { iroID } = useParams();
  const [IROrelease, setIROrelease] = useState<IROrder>();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [showFileUploader, setShowFileUploader] = useState(false);

  const saveReleaseAmount = (e: { preventDefault: () => void }) => {
    console.log(IROrelease, 'IROrelease');
    e.preventDefault();
    if (iroID && IROrelease) {
      IROServices.saveRelease(iroID, IROrelease).then((res) => {
        console.log(res.data);
        navigate('/iro/');
      });
    }
  };
  useEffect(() => {
    IROServices.() // TODO: Implement REST API Call
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
                    value={IROrelease?.ReleaseAmount?.releaseAmount}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        releaseAmount: Number(e.target.value),
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Amount Transferred"
                    value={IROrelease?.ReleaseAmount?.transferredAmount}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transferredAmount: Number(e.target.value),
                      }))
                    }
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date"
                    value={IROrelease?.ReleaseAmount?.transferredDate}
                    format="DD/MM/YYYY"
                    sx={{ width: '100%' }}
                    // onChange={(e) =>
                    // // eslint-disable-next-line @typescript-eslint/naming-convention
                    //   setIROrelease((IROrelease: any) => ({
                    //     ...IROrelease,
                    //     transferredDate: e.target.value,
                    //   }))
                    // }
                  />
                </Grid>
                {/* <Grid item xs={12} > */}
                {/* { <BankDetailsForm
                  value={IROrelease?.transferredBank}
                  onChange={(newbankDetails) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setIROrelease((IROrelease) => ({
                      ...IROrelease,
                      transferredBank: newbankDetails,
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
                    value={IROrelease?.ReleaseAmount?.transferredBank.bankName}
                    onChange={(e) =>
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        bankName: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Branch Name"
                    value={IROrelease?.ReleaseAmount?.branchName}
                    onChange={(e) =>
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        branchName: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Account Number"
                    value={IROrelease?.ReleaseAmount?.transferredBank.accountNumber}
                    onChange={(e) =>
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        accountNumber: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="IFSC Code"
                    value={IROrelease?.ReleaseAmount?.transferredBank.IFSCCode}
                    onChange={(e) =>
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        IFSCCode: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Beneficiary"
                    value={IROrelease?.ReleaseAmount?.beneficiary}
                    onChange={(e) =>
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        beneficiary: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                {/* </Grid> */}
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Mode of payment"
                    value={IROrelease?.ReleaseAmount?.modeOfPayment}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        modeOfPayment: e.target.value,
                      }))
                    }
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Transaction No:"
                    value={IROrelease?.ReleaseAmount?.transactionNumber}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transactionNumber: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                          Attachments
                  </Button>
                </Grid>
              </Grid>
              <br />
              <Button variant="contained" style={{ textAlign: 'right' }} type="submit">
                Release Amount
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <FileUploader
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
        getFiles={IROrelease?.ReleaseAmount?.attachment??[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
          .then((res)=>{
            // console.log(res.data._id);
            setIROrelease((IROrelease) => ({
              ...IROrelease,
              attachment: [...IROrelease?.ReleaseAmount?.attachment, res.data],
            }));
            return res;
          });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          setIROrelease((IROrelease) => ({
            ...IROrelease,
            attachment: IROrelease?.ReleaseAmount?.attachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setIROrelease((IROrelease) => ({
            ...IROrelease,
            attachment: IROrelease?.ReleaseAmount.attachment.filter((file)=>file._id!==fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
    </CommonPageLayout>
  );
};

export default ReleaseAmount;
