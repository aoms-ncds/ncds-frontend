import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { enqueueSnackbar } from 'notistack';
import UserForm from '../User/components/UserForm';
import moment from 'moment';
// import HRServices from '../HR/extras/HRServices';
import { useParams } from 'react-router-dom';
// import WorkersServices from './extras/WorkersServices';
import UserServices from '../User/extras/UserServices';

interface StaffFormPageProps{
  action: 'add'|'edit'|'view';
}
const StaffFormPage = (props: StaffFormPageProps) => {
  const { id } = useParams();

  const [user, setUser] = useState<CreatableNewUser>({
    workerCode: '',
    kind: 'staff',
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
      remarks: '',
      selfSupport: true,
      dateOfDivisionJoining: moment(),
      noOfChurches: 5,
    },
    supportDetails: {
      totalNoOfYearsInMinistry: 10,
      withChurch: true,
    },
    supportStructure: {
    },
  });

  useEffect(() => {
    if (id) {
      UserServices.getById(id).then((res) => {
        if (res.data) {
          setUser({ ...res.data,
            kind: 'staff',
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
    <CommonPageLayout title={'Add Staff'}>
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
              const createdUser = await UserServices.create(creatableUser);
            } else if (props.action ==='edit') {
              const updatedUser = await UserServices.edit(creatableUser);
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

export default StaffFormPage;
