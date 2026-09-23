<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardActions, CardContent, Container, Grid,
  Typography, Divider, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper, FormControlLabel, Checkbox,
  MenuItem } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import PermissionChecks from '../User/components/PermissionChecks';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import CloseIcon from '@mui/icons-material/Close';
import ApplicationLifeCycleStates from './extras/ApplicationLifCyclrStates';
import ApplicationNamesService from '../Settings/extras/ApplicationNamesService';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import SanctionLetter from './components/authLatter';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { AttachmentOutlined } from '@mui/icons-material';
import Section from './Section';
const dataaa = {
  approvalDate: '2025-03-27',
  coordinatorName: 'Jessen S. Philip',
  division: { name: 'Meerut Division' }, // Ensure you handle objects correctly
  purpose: '4 Wheel Vehicle',
  amount: '₹10,000.00',
  validity: '10/05/2025',
  remarks: 'Funds must be utilized as per policy guidelines.',
};
const ApplicationApprovalPage = () => {
  const { applicationID } = useParams();
  const navigate = useNavigate();
  const [reasonForDeactivation, setReasonForDeactivation] = useState<IReason | null | string>();
  const [reasonDialog, setReasonDialog] = useState(false);
  const [reasonRevertDialog, setReasonRevertDialog] = useState(false);
  const [reasonRevertHRDialog, setReasonRevertHRDialog] = useState(false);
  const [applications, setApplications] = useState<Application >();
  const [applicationsNames, setApplicationsNames] = useState<any >(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);
  const [view3, setView3] = useState(false);
  const [view4, setView4] = useState(false);
  const [data, setData] = useState<Application| null>();
  const [openPrintFr, setOpenPrintFr] = useState(false);
  const [resasonForRevert, setResonForRevert] = useState('');
  const [showFileUploader, setShowFileUploader] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [openFiles, setOpenFiles] = useState(false);
  const [fileKey, setFileKey] = useState('');
  const [openFilesEdit, setOpenFilesEdit] = useState(false);
  const [fileKeyEdit, setFileKeyEdit] = useState('');
  const [form1Signature, setForm1Signature] = useState(false);
  const [file, setFile] = useState([]);

  const handleEdit = () => {
    setEditData((applications as any)?.formData); // clone if needed
    setEditOpen(true);
  };
  const handleEditChange = (key: string, value: any, parent?: string) => {
    if (parent) {
      setEditData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [key]: value,
        },
      }));
    } else {
      setEditData((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    }
  };
  const handleUpdate = async () => {
    await ApplicationServices.formEdit(applicationID as string, editData);

    setEditOpen(false);
  };
  const formatLabel = (key: string) => {
    return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
  };
  useEffect(() => {
    if (!applicationID) {
      navigate('/applications');
      return;
    }

    ApplicationServices.getById(applicationID as string)
      .then((res) => {
        setApplications(res.data);
      })
      .catch((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'error',
        });
      });
  }, []);
  console.log(applications, 'applications');

  return (
    <CommonPageLayout title="Application Manages">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Grid>
              <Grid container>
                <Grid item>

                  <Typography variant="h5" component="h2" align='left'>
                    <span style={{ fontWeight: 600 }}> Name:</span>    {applications?.name}
                  </Typography>
                </Grid>
                <Grid item sx={{ ml: 'auto' }}>
                  <div style={{ display: 'flex' }}>

                    <Typography variant="body2" sx={{ ml: 'auto' }} >
                      {applications?.createdBy?.basicDetails?.firstName +' '+ applications?.createdBy?.basicDetails?.lastName}
                    </Typography>
                  </div>
                  {/* <br/> */}


                  <div style={{ display: 'flex' }}>
                    <Typography variant='caption' sx={{ ml: 'auto' }}>
                      { moment(applications?.createdAt).format('DD/MM/YYYY hh:mm A')}
                    </Typography>
                  </div>
                </Grid>


              </Grid>
            </Grid>
            <Divider/>
            <br/>
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Applied For: </span>  {applications?.appliedFor?? 'N/A'}
            </Typography>
            {applications?.workersName &&(

              <><br /><Typography variant="body1" component="h2" align='left'>
                <span style={{ fontWeight: 800 }}>Worker Name: </span>
                {(((applications?.workersName as any)?.basicDetails?.firstName ?? '') + ((applications?.workersName as any)?.basicDetails?.lastName ?? ''))}
              </Typography></>
            )}
            <br />
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Applicant Name: </span>  {applications?.applicantName?? 'N/A'}
            </Typography>
            <br />
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Requested Amount: </span>  {applications?.requestedAmount?? 'N/A'}
            </Typography>
            <br />
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Remark: </span>  {applications?.reason?? 'N/A'}
            </Typography>
            <br />
            {/* {applications?.status == String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT) &&( */}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" component="h2" align="left">
                <span style={{ fontWeight: 800 }}>Sanctioned Amount: </span>
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                disabled={applications?.status != String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT)}
                value={applications?.sanctionedAmount ?? ''}
                onChange={(e) => setApplications(applications ? { ...applications, sanctionedAmount: Number(e.target.value) } : applications)}
              />
            </Box>
            &nbsp;
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" component="h2" align="left">
                <span style={{ fontWeight: 800 }}> Enter Validity: </span>
              </Typography>
              <TextField
                sx={{ pl: 7 }}
                variant="outlined"
                size="small"
                disabled={applications?.status != String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT)}
                value={applications?.validityDate ?? ''}
                onChange={(e) => setApplications(applications ? { ...applications, validityDate: String(e.target.value) } : applications)}
              />
            </Box>
            &nbsp;
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" component="h2" align="left">
                <span style={{ fontWeight: 800 }}>President Remarks: </span>
              </Typography>
              <TextField
                sx={{ pl: 1 }}

                variant="outlined"
                size="small"
                disabled={applications?.status != String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT)}
                value={applications?.presidentRemark ?? ''}
                onChange={(e) => setApplications(applications ? { ...applications, presidentRemark: String(e.target.value) } : applications)}
              />
            </Box>
            {/* )} */}

            <br/>
            {applications?.reasonForDeactivation && (

              <Typography variant="body1" component="h2" align='left'>

                <span style={{ fontWeight: 'bold' }}>Reason for rejection:  </span> {applications?.reasonForDeactivation}
              </Typography>
            )}

            <br/>
            <Typography variant="h5" component="h2" align='left'>
                 &nbsp;
              {applications?.presidentSanction && (

                <Button component="span" variant="contained" onClick={()=>{
                  setData(applications as any);
                  setOpenPrintFr(true);
                  setTimeout(() => {
                    setOpenPrintFr(false);
                  }, 2000);
                }}>

              Print Auth Letter
                </Button>
              )}
              &nbsp;
              <Button component="span" variant="outlined" onClick={()=>setOpen(true)}>

                  View File
              </Button>
              &nbsp;
              <Button component="span" variant="outlined" onClick={()=>{
                if (applications?.name =='Education Support') {
                  setView(true);
                } else if (applications?.name =='Window/Widower help') {
                  setView2(true);
                } else if (applications?.name =='Marriage help') {
                  setView3(true);
                } else if (applications?.name =='Financial Assistance for medical treatment') {
                  setView4(true);
                }
              }}>

                  View Form
              </Button>
              &nbsp;
              {/* <Button variant="outlined" onClick={handleEdit}>
  Edit Form
              </Button> */}
              &nbsp;
              {Number(applications?.status) == ApplicationLifeCycleStates.REVERT_TO_DIVISION|| Number(applications?.status) == ApplicationLifeCycleStates.REVERT_TO_HR &&(

                <Grid item md={6} pt={2}>
                  <Button component="span" variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentOutlined />}>
                    Attachments
                  </Button>
                </Grid>
              )}
            </Typography>

          </CardContent>
          {Number(applications?.status) !== CommonLifeCycleStates.APPROVED && Number(applications?.status) !== CommonLifeCycleStates.REJECTED && (

            <CardActions>
              <PermissionChecks
                permissions={['MANAGE_APPLICATION']}
                granted={(
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        const snackbarId = enqueueSnackbar({
                          message: 'Approving...',
                          variant: 'info',
                        });
                        ApplicationServices.editApplication(applicationID as string, applications as Application)
                        .then((res) => {
                          ApplicationServices.approve(applicationID as string)
                          .then((res) => {
                            closeSnackbar(snackbarId);
                            enqueueSnackbar({
                              message: res.message,
                              variant: 'success',
                            });
                            navigate('/application/manage');
                          })

                          .catch((err) => {
                            closeSnackbar(snackbarId);
                            enqueueSnackbar({
                              message: err.message,
                              variant: 'error',
                            });
                          });
                          closeSnackbar(snackbarId);
                          enqueueSnackbar({
                            message: res.message,
                            variant: 'success',
                          });
                          // navigate('/application/manage');
                        });
                      }}
                    >
            Approve
                    </Button>

                    {Number(applications?.status) ==ApplicationLifeCycleStates.SENT_TO_PRESIDENT &&(
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                          setReasonRevertHRDialog(true);
                        }}
                      >
            Revert To Hr
                      </Button>

                    )}


                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 'auto' }}
                      onClick={() => {
                        setReasonDialog(true);
                      }}
                    >
            Reject
                    </Button>
                    {Number(applications?.status) ==ApplicationLifeCycleStates.CREATED &&(

                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                          setReasonRevertDialog(true);
                        }}
                      >
            Revert To Division
                      </Button>
                    )}
                  </>
                )}
              />

            </CardActions>
          )}
        </Card></Container>
      <FileUploader
        title="Attachments"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={open}
        action='view'
        onClose={() => setOpen(false)}
        // getFiles={TestServices.getBills}
        getFiles={applications?.attachment??[]}
      />
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Reason
            <Button
              variant="contained"
              onClick={() => {
                setReasonDialog(false);
              }}
              sx={{
                'position': 'absolute',
                'top': 8,
                'right': 8,
                'minWidth': 'auto',
                'padding': '0.1rem',
                'backgroundColor': 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            value={reasonForDeactivation}
            onChange={(e) => setReasonForDeactivation(e.target.value)}
            label="Reason for rejection"
            required
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button> */}

          <Button
            variant="contained"
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });

              ApplicationServices.reject(applicationID as string, reasonForDeactivation as string)
          .then((res) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: res.message,
              variant: 'success',
            });
            navigate('/application/manage');
          })
          .catch((err) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: err.message,
              variant: 'error',
            });
          });

              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
      Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={reasonRevertDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Reason For Revert
            <Button
              variant="contained"
              onClick={() => {
                setReasonRevertDialog(false);
              }}
              sx={{
                'position': 'absolute',
                'top': 8,
                'right': 8,
                'minWidth': 'auto',
                'padding': '0.1rem',
                'backgroundColor': 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            value={reasonForDeactivation}
            onChange={(e) => setResonForRevert(e.target.value)}
            label="Reason for Revert"
            required
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button> */}

          <Button
            variant="contained"
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });

              navigate('/application/manage');
              ApplicationServices.revertToDivision(applicationID as string, resasonForRevert as string)
          .then((res) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: res.message,
              variant: 'success',
            });
          })
          .catch((err) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: err.message,
              variant: 'error',
            });
          });

              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
      Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={reasonRevertHRDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Reason For Revert
            <Button
              variant="contained"
              onClick={() => {
                setReasonRevertHRDialog(false);
              }}
              sx={{
                'position': 'absolute',
                'top': 8,
                'right': 8,
                'minWidth': 'auto',
                'padding': '0.1rem',
                'backgroundColor': 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            value={reasonForDeactivation}
            onChange={(e) => setResonForRevert(e.target.value)}
            label="Reason for Revert"
            required
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button> */}

          <Button
            variant="contained"
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });

              navigate('/application/manage');
              ApplicationServices.revertToHr(applicationID as string, resasonForRevert as string)
          .then((res) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: res.message,
              variant: 'success',
            });
          })
          .catch((err) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: err.message,
              variant: 'error',
            });
          });

              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
      Submit
          </Button>
        </DialogActions>
      </Dialog>
      <FileUploader
        title="Attachments"
        action='add'
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={applications?.attachment?? []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
                  .then((res) => {
                    setApplications((applications:any) => ({
                      ...applications,
                      attachment: [...applications.attachment, res.data],
                    }));
                    return res;
                  });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          setApplications((applications:any) => ({
            ...applications,
            attachment: applications.attachment.map((file: { _id: string }) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setApplications((applications:any) => ({
            ...applications,
            attachment: applications.attachment.filter((file: { _id: string }) => file._id !== fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <Dialog open={Boolean(data)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Sanction Letter</DialogTitle>
        <DialogContent>
          <Container>
  Download the SanctionLetter
            <br />
            {data && (
              <BlobProvider
                document={<SanctionLetter data={data} />}
              >
                {({ loading, url }) =>
                  loading || openPrintFr ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download="SanctionLetter.pdf"
                      style={{ color: 'blue' }}
                    >
            SanctionLetter.pdf
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setView(false);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Edit Form</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            {Object.entries(editData).map(([key, value]) => {
              const isFileArray =
      Array.isArray(value) &&
      value.length >= 0 &&
      (value[0]?.downloadURL || value.length === 0);

              if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return (
                  <Grid item xs={12} key={key}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                      {formatLabel(key)}
                    </Typography>

                    <Grid container spacing={2}>
                      {Object.entries(value).map(([subKey, subValue]) => {
                        const isSubFileArray =
                Array.isArray(subValue) &&
                (subValue[0]?.downloadURL || subValue.length === 0);

                        return (
                          <React.Fragment key={subKey}>

                            {/* Label */}
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography>{formatLabel(subKey)}</Typography>
                            </Grid>

                            {/* Value */}
                            <Grid item xs={2}>
                              {isSubFileArray ? (
                                <Box display="flex" flexDirection="column" gap={1}>

                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                      setFileKeyEdit(subKey);
                                      setOpenFilesEdit(true);
                                    }}
                                  >
                          Manage Files ({subValue.length})
                                  </Button>

                                </Box>
                              ) : (
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={subValue as any || ''}
                                  onChange={(e) =>
                                    handleEditChange(subKey, e.target.value, key)
                                  }
                                />
                              )}
                            </Grid>

                          </React.Fragment>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              }

              return (
                <React.Fragment key={key}>

                  {/* Label */}
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{formatLabel(key)}</Typography>
                  </Grid>

                  {/* Value */}
                  <Grid item xs={2}>
                    {isFileArray ? (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setFileKeyEdit(key);
                          setOpenFilesEdit(true);
                        }}
                      >
              Manage Files ({value.length})
                      </Button>
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        value={value as any || ''}
                        onChange={(e) => handleEditChange(key, e.target.value)}
                      />
                    )}
                  </Grid>

                </React.Fragment>
              );
            })}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
      Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={view} onClose={() => setView(false)} maxWidth="lg" fullWidth>
        <DialogTitle> Form Data - <b>{applications?.name} </b> </DialogTitle>
        <DialogContent>
          <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
            <Box maxWidth="900px" mx="auto" px={2}>

              {/* Header */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography variant="h6">Application for Educational Support</Typography>
              </Paper>

              {/* Basic */}
              <Section title="Basic Information">
                <Grid item xs={6}>
                  <TextField fullWidth label="Division" required value={(applications as any)?.formData?.division} name="division" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Scholarship Help No" value={(applications as any)?.formData?.scholarshipNo} name="scholarshipNo" />
                </Grid>
              </Section>

              {/* Personal */}
              <Section title="Personal Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Name of Applicant" value={(applications as any)?.formData?.name} name="name" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" value={(applications as any)?.formData?.workerCode} name="workerCode" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" value={(applications as any)?.formData?.schemeId} name="schemeId" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Father’s Name" value={(applications as any)?.formData?.fatherName} name="fatherName" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.joiningDate} name="joiningDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Help Requesting For" value={(applications as any)?.formData?.helpFor} name="helpFor" />
                </Grid>
              </Section>

              {/* Ministry */}
              <Section title="Ministry Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Present Ministry" value={(applications as any)?.formData?.ministry} name="ministry" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Ministry" value={(applications as any)?.formData?.place} name="place" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile No" value={(applications as any)?.formData?.mobile} name="mobile" />
                </Grid>
              </Section>

              {/* Course */}
              <Section title="Course Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="College/University Name" value={(applications as any)?.formData?.college} name="college" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Course Name" value={(applications as any)?.formData?.course} name="course" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Course Duration" value={(applications as any)?.formData?.duration} name="duration" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Course Type (Full/Part/Distance)" value={(applications as any)?.formData?.courseType} name="courseType" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Class Start Date" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.startDate} name="startDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place" value={(applications as any)?.formData?.collegePlace} name="collegePlace" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="College Email ID" value={(applications as any)?.formData?.collegeEmail} name="collegeEmail" />
                </Grid>
              </Section>

              {/* Financial */}
              <Section title="Financial Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Bills Attached" value={(applications as any)?.formData?.bills} name="bills" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Total Fee (Rs)" value={(applications as any)?.formData?.totalFee} name="totalFee" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Yearly Fee (Rs)" value={(applications as any)?.formData?.yearlyFee} name="yearlyFee" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Hostel Fee (Rs)" value={(applications as any)?.formData?.hostelFee} name="hostelFee" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Other Expenses (Rs)" value={(applications as any)?.formData?.other} name="other" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Total Expenses (Rs)" value={(applications as any)?.formData?.total} name="total" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" value={(applications as any)?.formData?.requested} name="requested" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Funds Received" value={(applications as any)?.formData?.received} name="received" />
                </Grid>
              </Section>

              {/* Recommendations */}
              <Section title="Recommendations">
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Area Supervisor Comments" value={(applications as any)?.formData?.supervisor} name="supervisor" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Name & Signature" value={(applications as any)?.formData?.supervisorSign} name="supervisorSign" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" value={(applications as any)?.formData?.coordinator} name="coordinator" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Signature with Date" value={(applications as any)?.formData?.signDate} name="signDate" />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => {
                    setForm1Signature(true), setFile((applications as any).formData?.SupervisorSignature);
                  }} startIcon={<AttachmentOutlined />}>
                    Signature
                  </Button>
                </Grid>
              </Section>

              {/* Bank */}
              <Section title="Bank Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Bank Name" value={(applications as any)?.formData?.bankName} name="bankName" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Account Holder Name" value={(applications as any)?.formData?.accountName} name="accountName" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Account Number" value={(applications as any)?.formData?.accountNumber} name="accountNumber" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Branch Name & Code" value={(applications as any)?.formData?.branch} name="branch" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="IFS Code" value={(applications as any)?.formData?.ifsc} name="ifsc" />
                </Grid>
              </Section>

              {/* Declaration */}
              <Section title="Declaration">
                <Typography>
        I hereby declare that the information provided is true and correct.
                </Typography>

                {/* <Grid item xs={4}>
                  <TextField fullWidth label="Declaration" name="Declaration" />
                </Grid> */}

                <Grid item xs={6}>
                  <TextField fullWidth label="Name" value={(applications as any)?.formData?.declName} name="declName" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.declDate} name="declDate" />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => {
                    setForm1Signature(true), setFile((applications as any).formData?.signatureOfStudent);
                  }}
                  startIcon={<AttachmentOutlined />}>
                    Signature Of Student
                  </Button>
                </Grid>
              </Section>

              {/* Office */}
              <Section title="Office Use Only">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Application Received On" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.receivedDate} name="receivedDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" value={(applications as any)?.formData?.sanctioned} name="sanctioned" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date of Fund Release" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.releaseDate} name="releaseDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date Applicant Informed" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.informedDate} name="informedDate" />
                </Grid>

                <Grid item md={6}>
                  <Button variant="contained" onClick={() => {
                    setForm1Signature(true), setFile((applications as any).formData?.DealingPersonSignature);
                  }} startIcon={<AttachmentOutlined />}>
                    Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => {
                    setForm1Signature(true), setFile((applications as any).formData?.AuthorizedPersonSignature);
                  }} startIcon={<AttachmentOutlined />}>
                    Authorized Person Signature
                  </Button>
                </Grid>
              </Section>

            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setView(false);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={view2} onClose={() => setView(false)} maxWidth="lg" fullWidth>
        <DialogTitle> Form Data - <b>{applications?.name} </b> </DialogTitle>
        <DialogContent>
          <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
            <Box maxWidth="900px" mx="auto" px={2}>

              {/* Header */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography>Widow / Widower Help Application</Typography>
              </Paper>

              {/* Basic */}
              <Section title="Basic Information">
                <Grid item xs={12}>
                  <TextField fullWidth label="Division" required value={(applications as any)?.formData?.division} name="division" />
                </Grid>
              </Section>

              {/* Personal */}
              <Section title="Personal Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Applicant Name" value={(applications as any)?.formData?.name} name="name" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" value={(applications as any)?.formData?.workerCode} name="workerCode" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" value={(applications as any)?.formData?.schemeId} name="schemeId" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.joiningDate} name="joiningDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Spouse/Husband Name" value={(applications as any)?.formData?.spouse} name="spouse" />
                </Grid>
              </Section>

              {/* Children Table */}
              <Section title="Children Details">
                {[0, 1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <Grid item xs={3}>
                      <TextField fullWidth label="Name" value={(applications as any)?.formData?.[`childName${i}`]} name={`childName${i}`} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Age" value={(applications as any)?.formData?.[`childAge${i}`]} name={`childAge${i}`} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Studying" value={(applications as any)?.formData?.[`childStudy${i}`]} name={`childStudy${i}`} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Married" value={(applications as any)?.formData?.[`childMarried${i}`]} name={`childMarried${i}`} />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField fullWidth label="Working" value={(applications as any)?.formData?.[`childWork${i}`]} name={`childWork${i}`} />
                    </Grid>
                  </React.Fragment>
                ))}
              </Section>

              {/* Ministry */}
              <Section title="Ministry Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Ministry at time of death" value={(applications as any)?.formData?.ministry} name="ministry" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Place of Ministry" value={(applications as any)?.formData?.place} name="place" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Reason for Death" value={(applications as any)?.formData?.reason} name="reason" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date of Death" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.deathDate} name="deathDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Death (Hospital/Home)" value={(applications as any)?.formData?.deathPlace} name="deathPlace" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Doctor Name" value={(applications as any)?.formData?.doctor} name="doctor" />
                </Grid>
              </Section>

              {/* Family */}
              <Section title="Family Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Spouse Qualification" value={(applications as any)?.formData?.qualification} name="qualification" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Income Details (Rs)" value={(applications as any)?.formData?.income} name="income" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" value={(applications as any)?.formData?.requested} name="requested" />
                </Grid>

                {/* Living */}
                <Grid item xs={12}>
                  <Typography>Living Arrangement</Typography>
                  <FormControlLabel control={<Checkbox name="rented" />} label="Rented House" />
                  <FormControlLabel control={<Checkbox name="own" />} label="Own House" />
                  <FormControlLabel control={<Checkbox name="withChildren" />} label="With Children" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Other (Specify)" value={(applications as any)?.formData?.otherLiving} name="otherLiving" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Documents Attached" value={(applications as any)?.formData?.documents} name="documents" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Death Certificate" value={(applications as any)?.formData?.deathCertificate} name="deathCertificate" />
                </Grid>
              </Section>

              {/* Recommendations */}
              <Section title="Recommendations">
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Supervisor Comments" value={(applications as any)?.formData?.supervisor} name="supervisor" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Supervisor Name & Signature" value={(applications as any)?.formData?.supervisorSign} name="supervisorSign" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" value={(applications as any)?.formData?.coordinator} name="coordinator" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Recommended Amount" value={(applications as any)?.formData?.recommend} name="recommend" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Signature with Date" value={(applications as any)?.formData?.signDate} name="signDate" />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.SupervisorSignature))} startIcon={<AttachmentOutlined />}>
                         Signature
                  </Button>
                </Grid>
              </Section>

              {/* Office */}
              <Section title="Office Use Only">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Application Received On" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.receivedDate} name="receivedDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" value={(applications as any)?.formData?.sanctioned} name="sanctioned" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Fund Release Date" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.releaseDate} name="releaseDate" />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Applicant Informed Date" InputLabelProps={{ shrink: true }} value={(applications as any)?.formData?.informedDate} name="informedDate" />
                </Grid>


                <Grid item md={6}>
                  <Button variant="contained" onClick={() => {
                    setForm1Signature(true), setFile((applications as any)?.formData?.DealingPersonSignature);
                  }} startIcon={<AttachmentOutlined />}>
                         Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => {
                    setForm1Signature(true), setFile((applications as any)?.formData?.AuthorizedPersonSignature);
                  }} startIcon={<AttachmentOutlined />}>
                         Authorized Person Signature
                  </Button>
                </Grid>

              </Section>

              {/* <Button variant="contained" fullWidth size="large">
               Submit
                   </Button> */}

            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setView2(false);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={view3} onClose={() => setView3(false)} maxWidth="lg" fullWidth>
        <DialogTitle> Form Data - <b>{applications?.name} </b> </DialogTitle>
        <DialogContent>
          <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
            <Box maxWidth="900px" mx="auto" px={2}>

              {/* Header */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography>Marriage Help Application</Typography>
              </Paper>

              {/* Basic */}
              <Section title="Basic Information">
                <Grid item xs={6}>
                  <TextField fullWidth label="Division" name="division" required value={(applications as any)?.formData?.division} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Marriage Aid No" name="aidNo" value={(applications as any)?.formData?.aidNo} />
                </Grid>

                <Grid item xs={6}>
                  <TextField select fullWidth label="For" name="forWhom" value={(applications as any)?.formData?.forWhom}>
                    <MenuItem value="self">Self</MenuItem>
                    <MenuItem value="son">Son</MenuItem>
                    <MenuItem value="daughter">Daughter</MenuItem>
                  </TextField>
                </Grid>
              </Section>

              {/* Personal */}
              <Section title="Personal Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Applicant Name" name="name" value={(applications as any)?.formData?.name} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" name="workerCode" value={(applications as any)?.formData?.workerCode} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" name="schemeId" value={(applications as any)?.formData?.schemeId} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date" InputLabelProps={{ shrink: true }} name="joiningDate" value={(applications as any)?.formData?.joiningDate} />
                </Grid>
              </Section>

              {/* Ministry */}
              <Section title="Ministry Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Ministry Details" name="ministryDetails" value={(applications as any)?.formData?.ministryDetails} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Present Ministry" name="ministry" value={(applications as any)?.formData?.ministry} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Ministry" name="place" value={(applications as any)?.formData?.place} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile Number" name="mobile" value={(applications as any)?.formData?.mobile} />
                </Grid>
              </Section>

              {/* Marriage */}
              <Section title="Marriage Details">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Marriage Date" InputLabelProps={{ shrink: true }} name="marriageDate" value={(applications as any)?.formData?.marriageDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Marriage Solemnised By" name="solemnisedBy" value={(applications as any)?.formData?.solemnisedBy} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Place & Church" name="church" value={(applications as any)?.formData?.church} />
                </Grid>
              </Section>

              {/* Documents */}
              <Section title="Documents Attached">
                <Grid item xs={4}>
                  <TextField fullWidth label="Invitation Card" name="invitation" value={(applications as any)?.formData?.invitation} />
                </Grid>

                <Grid item xs={4}>
                  <TextField fullWidth label="Marriage Photo" name="photo" value={(applications as any)?.formData?.photo} />
                </Grid>

                <Grid item xs={4}>
                  <TextField fullWidth label="Marriage Certificate" name="certificate" value={(applications as any)?.formData?.certificate} />
                </Grid>
              </Section>

              {/* Financial */}
              <Section title="Financial Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Total Expenses (Rs)" name="total" value={(applications as any)?.formData?.total} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" name="requested" value={(applications as any)?.formData?.requested} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Funds Received (Church/Family/Loan)" name="received" value={(applications as any)?.formData?.received} />
                </Grid>
              </Section>

              {/* Recommendations */}
              <Section title="Recommendations">
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Supervisor Comments" name="supervisor" value={(applications as any)?.formData?.supervisor} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Supervisor Name & Signature" name="supervisorSign" value={(applications as any)?.formData?.supervisorSign} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" value={(applications as any)?.formData?.coordinator} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Signature with Date" name="signDate" value={(applications as any)?.formData?.signDate} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.SupervisorSignature))} startIcon={<AttachmentOutlined />}>
                           Supervisor Signature
                  </Button>
                </Grid>
              </Section>

              {/* Declaration */}
              <Section title="Declaration">
                <Typography>
                    I hereby declare that the information provided is true and correct.
                </Typography>

                {/* <Grid item xs={4}>
                          <TextField fullWidth label="Signature" name="signature"  />
                        </Grid> */}

                <Grid item xs={6}>
                  <TextField fullWidth label="Name" name="declName" value={(applications as any)?.formData?.declName} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date" InputLabelProps={{ shrink: true }} name="declDate" value={(applications as any)?.formData?.declDate} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.signature))} startIcon={<AttachmentOutlined />}>
                            Signature
                  </Button>
                </Grid>
              </Section>

              {/* Office */}
              <Section title="Office Use Only">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Application Received On" InputLabelProps={{ shrink: true }} name="receivedDate" value={(applications as any)?.formData?.receivedDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" name="sanctioned" value={(applications as any)?.formData?.sanctioned} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Fund Release Date" InputLabelProps={{ shrink: true }} name="releaseDate" value={(applications as any)?.formData?.releaseDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Applicant Informed Date" InputLabelProps={{ shrink: true }} name="informedDate" value={(applications as any)?.formData?.informedDate} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.DealingPersonSignature))} startIcon={<AttachmentOutlined />}>
                            Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.AuthorizedPersonSignature))} startIcon={<AttachmentOutlined />}>
                            Authorized Person Signature
                  </Button>
                </Grid>
              </Section>


            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setView3(false);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={view4} onClose={() => setView4(false)} maxWidth="lg" fullWidth>
        <DialogTitle> Form Data - <b>{applications?.name} </b> </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 4 }}>
            <Paper sx={{ p: 4 }}>

              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography>Financial Assistance for medical treatment</Typography>
              </Paper>
              <Grid container spacing={2}>

                {/* Division */}
                <Grid item xs={6}>
                  <TextField fullWidth label="Division" name="division" value={(applications as any)?.formData?.division} />
                </Grid>

                {/* Ailment */}
                <Grid item xs={3}>
                  <TextField fullWidth label="Ailment No" name="ailmentNo" value={(applications as any)?.formData?.ailmentNo} />
                </Grid>

                <Grid item xs={3}>
                  <TextField select fullWidth label="For" name="ailmentType" value={(applications as any)?.formData?.ailmentType}>
                    <MenuItem value="self">Self</MenuItem>
                    <MenuItem value="spouse">Spouse</MenuItem>
                    <MenuItem value="children">Children</MenuItem>
                  </TextField>
                </Grid>

                {/* PERSONAL DETAILS */}
                <Grid item xs={12}>
                  <Typography variant="h6">Personal Details</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Name of Applicant" name="name" value={(applications as any)?.formData?.name} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" name="workerCode" value={(applications as any)?.formData?.workerCode} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" name="schemeId" value={(applications as any)?.formData?.schemeId} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date" InputLabelProps={{ shrink: true }} name="joiningDate" value={(applications as any)?.formData?.joiningDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Name of Spouse" name="spouse" value={(applications as any)?.formData?.spouse} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Number of Children" name="children" value={(applications as any)?.formData?.children} />
                </Grid>

                {/* MINISTRY */}
                <Grid item xs={12}>
                  <Typography variant="h6">Ministry Details</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Present Ministry" name="ministry" value={(applications as any)?.formData?.ministry} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Ministry" name="place" value={(applications as any)?.formData?.place} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile Number" name="mobile" value={(applications as any)?.formData?.mobile} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Email ID" name="email" value={(applications as any)?.formData?.email} />
                </Grid>

                {/* MEDICAL */}
                <Grid item xs={12}>
                  <Typography variant="h6">Medical Details</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Details of Sickness" name="sickness" value={(applications as any)?.formData?.sickness} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date Treatment Started" InputLabelProps={{ shrink: true }} name="treatmentDate" value={(applications as any)?.formData?.treatmentDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Hospital Name" name="hospital" value={(applications as any)?.formData?.hospital} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Doctor Name" name="doctor" value={(applications as any)?.formData?.doctor} />
                </Grid>

                {/* FINANCIAL */}
                <Grid item xs={12}>
                  <Typography variant="h6">Financial Details</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Bills Attached" name="bills" value={(applications as any)?.formData?.bills} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Doctor Fee (Rs)" name="doctorFee" value={(applications as any)?.formData?.doctorFee} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Hospital Charges (Rs)" name="hospitalCharges" value={(applications as any)?.formData?.hospitalCharges} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Investigations (Rs)" name="investigation" value={(applications as any)?.formData?.investigation} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Medicines (Rs)" name="medicines" value={(applications as any)?.formData?.medicines} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Other Expenses (Rs)" name="other" value={(applications as any)?.formData?.other} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Total Expenses (Rs)" name="total" value={(applications as any)?.formData?.total} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" name="requested" value={(applications as any)?.formData?.requested} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Funds Received" name="received" value={(applications as any)?.formData?.received} />
                </Grid>

                {/* RECOMMENDATION */}
                <Grid item xs={12}>
                  <Typography variant="h6">Recommendations</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Supervisor Comments" name="supervisor" value={(applications as any)?.formData?.supervisor} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Name & Signature" name="supervisorSign" value={(applications as any)?.formData?.supervisorSign} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" value={(applications as any)?.formData?.coordinator} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Recommendation Amount (Rs)" name="recommend" value={(applications as any)?.formData?.recommend} />
                </Grid>

                {/* <Grid item xs={3}>
                         <TextField fullWidth label="Signature" name="signature"  />
                       </Grid> */}

                <Grid item xs={3}>
                  <TextField type="date" fullWidth label="Date" InputLabelProps={{ shrink: true }} name="date" value={(applications as any)?.formData?.date} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.signature))} startIcon={<AttachmentOutlined />}>
                            Signature
                  </Button>
                </Grid>
                {/* OFFICE */}
                <Grid item xs={12}>
                  <Typography variant="h6">Office Use Only</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Application Received On" InputLabelProps={{ shrink: true }} name="receivedDate" value={(applications as any)?.formData?.receivedDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" name="sanctioned" value={(applications as any)?.formData?.sanctioned} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Fund Release Date" InputLabelProps={{ shrink: true }} name="releaseDate" value={(applications as any)?.formData?.releaseDate} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Applicant Informed Date" InputLabelProps={{ shrink: true }} name="informedDate" value={(applications as any)?.formData?.informedDate} />
                </Grid>

                <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.DealingPersonSignature))} startIcon={<AttachmentOutlined />}>
                            Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => (setForm1Signature(true), setFile((applications as any)?.formData?.AuthorizedPersonSignature))} startIcon={<AttachmentOutlined />}>
                            Authorized Person Signature
                  </Button>
                </Grid>

                {/* Submit */}


              </Grid>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setView4(false);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <FileUploader
        title="Signature"
        action="add"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        open={form1Signature}
        onClose={() => setForm1Signature(false)}

        getFiles={file || []}

        // uploadFile={(file, onProgress) =>
        //   FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
        //     .then((res) => {
        //       setForms((prev: any) => ({
        //         ...prev,
        //         SupervisorSignature: [...(prev.SupervisorSignature || []), res.data],
        //       }));
        //       return res;
        //     })
        // }

        // renameFile={(fileId, newName) => {
        //   setFormData((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).map((file: any) =>
        //       file._id === fileId ? { ...file, filename: newName } : file
        //     ),
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}

        // deleteFile={(fileId) => {
        //   setForms((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).filter(
        //       (file: any) => file._id !== fileId,
        //     ),
        //   }));
        //   return FileUploaderServices.deleteFile(fileId);
        // }}
      />
      <FileUploader
        title="Attachmentss"
        action="add"
        open={openFilesEdit}
        onClose={() => setOpenFilesEdit(false)}
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}

        getFiles={editData?.[fileKeyEdit] || []}

        uploadFile={(file, onProgress) =>
          FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
      .then((res) => {
        setEditData((prev: any) => ({
          ...prev,
          [fileKeyEdit]: [...(prev[fileKeyEdit] || []), res.data],
        }));
        return res;
      })
        }

        renameFile={(fileId, newName) => {
          setEditData((prev: any) => ({
            ...prev,
            [fileKeyEdit]: (prev[fileKeyEdit] || []).map((file: any) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));

          return FileUploaderServices.renameFile(fileId, newName);
        }}

        deleteFile={(fileId) => {
          setEditData((prev: any) => ({
            ...prev,
            [fileKeyEdit]: (prev[fileKeyEdit] || []).filter(
              (file: any) => file._id !== fileId,
            ),
          }));

          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Attachments"
        action="view"
        open={openFiles}
        onClose={() => setOpenFiles(false)}
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        getFiles={(applications as any)?.formData?.[fileKey] || []}
      />
    </CommonPageLayout>
  );
};

export default ApplicationApprovalPage;
=======
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography, Divider, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import PermissionChecks from '../User/components/PermissionChecks';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import CloseIcon from '@mui/icons-material/Close';
import ApplicationLifeCycleStates from './extras/ApplicationLifCyclrStates';
import ApplicationNamesService from '../Settings/extras/ApplicationNamesService';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import SanctionLetter from './components/authLatter';
const dataaa = {
  approvalDate: '2025-03-27',
  coordinatorName: 'Jessen S. Philip',
  division: { name: 'Meerut Division' }, // Ensure you handle objects correctly
  purpose: '4 Wheel Vehicle',
  amount: '₹10,000.00',
  validity: '10/05/2025',
  remarks: 'Funds must be utilized as per policy guidelines.',
};
const ApplicationApprovalPage = () => {
  const { applicationID } = useParams();
  const navigate = useNavigate();
  const [reasonForDeactivation, setReasonForDeactivation] = useState<IReason | null | string>();
  const [reasonDialog, setReasonDialog] = useState(false);
  const [applications, setApplications] = useState<Application >();
  const [applicationsNames, setApplicationsNames] = useState<any >(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Application| null>();
  const [openPrintFr, setOpenPrintFr] = useState(false);

  useEffect(() => {
    if (!applicationID) {
      navigate('/applications');
      return;
    }

    ApplicationServices.getById(applicationID as string)
      .then((res) => {
        setApplications(res.data);
      })
      .catch((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'error',
        });
      });
  }, []);
  console.log(applications, 'applications');

  return (
    <CommonPageLayout title="Application Manages">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Grid>
              <Grid container>
                <Grid item>

                  <Typography variant="h5" component="h2" align='left'>
                    <span style={{ fontWeight: 600 }}> Name:</span>    {applications?.name}
                  </Typography>
                </Grid>
                <Grid item sx={{ ml: 'auto' }}>
                  <div style={{ display: 'flex' }}>

                    <Typography variant="body2" sx={{ ml: 'auto' }} >
                      {applications?.createdBy?.basicDetails?.firstName +' '+ applications?.createdBy?.basicDetails?.lastName}
                    </Typography>
                  </div>
                  {/* <br/> */}


                  <div style={{ display: 'flex' }}>
                    <Typography variant='caption' sx={{ ml: 'auto' }}>
                      { moment(applications?.createdAt).format('DD/MM/YYYY hh:mm A')}
                    </Typography>
                  </div>
                </Grid>


              </Grid>
            </Grid>
            <Divider/>
            <br/>
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Applied For: </span>  {applications?.appliedFor?? 'N/A'}
            </Typography>
            {applications?.workersName &&(

              <><br /><Typography variant="body1" component="h2" align='left'>
                <span style={{ fontWeight: 800 }}>Worker Name: </span>
                {(((applications?.workersName as any)?.basicDetails?.firstName ?? '') + ((applications?.workersName as any)?.basicDetails?.lastName ?? ''))}
              </Typography></>
            )}
            <br />
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Applicant Name: </span>  {applications?.applicantName?? 'N/A'}
            </Typography>
            <br />
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Requested Amount: </span>  {applications?.requestedAmount?? 'N/A'}
            </Typography>
            <br />
            <Typography variant="body1" component="h2" align='left'>
              <span style={{ fontWeight: 800 }}>Remark: </span>  {applications?.reason?? 'N/A'}
            </Typography>
            <br />
            {/* {applications?.status == String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT) &&( */}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" component="h2" align="left">
                <span style={{ fontWeight: 800 }}>Sanctioned Amount: </span>
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                disabled={applications?.status != String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT)}
                value={applications?.sanctionedAmount ?? ''}
                onChange={(e) => setApplications(applications ? { ...applications, sanctionedAmount: Number(e.target.value) } : applications)}
              />
            </Box>
            &nbsp;
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" component="h2" align="left">
                <span style={{ fontWeight: 800 }}> Enter Validity: </span>
              </Typography>
              <TextField
                sx={{ pl: 7 }}
                variant="outlined"
                size="small"
                disabled={applications?.status != String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT)}
                value={applications?.validityDate ?? ''}
                onChange={(e) => setApplications(applications ? { ...applications, validityDate: String(e.target.value) } : applications)}
              />
            </Box>
            &nbsp;
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" component="h2" align="left">
                <span style={{ fontWeight: 800 }}>President Remarks: </span>
              </Typography>
              <TextField
                sx={{ pl: 1 }}

                variant="outlined"
                size="small"
                disabled={applications?.status != String(ApplicationLifeCycleStates.SENT_TO_PRESIDENT)}
                value={applications?.presidentRemark ?? ''}
                onChange={(e) => setApplications(applications ? { ...applications, presidentRemark: String(e.target.value) } : applications)}
              />
            </Box>
            {/* )} */}

            <br/>
            {applications?.reasonForDeactivation && (

              <Typography variant="body1" component="h2" align='left'>

                <span style={{ fontWeight: 'bold' }}>Reason for rejection:  </span> {applications?.reasonForDeactivation}
              </Typography>
            )}

            <br/>
            <Typography variant="h5" component="h2" align='left'>
                 &nbsp;
              {applications?.presidentSanction && (

                <Button component="span" variant="contained" onClick={()=>{
                  setData(applications as any);
                  setOpenPrintFr(true);
                  setTimeout(() => {
                    setOpenPrintFr(false);
                  }, 2000);
                }}>

              Print Auth Letter
                </Button>
              )}
              &nbsp;
              <Button component="span" variant="outlined" onClick={()=>setOpen(true)}>

                  View File
              </Button>
            </Typography>

          </CardContent>
          {Number(applications?.status) !== CommonLifeCycleStates.APPROVED && Number(applications?.status) !== CommonLifeCycleStates.REJECTED && (

            <CardActions>
              <PermissionChecks
                permissions={['MANAGE_APPLICATION', 'PRESIDENT_ACCESS']}
                granted={(
                  <>

                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 'auto' }}
                      onClick={() => {
                        setReasonDialog(true);
                      }}
                    >
            Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        const snackbarId = enqueueSnackbar({
                          message: 'Approving...',
                          variant: 'info',
                        });
                        ApplicationServices.editApplication(applicationID as string, applications as Application)
                        .then((res) => {
                          ApplicationServices.approve(applicationID as string)
                          .then((res) => {
                            closeSnackbar(snackbarId);
                            enqueueSnackbar({
                              message: res.message,
                              variant: 'success',
                            });
                            navigate('/application/manage');
                          })

                          .catch((err) => {
                            closeSnackbar(snackbarId);
                            enqueueSnackbar({
                              message: err.message,
                              variant: 'error',
                            });
                          });
                          closeSnackbar(snackbarId);
                          enqueueSnackbar({
                            message: res.message,
                            variant: 'success',
                          });
                          // navigate('/application/manage');
                        });
                      }}
                    >
            Approve
                    </Button>
                  </>
                )}
              />

            </CardActions>
          )}
        </Card></Container>
      <FileUploader
        title="Attachments"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={open}
        action='view'
        onClose={() => setOpen(false)}
        // getFiles={TestServices.getBills}
        getFiles={applications?.attachment??[]}
      />
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Reason
            <Button
              variant="contained"
              onClick={() => {
                setReasonDialog(false);
              }}
              sx={{
                'position': 'absolute',
                'top': 8,
                'right': 8,
                'minWidth': 'auto',
                'padding': '0.1rem',
                'backgroundColor': 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            value={reasonForDeactivation}
            onChange={(e) => setReasonForDeactivation(e.target.value)}
            label="Reason for rejection"
            required
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button> */}

          <Button
            variant="contained"
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });

              ApplicationServices.reject(applicationID as string, reasonForDeactivation as string)
          .then((res) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: res.message,
              variant: 'success',
            });
            navigate('/application/manage');
          })
          .catch((err) => {
            closeSnackbar(snackbarId);
            enqueueSnackbar({
              message: err.message,
              variant: 'error',
            });
          });

              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
      Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={Boolean(data)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Sanction Letter</DialogTitle>
        <DialogContent>
          <Container>
  Download the SanctionLetter
            <br />
            {data && (
              <BlobProvider
                document={<SanctionLetter data={data} />}
              >
                {({ loading, url }) =>
                  loading || openPrintFr ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download="SanctionLetter.pdf"
                      style={{ color: 'blue' }}
                    >
            SanctionLetter.pdf
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setData(null);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ApplicationApprovalPage;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
