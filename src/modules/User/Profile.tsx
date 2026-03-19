/* eslint-disable max-len */
/* eslint-disable react/no-multi-comp */
import { Avatar, Box, Button, Card, CardContent, Container, Dialog, DialogContent, Divider, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkersServices from '../Workers/extras/WorkersServices';
import StaffServices from '../HR/extras/StaffServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Attachment as AttachmentIcon } from '@mui/icons-material';
import FileUploader from '../../components/FileUploader/FileUploader';
import { hasPermissions } from '../User/components/PermissionChecks';
import { MB } from '../../extras/CommonConfig';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import moment from 'moment';

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
  const navigate = useNavigate();

  const [adharAttachments, setAdharAttachments] = useState<FileObject[]>([]);
  const [voterAttachments, setVoterAttachments] = useState<FileObject[]>([]);
  const [eSignAttachments, setEsignAttachments] = useState<FileObject[]>([]);
  const [user, setUser] = useState<IWorker | Staff | null>(null);
  const { userId, userKind, tabNO } = useParams();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [viewAdharFile, setviewAdharFile] = useState(false);
  const [viewVoterIdFile, setViewVoterId] = useState(false);
  const [viewEsign, setViewSign] = useState(false);
  const [showLotImage, setShowLotImage] = useState<boolean>(false);
  const columns: GridColDef<DivisionHistory>[] = [
    {
      field: 'division',
      renderHeader: () => (<b>Division</b>),
      width: 200,
      renderCell: (props) => (
        <Link
          to={`/divisions/details/${props.row.division?._id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {props.row.division?.details?.name}
        </Link>
      ),
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'subDivision',
      renderHeader: () => (<b>Sub Division</b>),
      width: 200,
      valueGetter: (params) => params.row.subDivision?.name ?? null,
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'dateOfDivisionJoining',
      renderHeader: () => (<b>From</b>),
      width: 200,
      valueGetter: (params) => params.row.dateOfDivisionJoining?.format('DD/MM/YYYY'),
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'dateOfDivisionLeaving',
      renderHeader: () => (<b>To</b>),
      width: 200,
      valueGetter: (params) => params.row.dateOfDivisionLeaving?.format('DD/MM/YYYY'),
    },
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  useEffect(() => {
    if (tabNO == '2') {
      setCurrentTab(2);
    } else if (tabNO == '3') {
      setCurrentTab(3);
    }
  }, []);
  useEffect(() => {
    if (userId && userKind === 'staff') {
      StaffServices.getById(userId)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => { });
    } else if (userId && userKind === 'worker') {
      WorkersServices.getById(userId)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => { });
    }
  }, []);

  console.log(user?.officialDetails, 'user?.officialDetails');

  return (
    <CommonPageLayout
      title={`Profile of ${user?.basicDetails.firstName} ${user?.basicDetails.lastName}`}
      hidePageHeader={true}
    >
      <Dialog
        open={showLotImage}
        onClose={() => setShowLotImage(false)}
        fullWidth
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: 0,
        }}
      >
        <DialogContent>
          {user?.imageURL?.replace('uc', 'thumbnail') && (
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={user?.imageURL?.replace('uc', 'thumbnail')}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    padding: 0,
                    margin: 0,
                  }} />
              </TransformComponent>
            </TransformWrapper>
          )}
        </DialogContent>
      </Dialog>
      {/* <Grid container >
        <Grid item xs={12} md={1}>
          <Avatar
            sx={{ width: 80, height: 80, borderRadius: 1 }}
            src={`${user?.imageURL?.replace('uc', 'thumbnail')}`}
            alt={`${user?.basicDetails.firstName}`}
            onClick={() => {
              setShowLotImage(true);
            }}
          />
        </Grid>
        <Grid item xs={12} md={11}>
          <Typography variant="h4" component='span'>{`${user?.basicDetails.firstName} ${user?.basicDetails.lastName}`}
            <br /><Link
              to={`/divisions/details/${user?.division?._id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            ><Typography variant="body1" >{`${user?.division?.details?.name}`}

              </Typography></Link>
          </Typography>
        </Grid>
      </Grid> */}
      <br />
      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Card>
            <Box sx={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <Container>
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: '200%', height: '100%', objectFit: 'cover', borderRadius: 1, textAlign: 'center' }}
                    src={`${user?.imageURL?.replace('uc', 'thumbnail')}`}
                    alt={`${user?.basicDetails.firstName}`}
                    onClick={() => {
                      setShowLotImage(true);
                    } } />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" component='span' style={{ whiteSpace: 'nowrap' }}>
                    {`${user?.basicDetails.firstName}  `}
                    <Typography variant="h6" component='span' style={{ whiteSpace: 'nowrap', }}>{ user?.basicDetails.lastName}</Typography>
                    <Link
                      to={`/divisions/details/${user?.division?._id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <Typography variant="body1">{`${user?.supportDetails?.designation?.name}`}</Typography>
                      <Typography variant="body1">{`${user?.division?.details?.name}`}</Typography>
                    </Link>
                  </Typography>
                </Grid>
              </Container>
            </Box>


          </Card>
        </Grid>
        <Grid item xs={12} md={9}>

          {hasPermissions(['MANAGE_WORKER']) && (
            <Button
              sx={{ float: 'right' }}
              variant="contained"
              onClick={() => {
                if (user?.kind === 'worker') {
                  navigate(`/workers/edit/${user?._id}`);
                } else {
                  navigate(`/hr/edit/${user?._id}`);
                }
              }}
            >
          Edit
            </Button>
          )}


          <br />
          {/* <br /> */}
          <br />
          <Card>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                  <Tab sx={{ fontWeight: 'bold' }} label="Basic Details" {...a11yProps(0)} />
                  <Tab sx={{ fontWeight: 'bold' }} label="Official Details" {...a11yProps(1)} />
                  {userKind === 'worker' && (user as unknown as IWorker)?.spouse && <Tab label="Spouse Details" sx={{ fontWeight: 'bold' }} {...a11yProps(2)} />}
                  {userKind === 'worker' && (user as unknown as IWorker)?.children.length > 0 && <Tab label="Offsprings Details" sx={{ fontWeight: 'bold' }} {...a11yProps(3)} />}
                  <Tab label="Support Structure" sx={{ fontWeight: 'bold' }} {...a11yProps(userKind === 'worker' ? 4 : 2)} />
                </Tabs>
              </Box>
              <TabPanel value={currentTab} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>{userKind === 'staff' ? 'Staff Code' : 'Worker Code'}:</Typography> {userKind === 'staff' ? (user as Staff | null)?.staffCode : (user as IWorker | null)?.workerCode} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Organization:</Typography> {user?.basicDetails.organization} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Daughter Organization:</Typography> {user?.basicDetails.daughterOrganization} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First Name:</Typography> {user?.basicDetails.firstName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Middle Name:</Typography> {user?.basicDetails.middleName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last Name: </Typography> {user?.basicDetails.lastName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Birth: </Typography> {user?.basicDetails.dateOfBirth.format('DD/MM/YYYY')} </Grid>
                  <Grid item xs={12} lg={4}>
                    <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>
                    Age:
                    </Typography>
                    {((user as unknown as IWorker)?.basicDetails.dateOfBirth?.fromNow() || '').replace(' ago', '')}
                  </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Gender: </Typography> {user?.basicDetails.gender?.gender ?? 'Not Selected'} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Field: </Typography> {user?.basicDetails.field} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Marital Status: </Typography> {user?.basicDetails.martialStatus} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Spouse Of: </Typography> {`${user?.basicDetails.spouseOf?.basicDetails.firstName ?? 'Not selected'} ${user?.basicDetails.spouseOf?.basicDetails.middleName ?? ''} ${user?.basicDetails.spouseOf?.basicDetails.lastName ?? ''}`} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Highest Qualification: </Typography> {user?.basicDetails.highestQualification} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Religion: </Typography> {user?.basicDetails.religion?.religion ?? 'Not Selected'} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Mother Tongue: </Typography> {user?.basicDetails.motherTongue?.name} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Communication Language: </Typography> {user?.basicDetails.communicationLanguage?.name} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Known Languages: </Typography> {user?.basicDetails.knownLanguages?.map((lang) => lang.name).join(', ')} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {user?.basicDetails.email} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Alternate Email: </Typography> {user?.basicDetails?.email2} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {user?.basicDetails.phone} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Alternate Phone: </Typography> {user?.basicDetails.alternativePhone} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>PAN No: </Typography> {user?.basicDetails.PANNo} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Aadhaar: </Typography> {user?.basicDetails.aadhaar?.aadhaarNo}

                    <IconButton
                      onClick={() => {
                        setviewAdharFile(true);
                        setAdharAttachments(user?.basicDetails.aadhaar?.aadhaarFile ? [user.basicDetails.aadhaar.aadhaarFile] : []);
                      } }
                    >
                      <AttachmentIcon />
                    </IconButton>

                  </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Voter Id: </Typography> {user?.basicDetails.voterId?.voterIdNo}
                    <IconButton
                      onClick={() => {
                        setViewVoterId(true);
                        setVoterAttachments(user?.basicDetails.voterId?.voterIdFile ? [user.basicDetails.voterId.voterIdFile] : []);
                      } }
                    >
                      <AttachmentIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>License Number: </Typography> {user?.basicDetails.licenseNumber} </Grid>

                  <Grid item xs={12}> <Divider textAlign='left' sx={{ fontWeight: 600, fontSize: 20 }}>Permanent Address</Divider> </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building Name: </Typography> {user?.basicDetails.permanentAddress?.buildingName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.permanentAddress?.street} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.permanentAddress?.city} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.permanentAddress?.state} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.permanentAddress?.country} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.permanentAddress?.pincode} </Grid>
                  <Grid item xs={12}> <Divider textAlign='left' sx={{ fontWeight: 600, fontSize: 20 }}>Current Official Address</Divider> </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building Name: </Typography> {user?.basicDetails.currentOfficialAddress?.buildingName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.currentOfficialAddress?.street} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.currentOfficialAddress?.city} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.currentOfficialAddress?.state} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.currentOfficialAddress?.country} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.currentOfficialAddress?.pincode} </Grid>
                  <Grid item xs={12}> <Divider textAlign='left' sx={{ fontWeight: 600, fontSize: 20 }}>Residing Address</Divider> </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Building Name: </Typography> {user?.basicDetails.residingAddress?.buildingName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Street: </Typography> {user?.basicDetails.residingAddress?.street} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>City: </Typography> {user?.basicDetails.residingAddress?.city} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>State: </Typography> {user?.basicDetails.residingAddress?.state} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Country: </Typography> {user?.basicDetails.residingAddress?.country} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Pincode: </Typography> {user?.basicDetails.residingAddress?.pincode} </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Joining Organization:</Typography> {user?.officialDetails.dateOfJoining?.format(' DD/MM/YYYY')} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>No of years with the Organization:</Typography> {user?.officialDetails.status != 'Left' ? user?.officialDetails.dateOfJoining?.fromNow(true) : user?.officialDetails.dateOfLeaving?.from(user?.officialDetails.dateOfJoining, true)} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Status:</Typography> {user?.officialDetails.status} </Grid>
                  {user?.officialDetails.status == 'Left' && (
                    <>
                      <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Leaving Organization:</Typography> {user?.officialDetails.dateOfLeaving?.format('DD/MM/YYYY')} </Grid>
                      <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Reason for Deactivation:</Typography> {user?.officialDetails.reasonForDeactivation} </Grid>
                    </>
                  )}
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Remarks:</Typography> {user?.officialDetails.remarks} </Grid>

                  {userKind === 'worker' && (

                    <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Centers Started:</Typography> {user?.officialDetails.noOfChurches} </Grid>
                  )}

                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>E-Sign: </Typography>
                    <IconButton
                      onClick={() => {
                        setViewSign(true);
                        setEsignAttachments(user?.officialDetails.eSign ? [user.officialDetails.eSign] : []);
                      } }
                    >
                      <AttachmentIcon />
                    </IconButton>
                  </Grid>


                  {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Self Support:</Typography> {user?.officialDetails.selfSupport ? 'Yes' : 'No'} </Grid> */}

                  {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Division:</Typography> {user?.officialDetails.division?.details.name} </Grid> */}
                  {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Sub Division:</Typography> {user?.officialDetails.subDivision?.name} </Grid> */}
                  {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of leaving previous Division: </Typography> {user?.officialDetails.dateOfPreviousDivisionLeaving?.format('DD/MM/YYYY')} </Grid> */}
                  {/* <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of joining current Division:</Typography> {user?.officialDetails.divisionHistory.dateOfDivisionJoining?.format('DD/MM/YYYY')} </Grid> */}
                </Grid>
                <Container maxWidth='md'>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Divider textAlign="center">

                            <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600, fontSize: 20 }} gutterBottom>
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
                      sortModel={[
                        {
                          field: 'dateOfDivisionJoining',
                          sort: 'desc', // or 'desc' for descending order
                        },
                      ]}
                      style={{ height: '40vh', width: '100%', justifyContent: 'center' }} />
                  </Card>
                </Container>

              </TabPanel>

              <TabPanel value={currentTab} index={2}>
                {userKind === 'worker' && (user as unknown as IWorker)?.spouse && <Grid container spacing={3}>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Spouse Code: </Typography> {(user as unknown as IWorker)?.spouse?.spouseCode} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First Name: </Typography> {(user as unknown as IWorker)?.spouse?.firstName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last Name: </Typography> {(user as unknown as IWorker)?.spouse?.lastName} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {(user as unknown as IWorker)?.spouse?.email} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {(user as unknown as IWorker)?.spouse?.phone} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Date of Birth: </Typography> {(user as unknown as IWorker)?.spouse?.dateOfBirth?.format('DD/MM/YYYY')} </Grid>
                  <Grid item xs={12} lg={4}>
                    <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>
                    Profile Added On:
                    </Typography>
                    {((user as unknown as IWorker)?.spouse?.ProfileAddedOn && moment((user as unknown as IWorker)?.spouse?.ProfileAddedOn).isValid()) && moment((user as unknown as IWorker)?.spouse?.ProfileAddedOn).format('DD/MM/YYYY')}
                  </Grid>


                  <Grid item xs={12} lg={4}>
                    <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>
                    Age:
                    </Typography>
                    {((user as unknown as IWorker)?.spouse?.dateOfBirth?.fromNow() || '').replace(' ago', '')}
                  </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Working: </Typography> {(user as unknown as IWorker)?.spouse?.working ? 'Yes' : 'No'} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Widow Care: </Typography> {(user as unknown as IWorker)?.spouse?.widowCare ? 'Yes' : 'No'} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Aadhaar No: </Typography> {(user as unknown as IWorker)?.spouse?.aadharNo ?? 'N/A'} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Occupation: </Typography> {(user as unknown as IWorker)?.spouse?.occupation} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Qualification: </Typography> {(user as unknown as IWorker)?.spouse?.qualification} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Known Languages: </Typography> {(user as unknown as IWorker)?.spouse?.knownLanguages?.map((lang) => lang.name).join(', ')} </Grid>
                  <Grid item xs={12}> <Divider textAlign='left' sx={{ fontWeight: 600, fontSize: 20 }}>Welfare Scheme </Divider> </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>ID No: </Typography>  {(user as unknown as IWorker)?.spouse?.insurance?.impactNo} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Insurance Date: </Typography>{(user as unknown as IWorker)?.spouse?.insurance?.dojInsurance?.format('DD/MM/YYYY')} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Nominee: </Typography>  {(user as unknown as IWorker)?.spouse?.insurance?.nominee}</Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Relation with Nominee: </Typography>  {(user as unknown as IWorker)?.spouse?.insurance?.relation}</Grid>

                </Grid>}
              </TabPanel>

              <TabPanel value={currentTab} index={3}>
                <Container>
                  <br />
                  <Grid container spacing={5}>
                    {userKind === 'worker' && (user as unknown as IWorker)?.children.length > 0 && (user as unknown as IWorker)?.children.map((child) => (
                      <Grid key={child._id} item xs={12} lg={6} sx={{ width: '80px' }}>
                        <Grid container spacing={3} sx={{ border: '1px dashed grey', borderRadius: 2, pb: 3 }}>
                          <Grid item xs={12}>
                            <Avatar
                              sx={{
                                width: '100px',
                                height: '100px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                              }}
                              src={`${child?.childProfile?.replace('uc', 'thumbnail')}`}
                              alt={`${user?.basicDetails.firstName}`} />
                          </Grid>
                          <Grid item xs={12}><br /><Typography textAlign="center"> <span style={{ fontWeight: 600 }}> CHILD CODE :</span> {child.childCode}</Typography></Grid>
                          {/* <Grid key={child._id} item xs={12} lg={6}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Child Code: </Typography> {child.childCode} </Grid> */}
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>First Name: </Typography> {child?.firstName} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}> </Typography> </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Last Name: </Typography> {child?.lastName} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>DOB: </Typography> {child.dateOfBirth?.format('DD/MM/YYYY')} </Grid>
                          <Grid item xs={12} lg={4}><Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Age:</Typography>{(child.dateOfBirth?.fromNow() || '').replace(' ago', '')}</Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Gender: </Typography> {child?.gender} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Studying: </Typography> {child.studying ? 'Yes' : 'No'} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}></Typography></Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Class Of Studying: </Typography> {child.classOfStudy} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Working: </Typography> {child.working ? 'Yes' : 'No'} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Occupation: </Typography> {child.occupation} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Qualification: </Typography> {child.qualification} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Child Support Level: </Typography> </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}></Typography> {child.childSupport?.name} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Child Support Amount: </Typography> {child.childSupport?.amount} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Study Help: </Typography> {child.studyHelp} </Grid>

                          {/* <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Profile Added On: </Typography> {child?.profileAddedOn?.format('DD/MM/YYYY')} </Grid> */}
                          <Grid item xs={12} lg={4}>
                            <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>
                            Profile Added On:
                            </Typography>
                            {(child?.profileAddedOn && moment(child?.profileAddedOn).isValid()) && moment(child?.profileAddedOn).format('DD/MM/YYYY')}
                          </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Aadhaar NO : </Typography> {child.adharCardNo} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Phone: </Typography> {child.phoneNumber} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Email: </Typography> {child.emailId} </Grid>
                          <Grid key={child._id} item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Remark: </Typography> {child?.remark} </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </TabPanel>
              <TabPanel value={currentTab} index={userKind === 'worker' && user?.basicDetails.martialStatus === 'Married' ? (
                (user as unknown as IWorker)?.children.length > 0 ? 4 : 3
              ) : 2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Designation: </Typography> {user?.supportDetails?.designation?.name} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Other Designation: </Typography> {user?.supportDetails?.otherDesignation} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Department: </Typography> {user?.supportDetails?.department?.name} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total No. Of Years in Service: </Typography> {user?.supportDetails?.totalNoOfYearsInMinistry} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Type of family: </Typography> {user?.supportDetails?.typeOfFamily ?? 'Not specified'} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>With Church: </Typography> {user?.supportDetails?.withChurch ? 'Yes' : (user?.supportDetails?.withChurch === false ? 'No' : 'Not specified')} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Percentage of Self Support: </Typography> {user?.supportDetails?.percentageofSelfSupport ?? ''} </Grid>

                  <Grid item xs={12}><br /><Divider textAlign="left" sx={{ fontWeight: 600, fontSize: 20 }}>Support Structure</Divider></Grid>

                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Basic: </Typography> {user?.supportStructure?.basic} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>HRA: </Typography> {user?.supportStructure?.HRA} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Spouse Allowance: </Typography> {user?.supportStructure?.spouseAllowance} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Positional Allowance: </Typography> {user?.supportStructure?.positionalAllowance} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Special Allowance: </Typography> {user?.supportStructure?.specialAllowance} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Miscellaneous Deduction: </Typography> {user?.supportStructure?.impactDeduction} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Tel Allowance: </Typography> {user?.supportStructure?.telAllowance} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>PNRM Allowance: </Typography> {user?.supportStructure?.PIONMissionaryFund} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>WS Deduction: </Typography> {user?.supportStructure?.MUTDeduction} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total Amount: </Typography>
                    {(user?.supportStructure?.basic ?? 0) +
                    (user?.supportStructure?.HRA ?? 0) +
                    (user?.supportStructure?.spouseAllowance ?? 0) +
                    (user?.supportStructure?.positionalAllowance ?? 0) +
                    (user?.supportStructure?.specialAllowance ?? 0) +
                    (user?.supportStructure?.PIONMissionaryFund ?? 0) +
                    (user?.supportStructure?.telAllowance ?? 0)}
                  </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total Deduction: </Typography>
                    {(user?.supportStructure?.impactDeduction ?? 0) +
                    (user?.supportStructure?.MUTDeduction ?? 0)}
                  </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Net Amount: </Typography>
                    {(user?.supportStructure?.basic ?? 0) +
                    (user?.supportStructure?.HRA ?? 0) +
                    (user?.supportStructure?.spouseAllowance ?? 0) +
                    (user?.supportStructure?.positionalAllowance ?? 0) +
                    (user?.supportStructure?.specialAllowance ?? 0) +
                    (user?.supportStructure?.PIONMissionaryFund ?? 0) +
                    (user?.supportStructure?.telAllowance ?? 0) -
                    (
                      (user?.supportStructure?.impactDeduction ?? 0) +
                      (user?.supportStructure?.MUTDeduction ?? 0)
                    )}
                  </Grid>
                  <Grid item xs={12}> <Divider textAlign='left' sx={{ fontWeight: 600, fontSize: 20 }}>Welfare Scheme</Divider> </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>ID No: </Typography> {user?.insurance?.impactNo} </Grid>

                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Insurance Date: </Typography> {user?.insurance?.dojInsurance?.format('DD/MM/YYYY')} </Grid>

                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Nominee: </Typography> {user?.insurance?.nominee} </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Relation with nominee: </Typography> {user?.insurance?.relation} </Grid>
                  <Grid item xs={12}> <Divider textAlign='left' sx={{ fontWeight: 600, fontSize: 20 }}>Advance Support  </Divider> </Grid>
                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Total Amount: </Typography> {user?.supportDetails?.totalAmount} </Grid>

                  <Grid item xs={12} lg={4}> <Typography variant='body1' component='span' sx={{ fontWeight: 'bolder' }}>Monthly Deduction: </Typography> {user?.supportDetails?.monthlyDeduction} </Grid>

                </Grid>
              </TabPanel>
            </Box>


            <br />
          </Card>
        </Grid>

      </Grid><br /><FileUploader
        title="Attachments"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        open={viewAdharFile}
        action="view"
        onClose={() => setviewAdharFile(false)}
        getFiles={adharAttachments} />'
      <FileUploader
        title="Attachments"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        open={viewVoterIdFile}
        action="view"
        onClose={() => setViewVoterId(false)}
        getFiles={voterAttachments} />
      <FileUploader
        title="E-Signature"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        open={viewEsign}
        action="view"
        onClose={() => setViewSign(false)}
        getFiles={eSignAttachments} />

    </CommonPageLayout>
  );
};

export default Profile;
