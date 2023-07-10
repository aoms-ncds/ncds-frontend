import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { enqueueSnackbar } from 'notistack';
import UserForm from '../User/components/UserForm';
import { useParams } from 'react-router-dom';
import WorkersServices from './extras/WorkersServices';

interface WorkerFormPageProps {
  action: 'add' | 'edit' | 'view';
}
const WorkerFormPage = (props: WorkerFormPageProps) => {
  const { id } = useParams();

  const [worker, setWorker] = useState<CreatableIWorker>({
    workerCode: '',
    kind: 'worker',
    tokens: [],
    basicDetails: {
      firstName: '',
      lastName: '',
      email: '',
      permanentAddress: {},
      currentOfficialAddress: {},
      residingAddress: {},
    },
    officialDetails: {
      divisionHistory: [],
      remarks: '',
      selfSupport: true,
      // status: '',
    },
    supportDetails: {
      // totalNoOfYearsInMinistry: 10,
      // withChurch: true,
    },
    supportStructure: {
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
    spouse: {
      firstName: '',
      lastName: '',
      knownLanguages: [],
    },
    children: [],
  });

  const [userPhoto, setUserPhoto] = useState<File>();


  useEffect(() => {
    if (id) {
      WorkersServices.getById(id)
        .then((res) => {
          if (res.data) {
            setWorker(res.data);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, []);

  return (
    <CommonPageLayout title={props.action == 'add' ? 'Add' : props.action == 'edit' ? 'Edit' : 'View' + ' worker'}>
      <UserForm<CreatableIWorker>
        action={props.action}
        value={worker}
        onChange={(newUser) => {
          setWorker(newUser);
        }}
        options={{
          textField: {
            variant: 'standard',
          },
          kind: 'worker',
          profilePic: {
            userPhoto: userPhoto,
            setUserPhoto: ((newUserPhoto)=>setUserPhoto(newUserPhoto)),

          },
        }}
        onSubmit={async (creatableWorker) => {
          try {
            if (props.action === 'add') {
              const createWorkerResponse = await WorkersServices.create(creatableWorker, userPhoto);
              enqueueSnackbar({ variant: 'success', message: createWorkerResponse.message });
            } else if (props.action === 'edit') {
              const updateWorkerResponse = await WorkersServices.edit(creatableWorker, userPhoto);
              enqueueSnackbar({ variant: 'success', message: updateWorkerResponse.message });
            }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default WorkerFormPage;
