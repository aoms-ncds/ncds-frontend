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


const HomePage = () => {
  return (
    <CommonPageLayout title="" appBarSx={{ backgroundColor: '#181D20' }} mainContentSx={{ p: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: '#e1e0e0' }} />
      {/* <Container> */}
      <div style={{ backgroundColor: '#181D20', position: 'relative' }}>
        <Grid container spacing={3} padding={1} height={300}>
          {/* Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#181D20', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center'>Divisions</Typography>
                <Typography variant="h5" align='center'>89</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />2.1%</span> vs last 7 days
                </Typography>
                <CHART1 />
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#181D20', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center'>Workers</Typography>
                <Typography variant="h5" align='center'>90</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />5.2%</span> vs last 7 days
                </Typography>
                <CHART2></CHART2>
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#181D20', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center'>IR</Typography>
                <Typography variant="h5" align='center'>80</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />7.0%</span> vs last 7 days
                </Typography>
                <CHART3></CHART3>
              </CardContent>
            </Card>
          </Grid>
          {/* Other card components similar to Sessions */}
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Card sx={{ backgroundColor: '#181D20', color: 'white', borderRight: 1, borderColor: 'grey', height: '400' }}>
              <CardContent>
                <Typography variant="body2" align='center'>FR</Typography>
                <Typography variant="h5" align='center'>70</Typography>
                <Typography variant="body2" align='center'>
                  <span className="text-success" style={{ color: 'green' }}><ArrowUpwardIcon />4.3%</span> vs last 7 days
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
            <Card>
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
      <Grid container spacing={3} padding={1} height={300}>
        <Grid item xs={12} md={6} lg={4} xl={4}>
          <Card>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1" component="p" gutterBottom>
              Expenses
                  </Typography>
                  <Typography variant="h5" component="h5" gutterBottom>
              38.5%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Box
                    className="widgets-icons bg-light-danger text-danger"
                    sx={{ borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <BookmarkAddIcon />
                  </Box>
                </Grid>
              </Grid>
              <CHART5></CHART5>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={4}>
          <Card>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1" component="p" gutterBottom>
              IR
                  </Typography>
                  <Typography variant="h5" component="h5" gutterBottom>
              42.5%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Box
                    className="widgets-icons bg-light-danger text-danger"
                    sx={{ borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <BookmarkAddIcon /> {/* MUI BookmarkAddIcon */}
                  </Box>
                </Grid>
              </Grid>
              <CHART7></CHART7>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={4}>
          <Card>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1" component="p" gutterBottom>
              FR
                  </Typography>
                  <Typography variant="h5" component="h5" gutterBottom>
              48%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Box
                    className="widgets-icons bg-light-danger text-danger"
                    sx={{ borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <BookmarkAddIcon /> {/* MUI BookmarkAddIcon */}
                  </Box>
                </Grid>
              </Grid>
              <CHART6></CHART6>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* </Container> */}
    </CommonPageLayout>
  );
};

export default HomePage;
export const HomePagePath = '/';
