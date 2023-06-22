import CommonPageLayout from '../../components/CommonPageLayout';
import { Alert, Grid } from '@mui/material';
import MinimalModuleDataAnalytics from './components/MinimalModuleDataAnalytics';
import PermissionChecks from '../User/components/PermissionChecks';
import { useEffect } from 'react';
import { subscribe } from '../../extras/Firebase/messaging';

const HomePage = () => {
  useEffect(() => {
    subscribe();
  }, []);
  return (
    <CommonPageLayout title="Home Page">
      {/* <Container> */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <MinimalModuleDataAnalytics />
        </Grid>
        <PermissionChecks
          permissions={['ADMIN_ACCESS', 'READ_DIVISIONS', 'WRITE_FR']}
          granted={(
            <>
              <Grid item xs={12} lg={6}>
              </Grid>
            </>
          )}
          denied={(missingPermissions) => (
            <Grid item xs={12} lg={6}>
              <Alert severity='error'>
                Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
              </Alert>
            </Grid>
          )}
        />
      </Grid>
      {/* </Container> */}
    </CommonPageLayout>
  );
};

export default HomePage;
export const HomePagePath = '/';
