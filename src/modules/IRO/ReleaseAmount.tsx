import { Button, Card, CardContent, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import IROServices from './extras/IROServices';
import { useNavigate } from 'react-router-dom';
import BankDetailsForm from '../Divisions/components/BankDetails';

const ReleaseAmount = () => {
  const navigate=useNavigate();
  const [IROrelease, setIROrelease] = useState<IROrder>({
    _id: '',
    IROno: '',
    IROdate: moment(),
    division: {
      divisionName: '',
      _id: '',
      divisionId: '',
      contactNumber: '',
      email: '',
      address: {
        buildingName: '',
        street: '',
        city: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
      },
      noofWorkers: 0,
      noOfSubdivisions: 0,
      noOfChurches: 0,
      coordinator: {
        _id: '',
        firstName: '',
        lastName: '',
        dob: moment(''),
        doj: moment(''),
        designation: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        department: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        age: 0,
        gender: 'Female',
        phone: '',
        email: '',
        formattedId: '',
        createdAt: moment(),
        updatedAt: moment(),
      },
      seniorLeader: {
        _id: '',
        firstName: '',
        lastName: '',
        dob: moment(),
        doj: moment(),
        designation: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        department: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        age: 0,
        gender: 'Female',
        phone: '',
        email: '',
        formattedId: '',
        createdAt: moment(),
        updatedAt: moment(),
      },
      juniorLeader: {
        _id: '',
        firstName: '',
        lastName: '',
        dob: moment(),
        doj: moment(),
        designation: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        department: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        age: 0,
        gender: 'Female',
        phone: '',
        email: '',
        formattedId: '',
        createdAt: moment(),
        updatedAt: moment(),
      },
      createdAt: moment(),
      updatedAt: moment(),
    },
    subDivision: {
      _id: '',
      subDivisionName: 'subdivision 1',

    },
    mainCategory: '',
    requestAmount: 0,
    lastUpdateDate: moment(),
    sanction: '',
    releaseAmount: 0,
    transferredAmount: 0,
    transferredDate: moment(),
    transferredBank: {
      bankname: '',
      branchname: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',

    },
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
      <Container>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <form onSubmit={saveReleaseAmount}>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <TextField
                    label="Release Amount"
                    value={Number(IROrelease?.releaseAmount)}
                    onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        releaseAmount: Number(e.target.value),
                      }))
                    } variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Amount Transferred"
                    value={Number(IROrelease?.transferredAmount)}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transferredAmount: Number(e.target.value),
                      }))
                    }
                    fullWidth variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6} >
                  <DatePicker label="Date"
                    value={IROrelease?.transferredDate}
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
                <BankDetailsForm
                  value={IROrelease?.transferredBank}
                  onChange={(newbankDetails: BankDetails) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setIROrelease((IROrelease) => ({
                      ...IROrelease,
                      transferredBank: newbankDetails,
                    }));
                  }}
                  action={'add'}
                  options={{ title: 'Amount Transferred (Bank) Details' }}
                />

                {/* </Grid> */}
                <Grid item xs={12} md={6} lg={4}>
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
                    fullWidth variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6} >
                  <TextField
                    label="Transaction No:"
                    value={IROrelease?.transactionNumber}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setIROrelease((IROrelease) => ({
                        ...IROrelease,
                        transactionNumber: e.target.value,
                      }))
                    } variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} >
                  <TextField variant="outlined"
                    type="file"
                    // onChange={(e) => handleFileUpload(e.target.files)}
                  />
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
        </Card>
      </Container>
    </CommonPageLayout>
  );
};

export default ReleaseAmount;
