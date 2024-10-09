import {
  ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Alert, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import PermissionChecks from '../User/components/PermissionChecks';
import MinimalModuleDataAnalytics from './components/MinimalModuleDataAnalytics';
import CHART1 from './components/chart1';
import CHART2 from './components/chart2';
import CHART3 from './components/chart3';
import CHART4 from './components/chart4';
import CHART5 from './components/chart5';
import CHART6 from './components/chart6';
import CHART7 from './components/chart7';
import { useEffect, useState } from 'react';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import WorkersServices from '../Workers/extras/WorkersServices';
import FRServices from '../FR/extras/FRServices';
import IROServices from '../IRO/extras/IROServices';


const HomePage = () => {
  const [divisionsCount, setDivisionsCount] = useState<string | null>(null);
  const [workersCount, setWorkersCount] = useState<string | null>(null);
  const [frCount, setFrCount] = useState<string | null>(null);
  const [iroCount, setIroCount] = useState<string | null>(null);
  useEffect(()=>{
    DivisionsServices.getCount()
    .then((res) => {
      setDivisionsCount(res.data.toString());
    })
    .catch((error) => {
      setDivisionsCount('Unable to load!');
    });

    WorkersServices.getCount()
    .then((res) => {
      setWorkersCount(res.data.toString());
    })
    .catch((error) => {
      setWorkersCount('Unable to load!');
    });

    // Get FR count
    FRServices.getCount()
     .then((res) => {
       setFrCount(res.data.toString());
     })
     .catch((error) => {
       setFrCount('Unable to load!');
     });

    // Get IRO count
    IROServices.getCount()
     .then((res) => {
       setIroCount(res.data.toString());
     })
     .catch((error) => {
       setIroCount('Unable to load!');
     });
  }, []);
  return (
    <CommonPageLayout title="" appBarSx={{ backgroundColor: 'rgb(59, 50, 230)' }} mainContentSx={{ p: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: '#fff' }} />
      {/* <Container> */}
      <div style={{ backgroundColor: '#fff', position: 'relative' }}>
        <Grid container spacing={3} padding={1} height={300}>
          {/* Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#fff', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body1" align='center' color={'black'}>Divisions</Typography>
                <Typography variant="h5" align='center' color={'black'}>{divisionsCount}</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />2.1%</span> <span style={{ color: 'black' }}> vs last 7 days</span>
                </Typography>
                <CHART1 />
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#fff', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center' color={'black'}>Workers</Typography>
                <Typography variant="h5" align='center' color={'black'}>{workersCount}</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />5.2%</span> <span style={{ color: 'black' }}>vs last 7 days</span>
                </Typography>
                <CHART2></CHART2>
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#fff', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center' color={'black'}>IRO</Typography>
                <Typography variant="h5" align='center' color={'black'}>{iroCount}</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />7.0%</span> <span style={{ color: 'black' }}>vs last 7 days </span>
                </Typography>
                <CHART3></CHART3>
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#fff', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center' color={'black'}>FR</Typography>
                <Typography variant="h5" align='center' color={'black'}>{frCount}</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />4.3%</span> <span style={{ color: 'black' }}> vs last 7 days</span>
                </Typography>
                <CHART4></CHART4>
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
        </Grid>
      </div>
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-50px', marginLeft: '20px', marginRight: '20px' }}>
        <Grid container spacing={3}>
          {/* Sales Overview */}
          <Grid item xs={12} lg={12} xl={12}>
            <Card sx={{ backgroundColor: '#fff' }}>
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: '5px' }}>
                  <Grid item xs={12} lg={12}>
                    <MinimalModuleDataAnalytics />
                  </Grid>
                  <PermissionChecks
                    permissions={['READ_ACCESS']}
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>


      {/* </Container> */}
    </CommonPageLayout>
  );
};

export default HomePage;
export const HomePagePath = '/';
