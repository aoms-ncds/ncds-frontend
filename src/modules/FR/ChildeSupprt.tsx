/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Box, Button, Card, CardContent, Dialog, DialogContent, Grid, TextField, Tooltip, Typography, styled } from '@mui/material';
import { DataGrid, GridColDef, GridColumnGroupingModel, GridRowParams } from '@mui/x-data-grid';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import GridLinkAction from '../../components/GridLinkAction';
import { Preview as PreviewIcon, AttachFile as AttachIcon } from '@mui/icons-material';
import WorkersServices from '../Workers/extras/WorkersServices';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import { useAuth } from '../../hooks/Authentication';
import PermissionChecks from '../User/components/PermissionChecks';
import FRForm from './components/FRForm';
import FRServices from './extras/FRServices';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './components/PDFTemplate';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import ChildrenServices from '../Workers/extras/ChildrenServices';
import ChildePDFTemplate from './components/ChildePDFTemplate';
import { AnyARecord } from 'dns';
import { useNavigate } from 'react-router-dom';
import ChildeSupportSignSheet from './components/ChildeSupportSignSheet';

interface TotalSupportStructure {
  basic?: number;
  prevBasic?: number;
  HRA?: number;
  prevHRA?: number;
  spouseAllowance?: number;
  prevSpouseAllowance?: number;
  positionalAllowance?: number;
  prevPositionalAllowance?: number;
  specialAllowance?: number;
  prevSpecialAllowance?: number;
  impactDeduction?: number;
  prevImpactDeduction?: number;
  telAllowance?: number;
  prevTelAllowance?: number;
  PIONMissionaryFund?: number;
  prevPIONMissionaryFund?: number;
  MUTDeduction?: number;
  prevMUTDeduction?: number;
  total?: number;
  prevTotal?: number;
  deduction?: number;
  prevDeduction?: number;
  net?: number;
  prevNet?: number;
}
const ChildeSupportPage = () => {
  const user = useAuth();
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [workersSelect, setWorkersSelect] = useState<IWorker | null>(null);
  const [childList, setChildList] = useState<Child[]>([]);
  const [coordinators, setCoordinators] = useState<IWorker[] | null>([]);
  const [selectedCoordinators, setSelectedCoordinators] = useState<IWorker | null>(null);
  const [allChild, setAllChilde] = useState<Child[] | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Child | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [division, setDivision] = useState<any | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [toggleRaiseFR, setToggleRaiseFR] = useState<boolean>(false);
  const [requisition, setRequisition] = useState<CreatableFR>({

    FRdate: moment(),
    kind: 'FRs',
    particulars: [],
    sanctionedAsPer: '',
  });
  console.log(requisition.particulars?.[0]?.month, 'requisition');
  const navigate = useNavigate();
  // const supportEnabledWorkers = childList?.filter(item => item.supportStructure.supportEnabled === true);
  console.log(childList, 'childList');
  type NewValType = {
    division?: Division; // Assuming Division is a known type
    // Other properties of newVal if any
  };
  const [pdfProps, setPdfProps] = useState<{ divisionId: string | null; childId: string | null }>({ divisionId: null, childId: null });
  const [fileObj, setFileObj] = useState<FileObject | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  // const supportEnabledWorkers = childList?.filter((item) => item.supportStructure?.supportEnabled === true);

  const addFR = async (requisition: CreatableFR) => {
    try {
      // const snackbarId =
      enqueueSnackbar({
        message: 'Creating FR Request',
        variant: 'info',
      });

      const res = await FRServices.createFRRequests(requisition);

      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
      setToggleRaiseFR(false);
    } catch (err) {
      console.log(err);
      // Handle error conditions if needed
      // closeSnackbar(snackbarId);
      // enqueueSnackbar({
      //   message: err.message,
      //   variant: 'error',
      // });
    }
  };
  // useEffect(() => {
  //   DivisionsServices.getDivisions()
  //     .then((res) => {
  //       console.log(res.data);
  //       setDivisions(res.data);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }, []);

  // eslint-disable-next-line react/no-multi-comp

  // const calculateTotalCEAAmount = (tableData: { childSupport: { amount: any; }; }[]) => {
  //   let totalAmount = 0;
  //   tableData.forEach((row: { childSupport: { amount: any; }; }) => {
  //     totalAmount += row.childSupport?.amount || 0;
  //   });
  //   return totalAmount;
  // };

  // calculateTotalCEAAmount(childList)
  // eslint-disable-next-line react/no-multi-comp
  const CustomFooter = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '16px', backgroundColor: '#B4D4FF' }}>
      {/* {columns.map((column) => ( */}
      <div style={{ textAlign: 'center' }}>
        <b>Total: </b>
        <b>{total ?? null}
        </b>
      </div>
      {/* ))} */}
    </div>
  );
  useEffect(() => {
    let tot = 0;
    childList.map((i) => {
      tot += i.childSupport?.amount;
      setTotal(tot);
    });
    console.log(tot, 'tot');
  }, [childList]);

  useEffect(() => {
    ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE })
      .then((res) => {
        setChildList(res.data);
        setAllChilde(res.data);
        if (res.data) {
          setLoading(true);
        }
      });
    // DivisionsServices.getcoordinators()
    //   .then((res) => {
    //     console.log(res);
    //     // setCoordinatrs(res.data);
    //   });
    if (user.user && user.user?.kind == 'worker') {
      DivisionsServices.getDivisionById(user.user?.division as unknown as string)
        .then((res) => {
          // setDivision(res.data);
          setDivisions([res.data]);
          // const coordinatorId :any = newVal.details?.coordinator?.name?._id;

          // setChildList(() => allChild?.filter((child:any) =>
          //   child.division?._id == res.data?._id &&
          //  child.childOf?._id != coordinatorId && child.childSupport?.amount != 0 ) ?? []);
        })
        .catch((error) =>
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          }),
        );
    } else {
      DivisionsServices.getDivisions()
        .then((res) => setDivisions(res.data))
        .catch((error) =>
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          }),
        );
    }
    setRequisition((requisition) => ({
      ...requisition,
      purpose: 'Division',
    }));
  }, []);
  // console.log(divisions?.map((e)=>e.details.coordinator?.name?._id), 'ddf');
  // console.log(childList.map((r)=>r.childOf?._id),'cc');
  useEffect(() => {
    setPdfProps({ divisionId: division?._id ?? null, childId: selectedWorker?._id ?? null });
  }, [division, selectedWorker]);
  useEffect(() => {
    //  setCoordinatrs(() =>
    //   workers
    //     ?.filter((child: any) =>
    //       divisions?.some((division: any) =>
    //         division.details.coordinator?.name?._id === child._id
    //       )
    //     )
    //     .map((child: any) => child.name) ?? []
    // );
    WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE })
      .then((res) => {
        console.log(res, 'rr');
        setWorkers(res.data);
        setCoordinators((prevState: any) => {
          // Filter workers based on designation
          const filteredWorkers = res.data?.filter(
            (e: any) => e.supportDetails?.designation?.name === 'Coordinator' || e.supportDetails?.designation?.name === 'Officiating Co-Ordinator',
          );

          // Return the filtered list to update state
          return filteredWorkers;
        });
      });
    // const test= workers?.filter((e)=>{
    //   e.supportDetails.designation?.name == 'Coordinator';
    // });
    // console.log(test, 'test');
  }, []);
  console.log(coordinators, 'workers');
  const handleClick = (rowId: any) => {
    ChildrenServices.getById(rowId.id)
      .then((res) => {
        navigate(`/users/worker/${res.data.childOf}/3`);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };
  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      headerClassName: 'column-header',
      getActions: (params: GridRowParams) =>
        [
          <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu onClick={() => handleClick(params)} />,
          // <GridLinkAction key={2} label="Edit" icon={<EditIcon />} showInMenu to={`/workers/edit/${params.row._id}`} />,
          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    // eslint-disable-next-line max-len
    { field: 'childeCode', width: 100, headerClassName: 'column-header', renderHeader: () => <b>{'Child Code'}</b>, valueGetter: (params) => params.row?.childCode, align: 'center', headerAlign: 'center' },
    {
      field: 'firstName',
      width: 120,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>First Name</b>,
      valueGetter: (params) => params.row?.firstName,
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'lastName',
      width: 120,
      headerClassName: 'column-header',
      renderHeader: () => <b>Last Name</b>,
      valueGetter: (params) => params.row?.lastName,
    },
    {
      field: 'division', width: 130,
      headerClassName: 'column-header', align: 'center', headerAlign: 'center', renderHeader: () => <b>Division</b>, valueGetter: (params) => params.row.division?.details?.name,
    },
    // {
    //   field: 'sub_division',
    //   width: 150,
    //   headerClassName: 'column-header',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{'Sub-Division'}</b>,
    //   valueGetter: (params) => params.row.officialDetails?.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    // },
    {
      field: 'dateOfbirth',
      width: 150,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'DOB'}</b>,
      valueGetter: (params) => params.row.dateOfBirth.format('DD/MM/YYYY'),
    },
    {
      field: 'age',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Age'}</b>,
      valueGetter: (params) => (params.row.dateOfBirth?.fromNow() || '').replace(' ago', ''),
    },
    {
      field: 'gender',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Gender'}</b>,
      valueGetter: (params) => params.row?.gender,
    },
    {
      field: 'CEA Amount',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'CEA Amount'}</b>,
      valueGetter: (params) => params.row.childSupport?.amount != 0 ? params.row.childSupport?.amount : '',
    },
    // {
    //   field: 'supportEnabled',
    //   width: 100,
    //   headerClassName: 'column-header',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{'Status'}</b>,
    //   valueGetter: (params) => params.row.supportStructure?.supportEnabled?'Yes':'No',
    // }, {
    //   field: 'disabledFrom',
    //   width: 100,
    //   headerClassName: 'column-header',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{'From'}</b>,
    //   valueGetter: (params) => params.row.supportStructure?.disabledFrom? params.row.supportStructure?.disabledFrom?.format('DD/MM/YYYY'):'-',
    // }, {
    //   field: 'disabledTo',
    //   width: 100,
    //   headerClassName: 'column-header',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{'To'}</b>,
    //   valueGetter: (params) => params.row.supportStructure?.disabledTo?params.row.supportStructure?.disabledTo?.format('DD/MM/YYYY'):'-',
    // },
    //  {
    //   field: 'reason',
    //   width: 100,
    //   headerClassName: 'column-header',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{'Reason'}</b>,
    //   valueGetter: (params) => params.row.supportStructure?.reason ?? '',
    // },

  ];
  const columnGroupingModel: GridColumnGroupingModel = [

  ];
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    'border': 0,
    'color':
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    'WebkitFontSmoothing': 'auto',
    'letterSpacing': 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '&  .MuiDataGrid-cell': {
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },

  }));

  return (
    <CommonPageLayout title="Child Support">
      <Card sx={{ width: '100%', borderRadius: 3, marginTop: 2 }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          // if (fileObj) {
          setToggleRaiseFR(true);
          setRequisition((requisition) => ({
            ...requisition,
            // purpose: selectedWorker?'child':'Division',
            // purposeWorker: selectedWorker??undefined,
            division: division ?? undefined,
            mainCategory: 'Welfare of Children',
            particulars: [{
              _id: '',
              mainCategory: 'Welfare of Children',
              subCategory1: 'Children Welfare',
              subCategory2: 'Child Education Assistance',
              subCategory3: 'Select',
              month: moment().format('MMMM'),
              narration: 'Towards the Monthly Support of <DESIGNATION NAME> Mr/Ms/Mrs <NAME>for the month of <MONTH, YEAR>',
              requestedAmount: total,
              unitPrice: total,
              quantity: childList?.length,
              attachment: fileObj ? [fileObj] : [],
            }],
          }));
          // // } else {
          // //   enqueueSnackbar({
          // //     message: 'File Not Attached',
          // //     variant: 'info',
          // //   });
          // }
        }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} >
                <Autocomplete
                  // disabled={props.kind=='child'}
                  options={divisions ?? []}
                  // value={(props.value.divisionHistory?.length>0)?props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division: null}
                  value={division}
                  getOptionLabel={(div) => div.details?.name}
                  onChange={(event, newVal) => {
                    console.log(newVal, 'roro');
                    if (newVal) {
                      const coordinator: any = newVal.details?.coordinator?.name;
                      setChildList(() => allChild?.filter((child: any) =>
                        child.division?._id == newVal?._id &&
                        child.childOf?._id != coordinator?._id && child.childSupport?.amount != 0 && child.childOf?.supportDetails?.designation?.name != 'Officiating Co-Ordinator') ?? []);


                      setDivision(newVal);
                    } else {
                      setChildList(allChild ?? []);
                      setDivision(null);
                    }
                    setSelectedWorker(null);
                  }
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Division" helperText={!divisions ? 'Loading divisions...' : 'Select a Division'} variant='standard'
                      required />
                  )}
                  disabled={loading != true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete<IWorker>
                  value={workersSelect as unknown as IWorker}
                  options={(workers ?? [])}
                  getOptionLabel={(child) => `${child?.basicDetails?.firstName || ''} ${child?.basicDetails?.lastName || ''}`} // Handle null or undefined workers
                  onChange={(_e, newVal) => {
                    setWorkersSelect(newVal as IWorker);
                    if (newVal) {
                      const coordinatorId = newVal._id;
                      console.log(coordinatorId, 'coordinatorId');
                      if (coordinatorId) {
                        setChildList(() => allChild?.filter((child: any) => child.childOf?._id === coordinatorId && child.childSupport?.amount != 0) ?? []);
                        setDivision(() =>
                          newVal && 'division' in newVal && newVal.division ?
                            divisions?.find((div) => div._id === (newVal.division as unknown as Division)?._id) ?? null :
                            null,
                        );
                      }
                    } else {
                      setWorkersSelect(null);
                      setChildList(() => (division ? allChild?.filter((child: any) => child.division?._id === division._id) : allChild) ?? []);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Choose Worker" variant="standard" />}
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12} md={6} >
                <Autocomplete
                  value={workersSelect as unknown as IWorker}
                  options={(workers ?? [])}
                  getOptionLabel={(child) => `${child?.basicDetails?.firstName || ''} ${child?.basicDetails?.lastName || ''}`} // Handle null or undefined workers
                  onChange={(_e, newVal:any) => {
                    setWorkersSelect(newVal?? null);
                    if (newVal) {
                      setChildList((childe) => childe?.filter((child) => child.childOf?._id == newVal?._id && child.childSupport?.amount != 0) ?? []);
                      setDivision(() =>
                        newVal && 'division' in newVal && newVal.division ?
                          divisions?.find((div) => div._id === (newVal.division as Division)._id) ?? null :
                          null,
                      );
                    } else setChildList(() => (division ? allChild?.filter((child: any) => (child.division as Division | undefined)?._id == division?._id) : allChild) ?? []);
                  }}
                  renderInput={(params) => <TextField {...params} label="Choose Worker" variant="standard" />}
                  fullWidth
                  disabled={loading !=true}

                />
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Autocomplete<IWorker>
                  value={selectedCoordinators ?? null}
                  options={(coordinators ?? [])}
                  getOptionLabel={(child) => `${child?.basicDetails?.firstName || ''} ${child?.basicDetails?.lastName || ''}`} // Handle null or undefined workers
                  onChange={(_e, newVal) => {
                    setSelectedCoordinators(newVal ?? null);
                    if (newVal) {
                      const coordinatorId = newVal._id;
                      console.log(coordinatorId, 'coordinatorId');
                      if (coordinatorId) {
                        setChildList(() => allChild?.filter((child: any) => child.childOf?._id === coordinatorId && child.childSupport?.amount != 0) ?? []);
                        setDivision(() =>
                          newVal && 'division' in newVal && newVal.division ?
                            divisions?.find((div) => div._id === (newVal.division as unknown as Division)?._id) ?? null :
                            null,
                        );
                        setRequisition((requisition) => ({
                          ...requisition,
                          purposeCoordinator: newVal,
                          purpose: 'Coordinator',
                        }));
                      }
                    } else {
                      setSelectedCoordinators(null);
                      setChildList(() => (division ? allChild?.filter((child: any) => child.division?._id === division._id) : allChild) ?? []);
                      setRequisition((requisition) => ({
                        ...requisition,
                        purpose: 'Division',
                      }));
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Choose Coordinator" variant="standard" />}
                  fullWidth
                />
              </Grid>

              {/* <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Total Amount"
                  value={total.total }
                  variant='standard'
                  fullWidth
                  disabled

                />
              </Grid> */}

              {/* <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Total Deduction"
                  value={total.deduction}
                  variant='standard'
                  fullWidth
                  disabled
                />
              </Grid> */}

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Net Amount"
                  value={total}
                  variant='standard'
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ float: 'left' }}>
                  {(selectedWorker || division) && (
                    <PDFDownloadLink
                      document={<ChildePDFTemplate total={total} divisionId={pdfProps.divisionId} data={childList} />}
                      fileName="ChildeSupport.pdf"
                      style={{ textDecoration: 'none', color: 'blue' }}
                    >
                      {({ blob, loading }) => (
                        <>
                          {/* <Button

                          endIcon={<AttachIcon />}
                          variant="contained"
                          color="info"
                          onClick={async () => {
                            if (blob) {
                              if (selectedWorker || division) {
                                const file = (blob instanceof Blob ? new File([blob], 'ChildeSupport.pdf', { type: 'application/pdf' }) : null);
                                file && await FileUploaderServices.uploadFile(file, undefined, 'FR', file.name).then((res) => {
                                  setFileObj(res.data); console.log(res.data, 'uploaded');
                                  enqueueSnackbar({
                                    message: 'File Attached',
                                    variant: 'success',
                                  });
                                });
                              }
                            }
                          }} >
                          {loading ? 'Loading...' : 'Attach File'}
                        </Button> */}
                        </>
                      )}
                    </PDFDownloadLink>
                  )}
                  {/* <Button
                    variant="contained"
                    color="info"
                    onClick={()=> file && FileUploaderServices.uploadFile(file, undefined, 'FR', file.name).then((res) => {
                      setFileObj(res.data); console.log(res.data, 'uploaded');
                    })}
                  >
                     Upload File
                  </Button> */}
                  &nbsp;
                  <PermissionChecks
                    permissions={['WRITE_FR']}
                    granted={
                      <Tooltip open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        title={''} >
                        <Button
                          variant="contained"
                          color="info"
                          type='submit'
                        >
                          Raise FR
                        </Button></Tooltip>

                    }

                  />
                  <br />
                  {/* <Typography sx={{ fontSize: '12px', color: '#8c8d8f' }} >(Before raising the FR, click on Attach File to export as a sheet and attach with the FR )</Typography> */}
                </div>
                <Grid item xs={12}>
                  <div style={{ float: 'right' }}>
                    {(selectedWorker || division) && (
                      <PDFDownloadLink
                        document={<ChildeSupportSignSheet month={requisition.particulars?.[0]?.month ?? null} total={total} data={childList} />}
                        fileName="ChildeSupport.pdf"
                        style={{ textDecoration: 'none', color: 'blue' }}
                      >
                        {({ blob, loading }) => (
                          <> <Button

                            // endIcon={<AttachIcon />}
                            variant="contained"
                            color="info"
                            onClick={async () => {
                              if (blob) {
                                if (selectedWorker || division) {
                                  const file = (blob instanceof Blob ? new File([blob], 'ChildeSupport.pdf', { type: 'application/pdf' }) : null);
                                  file && await FileUploaderServices.uploadFile(file, undefined, 'FR', file.name).then((res) => {
                                    // setFileObj(res.data); console.log(res.data, 'uploaded');
                                    enqueueSnackbar({
                                      message: 'File Downloaded',
                                      variant: 'success',
                                    });
                                  });
                                }
                              }
                            }} >
                            {loading ? 'Loading...' : 'Download sign sheet'}
                          </Button>
                          </>
                        )}
                      </PDFDownloadLink>
                    )}
                    {/* <Button
                    variant="contained"
                    color="info"
                    onClick={()=> file && FileUploaderServices.uploadFile(file, undefined, 'FR', file.name).then((res) => {
                      setFileObj(res.data); console.log(res.data, 'uploaded');
                    })}
                  >
                     Upload File
                  </Button> */}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
      <br />
      <Card>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box
              sx={{
                '& .MuiCheckbox-root svg': {
                  width: 16,
                  height: 16,
                  backgroundColor: 'transparent',
                  border: '1px solid ',
                  borderRadius: 2,
                },
                '& .column-grp': {
                  backgroundColor: '#86B6F6',
                  border: '1px solid #f0f0f0',
                },
                '& .column-header': {
                  backgroundColor: '#B4D4FF',
                },
                '& .row-current': {
                  backgroundColor: '#EEF5FF',
                },
                '& .yes': {
                  backgroundColor: '#fff',
                },
                '& .no': {
                  backgroundColor: 'rgb(230 8 0 / 55%) !important',
                },

              }}
            >
              <StyledDataGrid rows={childList ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                loading={childList === null}
                columnGroupingModel={columnGroupingModel}
                experimentalFeatures={{ columnGrouping: true }}
              // slots={{
              //   footer: CustomFooter,
              // }}
              // getRowClassName={(params) =>
              //   params.row.supportStructure.supportEnabled ? 'yes' : 'no'
              // }
              /></Box>
            <CustomFooter />
          </Grid>
        </Grid>
      </Card>
      <Dialog open={toggleRaiseFR} onClose={() => setToggleRaiseFR(false)} >
        <DialogContent >
          <FRForm
            value={requisition}
            onChange={(newReq) => setRequisition(newReq)}
            action={'add'}
            onSubmit={addFR}
            disable= {true}
            // Pass the addFR function to the onSubmit prop
          />
        </DialogContent>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ChildeSupportPage;
