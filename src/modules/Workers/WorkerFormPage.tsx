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
    workerCode: '',
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
              const createdUser = await WorkersServices.creates(creatableUser);
            } else if (props.action ==='edit') {
              const updatedUser = await WorkersServices.edit(creatableUser);
            }
            enqueueSnackbar({
              variant: 'success',
              message: props.action === 'add'?`Created new ${creatableUser.kind}`:`Updated  ${creatableUser.kind}`,
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
