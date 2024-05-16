import CommonPageLayout from '../../components/CommonPageLayout';
import ClosedFRsTable from './components/ClosedFRsTable';
import { Card } from '@mui/material';

const ClosedFR = () => {
  return (
    <CommonPageLayout title="Closed FR">
      <Card sx={{ maxWidth: '78vw', height: '85vh', alignItems: 'center' }} >
        <ClosedFRsTable />
      </Card>
    </CommonPageLayout>
  );
};

export default ClosedFR;
