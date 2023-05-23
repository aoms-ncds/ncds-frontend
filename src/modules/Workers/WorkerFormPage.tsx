import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { enqueueSnackbar } from 'notistack';
import UserForm from '../User/components/UserForm';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import WorkersServices from './extras/WorkersServices';
import { CreatableIWorker } from './extras/WorkersTypes';

interface WorkerFormPageProps{
  action: 'add'|'edit'|'view';
}
const WorkerFormPage = (props: WorkerFormPageProps) => {
  const { id } = useParams();

  const [worker, setWorker] = useState<CreatableIWorker>({
    workerCode: '',
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
    spouse: {
      firstName: '',
      lastName: '',
      knownLanguages: [],

    },
  });

  useEffect(() => {
    if (id) {
      WorkersServices.getById(id).then((res) => {
        if (res.data) {
          setWorker(res.data);
        }
      }).catch((res) => {
        console.log(res);
      });
    }
  }, []);

  return (
    <CommonPageLayout title={'Add worker'}>
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
        }}
        onSubmit={async (creatableWorker) => {
          try {
            if (props.action === 'add') {
              const createWorkerResponse = await WorkersServices.create(creatableWorker);
              enqueueSnackbar({ variant: 'success', message: createWorkerResponse.message });
            } else if (props.action ==='edit') {
              const updateWorkerResponse = await WorkersServices.edit(creatableWorker);
              enqueueSnackbar({ variant: 'success', message: updateWorkerResponse.message });
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

export default WorkerFormPage;
