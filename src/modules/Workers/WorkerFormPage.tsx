import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { enqueueSnackbar } from 'notistack';
import UserForm from '../User/components/UserForm';
import moment from 'moment';
import HRServices from '../HR/extras/HRServices';
import { useParams } from 'react-router-dom';
import WorkersServices from './extras/WorkersServices';
import UserServices from '../User/extras/UserServices';

interface WorkerFormPageProps{
  action: 'add'|'edit'|'view';
}
const WorkerFormPage = (props: WorkerFormPageProps) => {
  const { id } = useParams();

  const [user, setUser] = useState<CreatableNewUser>({
    workerCode: 'W123',
    kind: 'worker',
    basicDetails: {
      firstName: '',
      lastName: '',
      email: '',
      permanentAddress: {
      },
      currentAddress: {
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
  });

  useEffect(() => {
    if (id) {
      UserServices.getById(id).then((res) => {
        if (res.data) {
          setUser({ ...res.data,
            kind: 'worker',
            basicDetails: {
              ...res.data.basicDetails,
              aadhaar: undefined,
              voterId: undefined,
            },
          });
        }
      }).catch((res) => {
        console.log(res);
      });
    }
  }, []);

  return (
    <CommonPageLayout title={'Add worker'}>
      <UserForm
        action={props.action}
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
            if (props.action === 'add') {
              const createdUser = await UserServices.createStaff(creatableUser);
            } else if (props.action ==='edit') {
              const updatedUser = await UserServices.editStaff(creatableUser);
            }
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

export default WorkerFormPage;
