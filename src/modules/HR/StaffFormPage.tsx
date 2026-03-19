import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { enqueueSnackbar } from 'notistack';
import UserForm from '../User/components/UserForm';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import StaffServices from './extras/StaffServices';

interface StaffFormPageProps {
  action: 'add' | 'edit' | 'view';
}
const StaffFormPage = (props: StaffFormPageProps) => {
  const { id } = useParams();

  const [staff, setStaff] = useState<CreatableStaff>({
    kind: 'staff',
    tokens: [],
    basicDetails: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',

      permanentAddress: {},
      currentOfficialAddress: {},
      residingAddress: {},
    },
    officialDetails: {
      divisionHistory: [],
      // noOfChurches: 5,
    },
    supportDetails: {
      selfSupport: true,
      percentageofSelfSupport: 0,
      // totalNoOfYearsInMinistry: 10,
      // withChurch: true,
    },
    supportStructure: {
      supportEnabled: true,
      // basic: 0,
      // HRA: 0,
      // spouseAllowance: 0,
      // positionalAllowance: 0,
      // specialAllowance: 0,
      // impactDeduction: 0,
      // telAllowance: 0,
      // PIONMissionaryFund: 0,
      // MUTDeduction: 0,
    },
  });

  const [userPhoto, setUserPhoto] = useState<File>();
  const [childPhotos, setChildPhotos] = useState<{ id: string; childPhoto: File | null }[]>([{
    id: '',
    childPhoto: null,
  }]);
  useEffect(() => {
    if (id) {
      StaffServices.getById(id)
        .then((res) => {
          if (res.data) {
            setStaff(
              res.data,
            );
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, []);

  return (
    <CommonPageLayout title={props.action =='add' ? 'Add staff': 'Edit Staff'}>
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
          profilePic: {
            userPhoto: userPhoto,
            setUserPhoto: ((newUserPhoto) => setUserPhoto(newUserPhoto)),

          },
          childProfilePic: {
            childPhoto: childPhotos,
            setChildPhoto: ((newChildPhoto) =>{
              const _childPhotos=childPhotos.filter((_pht)=>_pht.id==='');
              const childPhotosId=_childPhotos.map((_pht)=>_pht.id);
              if (childPhotosId.includes(newChildPhoto.id)) {
                setChildPhotos(()=>_childPhotos.map((_pht)=>_pht.id===newChildPhoto.id?newChildPhoto:_pht));
              } else {
                setChildPhotos(()=>[..._childPhotos, newChildPhoto]);
              }
            }),
          },
          tab: 0,
        }}
        onSubmit={async (creatableStaff) => {
          try {
            if (props.action === 'add') {
              const createStaffResponse = await StaffServices.create(creatableStaff, userPhoto);
              enqueueSnackbar({ variant: 'success', message: createStaffResponse.message });
            } else if (props.action === 'edit') {
              const updateStaffResponse = await StaffServices.edit(creatableStaff, userPhoto);
              enqueueSnackbar({ variant: 'success', message: updateStaffResponse.message });
            }
          } catch (error: any) {
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
