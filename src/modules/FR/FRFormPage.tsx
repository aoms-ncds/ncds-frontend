import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card } from '@mui/material';
import FRForm from './components/FRForm';
import FRServices from './extras/FRServices';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

interface FRFormPagerops{
  action: 'add'|'edit'|'view';
}
const FRFormPage = (props: FRFormPagerops) => {
  const { frID } = useParams();
  const [requisition, setRequisition] = useState<CreatableFR>({});
  useEffect(() => {
    if ( props.action !== 'add' && !frID) {
      throw new Error('FR ID Missing in URL');
    }
    if (props.action === 'edit' || props.action === 'view') {
      FRServices.getById(frID as string)
      .then((res) => setRequisition(res.data))
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
    }
  }, []);

  // const { frID }=useParams();

  return (
    <CommonPageLayout title={props.action === 'add' ? 'Apply New FR': props.action === 'edit'?'Edit FR':'View FR'}>
      <Card style={{ width: '100%' }}>
        <FRForm
          value={requisition}
          onChange={(newReq) => setRequisition(newReq)}
          action='add'
          onSubmit={async (requisition) => {
            return;
          }}
        />
      </Card>

    </CommonPageLayout>
  );
};

export default FRFormPage;
