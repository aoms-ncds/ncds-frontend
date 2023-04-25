import { Button, Card, CardContent, Container, FormControl, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import IROServices from './extras/IROServices';
import { useNavigate } from 'react-router-dom';

const ReleaseAmount = () => {
  const navigate=useNavigate();
  const [IROrelease, setIROrelease] = useState<IROrder>({
    _id: '',
    IROno: '',
    IROdate: moment(),
    divisionName: '',
    subdivisionName: '',
    mainCategory: '',
    requestAmount: '',
    lastUpdateDate: moment(),
    sanction: '',
    releaseAmount: '',
    transferredAmount: '',
    transferredDate: moment(),
    transferredBank: '',
    modeOfPayment: '',
    transactionNumber: '',
  });
  const saveReleaseAmount=(e: { preventDefault: () => void })=>{
    e.preventDefault();
    IROServices.saveRelease( IROrelease).then((res)=>{
      console.log(res.data);
      navigate('/iro/');
    });
  };
  return (
    <CommonPageLayout title='Release Amount Page'>
      <Card style={{ width: '100%' }}>
      </Card>
      <Container>
        <CardContent>
          <form onSubmit={saveReleaseAmount}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Release Amount"
                    value={IROrelease?.releaseAmount}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        releaseAmount: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid>
            <br/>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Amount Transferred"
                    value={IROrelease?.transferredAmount}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transferredAmount: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date"
                      // value={IROrelease?.transferredDate}
                      // onChange={(e) =>
                      // // eslint-disable-next-line @typescript-eslint/naming-convention
                      //   setIROrelease((IROrelease: any) => ({
                      //     ...IROrelease,
                      //     transferredDate: e.target.value,
                      //   }))
                      // }
                    />

                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Amount Transferred (Bank)"
                    value={IROrelease?.transferredBank}
                    onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transferredBank: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Mode of payment"
                    value={IROrelease?.modeOfPayment}
                    onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        modeOfPayment: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Transaction No:"
                    value={IROrelease?.transactionNumber}
                    onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transactionNumber: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    type="file"
                    // onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              style={{ textAlign: 'right' }}
              type='submit'
            >
  Release Amount
            </Button>
          </form>
        </CardContent>
      </Container>
    </CommonPageLayout>
  );
};

export default ReleaseAmount;
