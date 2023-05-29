import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { enqueueSnackbar } from 'notistack';
import UserForm from '../User/components/UserForm';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import StaffServices from './extras/StaffServices';

interface StaffFormPageProps{
  action: 'add'|'edit'|'view';
}
const StaffFormPage = (props: StaffFormPageProps) => {
  const { id } = useParams();

  const [staff, setStaff] = useState<CreatableStaff>({
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
      status: 'Ministering',
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
      StaffServices.getById(id).then((res) => {
        if (res.data) {
          setStaff({ ...res.data,
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
      <UserForm<CreatableStaff>
        action={props.action}
        value={staff}
        onChange={(newUser) => {
          setStaff(newUser);
        }}
        options={{
          textField: {
            variant: 'standard',
          },
          kind: 'staff',
        }}
        onSubmit={async (creatableStaff) => {
          console.log(creatableStaff);
          try {
            if (props.action === 'add') {
              const createStaffResponse = await StaffServices.create(creatableStaff);
              enqueueSnackbar({ variant: 'success', message: createStaffResponse.message });
            } else if (props.action ==='edit') {
              const updateStaffResponse = await StaffServices.edit(creatableStaff);
              enqueueSnackbar({ variant: 'success', message: updateStaffResponse.message });
            }
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
