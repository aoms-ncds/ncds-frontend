import { Button, Card, CardContent, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import IROServices from './extras/IROServices';
import { useNavigate } from 'react-router-dom';
import BankDetailsForm from '../Divisions/components/BankDetails';
import { IROrder } from './extras/IROTypes';
import { BankDetails } from '../Divisions/extras/DivisionsTypes';

const ReleaseAmount = () => {
  const navigate=useNavigate();
  const [IROrelease, setIROrelease] = useState<IROrder>({
    _id: '',
    IROno: '',
    IROdate: moment(),
    division: {
      divisionName: '',
      divisionId: '',
      contactNumber: '',
      email: '',
      address: {
        buildingName: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
      },
      noofWorkers: 0,
      noOfSubdivisions: 0,
      noOfChurches: 0,
      coordinator: {
        '_id': '646703c19e433f67d27019b2',
        'kind': 'staff',
        'basicDetails': {
          'aadhaar': {
            'aadhaarNo': '123456789012',
          },
          'voterId': {
            'voterIdNo': 'V12345678',
          },
          'firstName': 'John',
          'lastName': 'Doe',
          'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
          'gender': 'Male',
          'field': 'Missionary',
          'martialStatus': 'Married',
          'highestQualification': 'Ph.D.',
          'motherTounge': 'English',
          'communicationLanguage': 'English',
          'knownLanguages': [
            'English',
            'Malayalam - മലയാളം',
          ],
          'email': 'abcd@gmail.com',
          'phone': '1234567890',
          'alternativePhone': '9876543210',
          'PANNo': 'ABCD1234',
          'licenseNumber': 'L12345678',
          'permanentAddress': {
            'buildingName': 'Puliyulla parambath',
            'street': '123 Main Street',
            'city': 'Example City',
            'state': 'Example State',
            'country': 'India',
            'pincode': '12345',
          },
          'currentAddress': {
            'buildingName': 'Puliyulla parambath',
            'street': '456 Elm Street',
            'city': 'Current City',
            'state': 'Current State',
            'country': 'India',
            'pincode': '54321',
          },
        },
        'officialDetails': {
          'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
          'remarks': 'Lorem ipsum dolor sit amet.',
          'selfSupport': true,
          'status': 'ministering',
          'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
          'noOfChurches': 5,
          'subdivision': {
            _id: 'skjdfj',
            name: 'ksdfj',
          },
        },
        'supportDetails': {
          'totalNoOfYearsInMinistry': 10,
          'withChurch': true,
        },
        'supportStructure': {
          'basic': 5000,
          'HRA': 2000,
          'spouseAllowance': 1000,
          'positionalAllowance': 500,
          'specialAllowance': 800,
          'impactDeduction': 200,
          'telAllowance': 400,
          'PIONMissionaryFund': 300,
          'MUTDeduction': 100,
        },
        'createdAt': moment('2023-05-19T05:06:09.292Z'),
        'updatedAt': moment('2023-05-19T05:06:09.292Z'),
      },
      seniorLeader: {
        '_id': '646703c19e433f67d27019b2',
        'kind': 'staff',
        'basicDetails': {
          'aadhaar': {
            'aadhaarNo': '123456789012',
          },
          'voterId': {
            'voterIdNo': 'V12345678',
          },
          'firstName': 'John',
          'lastName': 'Doe',
          'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
          'gender': 'Male',
          'field': 'Missionary',
          'martialStatus': 'Married',
          'highestQualification': 'Ph.D.',
          'motherTounge': 'English',
          'communicationLanguage': 'English',
          'knownLanguages': [
            'English',
            'Malayalam - മലയാളം',
          ],
          'email': 'abcd@gmail.com',
          'phone': '1234567890',
          'alternativePhone': '9876543210',
          'PANNo': 'ABCD1234',
          'licenseNumber': 'L12345678',
          'permanentAddress': {
            'buildingName': 'Puliyulla parambath',
            'street': '123 Main Street',
            'city': 'Example City',
            'state': 'Example State',
            'country': 'India',
            'pincode': '12345',
          },
          'currentAddress': {
            'buildingName': 'Puliyulla parambath',
            'street': '456 Elm Street',
            'city': 'Current City',
            'state': 'Current State',
            'country': 'India',
            'pincode': '54321',
          },
        },
        'officialDetails': {
          'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
          'remarks': 'Lorem ipsum dolor sit amet.',
          'selfSupport': true,
          'status': 'ministering',
          'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
          'noOfChurches': 5,
          'subdivision': {
            _id: 'skjdfj',
            name: 'ksdfj',
          },
        },
        'supportDetails': {
          'totalNoOfYearsInMinistry': 10,
          'withChurch': true,
        },
        'supportStructure': {
          'basic': 5000,
          'HRA': 2000,
          'spouseAllowance': 1000,
          'positionalAllowance': 500,
          'specialAllowance': 800,
          'impactDeduction': 200,
          'telAllowance': 400,
          'PIONMissionaryFund': 300,
          'MUTDeduction': 100,
        },
        'createdAt': moment('2023-05-19T05:06:09.292Z'),
        'updatedAt': moment('2023-05-19T05:06:09.292Z'),
      },
      juniorLeader: {
        '_id': '646703c19e433f67d27019b2',
        'kind': 'staff',
        'basicDetails': {
          'aadhaar': {
            'aadhaarNo': '123456789012',
          },
          'voterId': {
            'voterIdNo': 'V12345678',
          },
          'firstName': 'John',
          'lastName': 'Doe',
          'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
          'gender': 'Male',
          'field': 'Missionary',
          'martialStatus': 'Married',
          'highestQualification': 'Ph.D.',
          'motherTounge': 'English',
          'communicationLanguage': 'English',
          'knownLanguages': [
            'English',
            'Malayalam - മലയാളം',
          ],
          'email': 'abcd@gmail.com',
          'phone': '1234567890',
          'alternativePhone': '9876543210',
          'PANNo': 'ABCD1234',
          'licenseNumber': 'L12345678',
          'permanentAddress': {
            'buildingName': 'Puliyulla parambath',
            'street': '123 Main Street',
            'city': 'Example City',
            'state': 'Example State',
            'country': 'India',
            'pincode': '12345',
          },
          'currentAddress': {
            'buildingName': 'Puliyulla parambath',
            'street': '456 Elm Street',
            'city': 'Current City',
            'state': 'Current State',
            'country': 'India',
            'pincode': '54321',
          },
        },
        'officialDetails': {
          'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
          'remarks': 'Lorem ipsum dolor sit amet.',
          'selfSupport': true,
          'status': 'ministering',
          'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
          'noOfChurches': 5,
          'subdivision': {
            _id: 'skjdfj',
            name: 'ksdfj',
          },
        },
        'supportDetails': {
          'totalNoOfYearsInMinistry': 10,
          'withChurch': true,
        },
        'supportStructure': {
          'basic': 5000,
          'HRA': 2000,
          'spouseAllowance': 1000,
          'positionalAllowance': 500,
          'specialAllowance': 800,
          'impactDeduction': 200,
          'telAllowance': 400,
          'PIONMissionaryFund': 300,
          'MUTDeduction': 100,
        },
        'createdAt': moment('2023-05-19T05:06:09.292Z'),
        'updatedAt': moment('2023-05-19T05:06:09.292Z'),
      },
    },
    subDivision: {
      _id: '',
      name: 'subdivision 1',

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
