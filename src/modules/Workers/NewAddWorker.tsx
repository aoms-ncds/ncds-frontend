import React, { useState } from 'react';
import UserForm from '../User/components/UserForm';
import CommonPageLayout from '../../components/CommonPageLayout';
import HRServices from '../HR/extras/HRServices';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';

const NewAddWorker = () => {
  // const [user, setUser] = useState<CreatableNewUser>({
  //   kind: 'worker',
  //   basicDetails: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     currentAddress: {},
  //     permanentAddress: {},
  //   },
  //   officialDetails: { remarks: '' },
  //   supportDetails: {},
  //   supportStructure: {},
  // });
  const [user, setUser] = useState<CreatableNewUser>({
    workerCode: 'W123',
    kind: 'worker',
    basicDetails: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: moment('2023-01-01'),
      gender: 'Male',
      field: 'missionary',
      martialStatus: 'Married',
      highestQualification: 'Ph.D.',
      motherTounge: 'English',
      communicationLanguage: 'English',
      knownLanguages: ['English', 'Malayalam - മലയാളം'],
      email: 'john.doe@example.com',
      phone: '1234567890',
      alternativePhone: '9876543210',
      PANNo: 'ABCD1234',
      aadhaar: {
        aadhaarNo: '123456789012',
      },
      voterId: {
        voterIdNo: 'V12345678',
      },
      licenseNumber: 'L12345678',
      permanentAddress: {
        buildingName: 'Puliyulla parambath',
        country: 'India',
        district: 'Kozhikkode',
        street: '123 Main Street',
        city: 'Example City',
        state: 'Example State',
        pincode: '12345',
      },
      currentAddress: {
        buildingName: 'Puliyulla parambath',
        country: 'India',
        district: 'Kozhikkode',
        street: '456 Elm Street',
        city: 'Current City',
        state: 'Current State',
        pincode: '54321',
      },
    },
    officialDetails: {
      dateOfJoining: moment('2023-01-01'),
      remarks: 'Lorem ipsum dolor sit amet.',
      selfSupport: true,
      status: 'ministering',
      dateOfDivisionJoining: moment(),
      noOfChurches: 5,
    },
    supportDetails: {
      totalNoOfYearsInMinistry: 10,
      withChurch: true,
    },
    supportStructure: {
      basic: 5000,
      HRA: 2000,
      spouseAllowance: 1000,
      positionalAllowance: 500,
      specialAllowance: 800,
      impactDeduction: 200,
      telAllowance: 400,
      PIONMissionaryFund: 300,
      MUTDeduction: 100,
    },
  },
  );

  return (
    <CommonPageLayout title='Add worker'>
      {/* {user.basicDetails.field} */}
      <UserForm
        action='add'
        value={user}
        onChange={(newUser) => {
          setUser(newUser);
        }}
        options={{
          textField: {
            variant: 'standard',
          },
        }}
        onSubmit={async (creatableUser) => {
          try {
            const createdUser = await HRServices.createStaff(creatableUser);
            enqueueSnackbar({
              variant: 'success',
              message: `Created new ${creatableUser.kind}`,
            });
          } catch (error:any) {
            enqueueSnackbar({
              variant: 'error',
              message: error.message,
            });
          }
        }}
      />
    </CommonPageLayout>
  );
};

export default NewAddWorker;
