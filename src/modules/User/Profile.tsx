/* eslint-disable max-len */
/* eslint-disable react/no-multi-comp */
import { Avatar, Box, Card, CardContent, Container, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkersServices from '../Workers/extras/WorkersServices';
import StaffServices from '../HR/extras/StaffServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => ({ 'id': `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` });

const Profile = () => {
  const [user, setUser] = useState<IWorker | Staff|null>(null);
  const { userId, userKind } = useParams();
  const [currentTab, setCurrentTab] = React.useState(0);
  const columns: GridColDef<DivisionHistory>[] = [
    {
      field: 'division',
      headerName: 'Division',
      width: 200,
      renderCell: (props: any) => (
        <Link
          to={`/divisions/details/${props.row.division._id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {props.row.division.details.name}
        </Link>
      ),
    },
    {
      field: 'subDivision',
      headerName: 'Sub Division',
      width: 200,
      valueGetter: (params) => params.row.subDivision?.name??null,
    },
    {
      field: 'dateOfDivisionJoining',
      headerName: 'From',
      width: 200,
      valueGetter: (params) => params.row.dateOfDivisionJoining?.format('DD/MM/YYYY'),
    },
    {
      field: 'dateOfDivisionLeaving',
      headerName: 'To',
      width: 200,
      valueGetter: (params) => params.row.dateOfDivisionLeaving?.format('DD/MM/YYYY'),
    },
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (userId && userKind === 'staff') {
      StaffServices.getById(userId)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((res) => {});
    } else if (userId && userKind === 'worker') {
      WorkersServices.getById(userId)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((res) => {});
    }
  }, []);
  return (
    <CommonPageLayout
      title={`Profile of ${user?.basicDetails.firstName} ${user?.basicDetails.lastName}`}
      hidePageHeader={true}
    >
      <div style={{ display: 'inline-block', marginRight: 10 }}>
        <Avatar
          sx={{ height: 50, width: 50 }}
          src='https://mui.com/static/images/avatar/3.jpg'
        />
      </div> <Typography variant="h4" component='span'>Profile of {`${user?.basicDetails.firstName} ${user?.basicDetails.lastName}`}</Typography>
      <br />
      <Divider />
      <br />
      <Card>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Basic Details" {...a11yProps(0)} />
              <Tab label="Official Details" {...a11yProps(1)} />
              <Tab label="Support Details" {...a11yProps(2)} />
              <Tab label="Support Structure" {...a11yProps(3)} />
              { userKind ==='worker' && (user as unknown as IWorker)?.spouse && <Tab label="Spouse Details" {...a11yProps(4)} />}
              {userKind ==='worker' && (user as unknown as IWorker)?.children.length > 0 && <Tab label="Offsprings Details" {...a11yProps(5)} />}
            </Tabs>
          </Box>
          <TabPanel value={currentTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>{userKind === 'staff' ? 'Staff Code' : 'Worker Code'}:</Typography> {userKind === 'staff' ? (user as Staff|null)?.staffCode : (user as IWorker|null)?.workerCode} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First Name:</Typography> {user?.basicDetails.firstName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last Name: </Typography> {user?.basicDetails.lastName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Birth: </Typography> {user?.basicDetails.dateOfBirth.format('DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Gender: </Typography> {user?.basicDetails.gender} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Field: </Typography> {user?.basicDetails.field??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Martial Status: </Typography> {user?.basicDetails.martialStatus} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Highest Qualification: </Typography> {user?.basicDetails.highestQualification} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Religion: </Typography> {user?.basicDetails.religion} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Mother Tongue: </Typography> {user?.basicDetails.motherTongue?.name} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Communication Language: </Typography> {user?.basicDetails.communicationLanguage?.name} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Known Languages: </Typography> {user?.basicDetails.knownLanguages?.map((lang)=>lang.name).join(', ')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {user?.basicDetails.email} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {user?.basicDetails.phone} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Alternative Phone: </Typography> {user?.basicDetails.alternativePhone} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>PAN No: </Typography> {user?.basicDetails.PANNo} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Aadhaar: </Typography> {user?.basicDetails.aadhaar?.aadhaarNo} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Voter Id: </Typography> {user?.basicDetails.voterId?.voterIdNo} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>License Number: </Typography> {user?.basicDetails.licenseNumber} </Grid>
              <Grid item xs={12}> <Divider textAlign='left'>Permanent address</Divider> </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building Name: </Typography> {user?.basicDetails.permanentAddress.buildingName??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.permanentAddress.street??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.permanentAddress.city??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.permanentAddress.state??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.permanentAddress.country??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.permanentAddress.pincode??'---------------'} </Grid>
              <Grid item xs={12}> <Divider textAlign='left'>Current official address</Divider> </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building Name: </Typography> {user?.basicDetails.currentOfficialAddress.buildingName??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.currentOfficialAddress.street??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.currentOfficialAddress.city??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.currentOfficialAddress.state??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.currentOfficialAddress.country??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.currentOfficialAddress.pincode??'---------------'} </Grid>
              <Grid item xs={12}> <Divider textAlign='left'>Residing address</Divider> </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building Name: </Typography> {user?.basicDetails.residingAddress.buildingName??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.residingAddress.street??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.residingAddress.city??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.residingAddress.state??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.residingAddress.country??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.residingAddress.pincode??'---------------'} </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Joining:</Typography> {user?.officialDetails.dateOfJoining?.format(', DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>No Of Years With The Organization:</Typography> {user?.officialDetails.status!='Left'?user?.officialDetails.dateOfJoining?.fromNow(true):user?.officialDetails.dateOfLeaving?.from(user?.officialDetails.dateOfJoining, true)} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Status:</Typography> {user?.officialDetails.status} </Grid>
              {user?.officialDetails.status=='Left'&&(
                <>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Leaving:</Typography> {user?.officialDetails.dateOfLeaving?.format('DD/MM/YYYY')} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Reason for Deactivation:</Typography> {user?.officialDetails.reasonForDeactivation} </Grid>
                </>
              )}
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Remarks:</Typography> {user?.officialDetails.remarks} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Churches planted:</Typography> {user?.officialDetails.noOfChurches} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Self Support:</Typography> {user?.officialDetails.selfSupport ? 'Yes' : 'No'} </Grid>

              {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Division:</Typography> {user?.officialDetails.division?.details.name} </Grid> */}
              {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Sub Division:</Typography> {user?.officialDetails.subDivision?.name} </Grid> */}
              {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of leaving previous Division: </Typography> {user?.officialDetails.dateOfPreviousDivisionLeaving?.format('DD/MM/YYYY')} </Grid> */}
              {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of joining current Division:</Typography> {user?.officialDetails.divisionHistory.dateOfDivisionJoining?.format('DD/MM/YYYY')} </Grid> */}
            </Grid>
            <Container maxWidth='md' >
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} >
                      <Divider textAlign="center">

                        <Typography variant="h5" color="text.secondary" gutterBottom>
                  DIVISION HISTORY
                        </Typography>
                      </Divider>
                    </Grid>
                  </Grid>
                </CardContent>
                <DataGrid
                  rows={user?.officialDetails.divisionHistory ?? []}
                  columns={columns}
                  getRowId={(row) => row._id}
                  style={{ height: '40vh', width: '100%', justifyContent: 'center' }}
                />
              </Card>
            </Container>

          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Designation: </Typography> {user?.supportDetails.designation?.name} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total No of years in Ministry: </Typography> {user?.supportDetails.totalNoOfYearsInMinistry} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>With Church: </Typography> {user?.supportDetails.withChurch ? 'Yes': (user?.supportDetails.withChurch === false ? 'No' : 'Not specified')} </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Basic: </Typography> {user?.supportStructure?.basic} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>HRA: </Typography> {user?.supportStructure?.HRA} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Spouse Allowance: </Typography> {user?.supportStructure?.spouseAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Positional Allowance: </Typography> {user?.supportStructure?.positionalAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Special Allowance: </Typography> {user?.supportStructure?.specialAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Miscellaneous Deduction: </Typography> {user?.supportStructure?.impactDeduction} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Tel Allowance: </Typography> {user?.supportStructure?.telAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>PION Missionary Fund: </Typography> {user?.supportStructure?.PIONMissionaryFund} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>MUT Deduction: </Typography> {user?.supportStructure?.MUTDeduction} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total Amount: </Typography>
                {
                  (user?.supportStructure?.basic ?? 0) +
                  (user?.supportStructure?.HRA ?? 0) +
                  (user?.supportStructure?.spouseAllowance ?? 0) +
                  (user?.supportStructure?.positionalAllowance ?? 0) +
                  (user?.supportStructure?.specialAllowance ?? 0) +
                  (user?.supportStructure?.telAllowance ?? 0)
                }
              </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total Deduction: </Typography>
                {
                  (user?.supportStructure?.impactDeduction ?? 0) +
                   (user?.supportStructure?.PIONMissionaryFund ?? 0) +
                   (user?.supportStructure?.MUTDeduction ?? 0)
                }
              </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Net Amount: </Typography>
                {
                  (user?.supportStructure?.basic ?? 0) +
                  (user?.supportStructure?.HRA ?? 0) +
                  (user?.supportStructure?.spouseAllowance ?? 0) +
                  (user?.supportStructure?.positionalAllowance ?? 0) +
                  (user?.supportStructure?.specialAllowance ?? 0) +
                  (user?.supportStructure?.telAllowance ?? 0) -
                  (
                    (user?.supportStructure?.impactDeduction ?? 0) +
                    (user?.supportStructure?.PIONMissionaryFund ?? 0) +
                    (user?.supportStructure?.MUTDeduction ?? 0)
                  )
                }
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            {userKind ==='worker' && (user as unknown as IWorker)?.spouse && <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First Name: </Typography> {(user as unknown as IWorker)?.spouse?.firstName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last Name: </Typography> {(user as unknown as IWorker)?.spouse?.lastName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {(user as unknown as IWorker)?.spouse?.email} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {(user as unknown as IWorker)?.spouse?.phone} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Birth: </Typography> {(user as unknown as IWorker)?.spouse?.dateOfBirth?.format('DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Working: </Typography> {(user as unknown as IWorker)?.spouse?.working} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Occupation: </Typography> {(user as unknown as IWorker)?.spouse?.occupation} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Qualification: </Typography> {(user as unknown as IWorker)?.spouse?.qualification} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Known Languages: </Typography> {(user as unknown as IWorker)?.spouse?.knownLanguages?.join(', ')} </Grid>
            </Grid>}
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            <Container>
              <br />
              <Grid container spacing={3}>
                {userKind ==='worker' && (user as unknown as IWorker)?.children.length > 0 && (user as unknown as IWorker)?.children.map((child) => (
                  <Grid key={child._id} item xs={12} lg={6}>
                    <Grid container spacing={3} sx={{ border: '1px dashed grey', borderRadius: 2, pb: 3 }}>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First Name: </Typography> {child.firstName} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last Name: </Typography> {child.lastName} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date Of Birth: </Typography> {child.dateOfBirth?.format('DD/MM/YYYY')} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Child Support Level: </Typography> {child.childSupport.name} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Child Support Amount: </Typography> {child.childSupport.amount} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Studying: </Typography> {child.studying ? 'Yes' : 'No'} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Class Of Study: </Typography> {child.classOfStudy} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Working: </Typography> {child.working ? 'Yes' : 'No'} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Occupation: </Typography> {child.occupation} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Qualification: </Typography> {child.qualification} </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </TabPanel>
        </Box>
        <br />
      </Card>
    </CommonPageLayout>
  );
};

export default Profile;
