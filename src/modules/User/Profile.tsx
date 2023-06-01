/* eslint-disable max-len */
/* eslint-disable react/no-multi-comp */
import { Avatar, Box, Card, Container, Divider, Grid, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import StaffServices from '../HR/extras/StaffServices';
import WorkersServices from '../Workers/extras/WorkersServices';


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
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First name:</Typography> {user?.basicDetails.firstName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last name: </Typography> {user?.basicDetails.lastName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of birth: </Typography> {user?.basicDetails.dateOfBirth.format('dddd DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Gender: </Typography> {user?.basicDetails.gender} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Field: </Typography> {user?.basicDetails.field??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Martial status: </Typography> {user?.basicDetails.martialStatus} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Highest qualification: </Typography> {user?.basicDetails.highestQualification} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Mother tounge: </Typography> {user?.basicDetails.motherTongue} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Communication language: </Typography> {user?.basicDetails.communicationLanguage} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Known languages: </Typography> {user?.basicDetails.knownLanguages?.join(', ')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {user?.basicDetails.email} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {user?.basicDetails.phone} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Slternative phone: </Typography> {user?.basicDetails.alternativePhone} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>PAN No: </Typography> {user?.basicDetails.PANNo} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>aadhaar: </Typography> {user?.basicDetails.aadhaar?.aadhaarNo} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>voterId: </Typography> {user?.basicDetails.voterId?.voterIdNo} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>licenseNumber: </Typography> {user?.basicDetails.licenseNumber} </Grid>
              <Grid item xs={12}> <Divider textAlign='left'>Permanent address</Divider> </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building name: </Typography> {user?.basicDetails.permanentAddress.buildingName??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.permanentAddress.street??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.permanentAddress.city??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.permanentAddress.state??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.permanentAddress.country??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.permanentAddress.pincode??'---------------'} </Grid>
              <Grid item xs={12}> <Divider textAlign='left'>Current official address</Divider> </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building name: </Typography> {user?.basicDetails.currentOfficialAddress.buildingName??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.currentOfficialAddress.street??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.currentOfficialAddress.city??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.currentOfficialAddress.state??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.currentOfficialAddress.country??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.currentOfficialAddress.pincode??'---------------'} </Grid>
              <Grid item xs={12}> <Divider textAlign='left'>Residing address</Divider> </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building name: </Typography> {user?.basicDetails.residingAddress.buildingName??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.residingAddress.street??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.residingAddress.city??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.residingAddress.state??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.residingAddress.country??'---------------'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.residingAddress.pincode??'---------------'} </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of leaving:</Typography> {user?.officialDetails.dateOfJoining?.format('dddd, DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of joining:</Typography> {user?.officialDetails.dateOfLeaving?.format('dddd, DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Reason for deactivation:</Typography> {user?.officialDetails.reasonForDeactivation} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Remarks:</Typography> {user?.officialDetails.remarks} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Division:</Typography> {user?.officialDetails.division?.details.name} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Subdivision:</Typography> {user?.officialDetails.subdivision?.name} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>SelfSupport:</Typography> {user?.officialDetails.selfSupport ? 'Yes' : 'No'} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Status:</Typography> {user?.officialDetails.status} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of leaving previous division: </Typography> {user?.officialDetails.dateOfPreviousDivisionLeaving?.format('dddd DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of joining current division:</Typography> {user?.officialDetails.dateOfCurrentDivisionJoining?.format('dddd DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>no of churches:</Typography> {user?.officialDetails.noOfChurches} </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>designation: </Typography> {user?.supportDetails.designation?.name} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>totalNoOfYearsInMinistry: </Typography> {user?.supportDetails.totalNoOfYearsInMinistry} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>withChurch: </Typography> {user?.supportDetails.withChurch ? 'Yes': (user?.supportDetails.withChurch === false ? 'No' : 'Not specified')} </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Basic: </Typography> {user?.supportStructure.basic} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>HRA: </Typography> {user?.supportStructure.HRA} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Spouse allowance: </Typography> {user?.supportStructure.spouseAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Positional allowance: </Typography> {user?.supportStructure.positionalAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Special allowance: </Typography> {user?.supportStructure.specialAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Impact deduction: </Typography> {user?.supportStructure.impactDeduction} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Tel allowance: </Typography> {user?.supportStructure.telAllowance} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>PION missionary fund: </Typography> {user?.supportStructure.PIONMissionaryFund} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>MUT deduction: </Typography> {user?.supportStructure.MUTDeduction} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total amount: </Typography>
                {
                  (user?.supportStructure.basic ?? 0) +
                  (user?.supportStructure.HRA ?? 0) +
                  (user?.supportStructure.spouseAllowance ?? 0) +
                  (user?.supportStructure.positionalAllowance ?? 0) +
                  (user?.supportStructure.specialAllowance ?? 0) +
                  (user?.supportStructure.telAllowance ?? 0)
                }
              </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total deduction: </Typography>
                {
                  (user?.supportStructure.impactDeduction ?? 0) +
                   (user?.supportStructure.PIONMissionaryFund ?? 0) +
                   (user?.supportStructure.MUTDeduction ?? 0)
                }
              </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Net amount: </Typography>
                {
                  (user?.supportStructure.basic ?? 0) +
                  (user?.supportStructure.HRA ?? 0) +
                  (user?.supportStructure.spouseAllowance ?? 0) +
                  (user?.supportStructure.positionalAllowance ?? 0) +
                  (user?.supportStructure.specialAllowance ?? 0) +
                  (user?.supportStructure.telAllowance ?? 0) -
                  (
                    (user?.supportStructure.impactDeduction ?? 0) +
                    (user?.supportStructure.PIONMissionaryFund ?? 0) +
                    (user?.supportStructure.MUTDeduction ?? 0)
                  )
                }
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            {userKind ==='worker' && (user as unknown as IWorker)?.spouse && <Grid container spacing={3}>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First name: </Typography> {(user as unknown as IWorker)?.spouse?.firstName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last name: </Typography> {(user as unknown as IWorker)?.spouse?.lastName} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {(user as unknown as IWorker)?.spouse?.email} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {(user as unknown as IWorker)?.spouse?.phone} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of birth: </Typography> {(user as unknown as IWorker)?.spouse?.dateOfBirth?.format('dddd DD/MM/YYYY')} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Working: </Typography> {(user as unknown as IWorker)?.spouse?.working} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Occupation: </Typography> {(user as unknown as IWorker)?.spouse?.occupation} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Qualification: </Typography> {(user as unknown as IWorker)?.spouse?.qualification} </Grid>
              <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Known languages: </Typography> {(user as unknown as IWorker)?.spouse?.knownLanguages?.join(', ')} </Grid>
            </Grid>}
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            <Container>
              <br />
              <Grid container spacing={3}>
                {userKind ==='worker' && (user as unknown as IWorker)?.children.length > 0 && (user as unknown as IWorker)?.children.map((child) => (
                  <Grid key={child._id} item xs={12} lg={6}>
                    <Grid container spacing={3} sx={{ border: '1px dashed grey', borderRadius: 2, pb: 3 }}>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>firstName: </Typography> {child.firstName} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>lastName: </Typography> {child.lastName} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>dateOfBirth: </Typography> {child.dateOfBirth.format('dddd DD/MM/YYYY')} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>childSupport: </Typography> {child.childSupport} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>studying: </Typography> {child.studying} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>classOfStudy: </Typography> {child.classOfStudy} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>working: </Typography> {child.working} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>occupation: </Typography> {child.occupation} </Grid>
                      <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>qualification: </Typography> {child.qualification} </Grid>
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
