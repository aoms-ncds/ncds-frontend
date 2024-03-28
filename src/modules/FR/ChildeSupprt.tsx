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
  const [allWorkers, setAllWorkers] = useState<IWorker[] | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<IWorker | null>(null);
  const [total, setTotal] = useState<TotalSupportStructure>({
    basic: 0,
    prevBasic: 0,
    HRA: 0,
    prevHRA: 0,
    spouseAllowance: 0,
    prevSpouseAllowance: 0,
    positionalAllowance: 0,
    prevPositionalAllowance: 0,
    specialAllowance: 0,
    prevSpecialAllowance: 0,
    impactDeduction: 0,
    prevImpactDeduction: 0,
    telAllowance: 0,
    prevTelAllowance: 0,
    PIONMissionaryFund: 0,
    prevPIONMissionaryFund: 0,
    MUTDeduction: 0,
    prevMUTDeduction: 0,
    total: 0,
    prevTotal: 0,
    deduction: 0,
    prevDeduction: 0,
    net: 0,
    prevNet: 0,
  });
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [division, setDivision] = useState<Division | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [toggleRaiseFR, setToggleRaiseFR] = useState<boolean>(false);
  const [requisition, setRequisition] = useState<CreatableFR>({
    FRdate: moment(),
    kind: 'FRs',
    particulars: [],
    sanctionedAsPer:''
  });
  const supportEnabledWorkers = workers?.filter(item => item.supportStructure.supportEnabled === true);

  const [pdfProps, setPdfProps] = useState<{divisionId:string|null;workerId:string|null}>({ divisionId: null, workerId: null });
  const [fileObj, setFileObj] = useState<FileObject|null>(null);
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
  const CustomFooter = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '16px', backgroundColor: '#B4D4FF' }}>
      {columns.map((column) => (
        <div key={column.field} style={{ width: column.width, textAlign: 'center' }}>
          {column.field=='division'&&<b>Total</b>}
          <b> { typeof total[column.field as keyof TotalSupportStructure] ==='number'?total[column.field as keyof TotalSupportStructure]:null}
          </b>
        </div>
      ))}
    </div>
  );
  useEffect(() => {
    const basic=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.basic? total + Number(worker.supportStructure?.basic):total,
      0,
    );
    const prevBasic=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevBasic? total + Number(worker.supportStructure?.prevBasic):total,
      0,
    );
    const HRA=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.HRA? total + Number(worker.supportStructure?.HRA):total,
      0,
    );
    const prevHRA=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevHRA? total + Number(worker.supportStructure?.prevHRA):total,
      0,
    );
    const spouseAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.spouseAllowance? total + Number(worker.supportStructure?.spouseAllowance):total,
      0,
    );
    const prevSpouseAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevSpouseAllowance? total + Number(worker.supportStructure?.prevSpouseAllowance):total,
      0,
    );
    const positionalAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.positionalAllowance? total + Number(worker.supportStructure?.positionalAllowance):total,
      0,
    );
    const prevPositionalAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevPositionalAllowance? total + Number(worker.supportStructure?.prevPositionalAllowance):total,
      0,
    );
    const specialAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.specialAllowance? total + Number(worker.supportStructure?.specialAllowance):total,
      0,
    );
    const prevSpecialAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevSpecialAllowance? total + Number(worker.supportStructure?.prevSpecialAllowance):total,
      0,
    );
    const impactDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.impactDeduction? total + Number(worker.supportStructure?.impactDeduction):total,
      0,
    );
    const prevImpactDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevImpactDeduction? total + Number(worker.supportStructure?.prevImpactDeduction):total,
      0,
    );
    const telAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.telAllowance? total + Number(worker.supportStructure?.telAllowance):total,
      0,
    );
    const prevTelAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevTelAllowance? total + Number(worker.supportStructure?.prevTelAllowance):total,
      0,
    );
    const PIONMissionaryFund=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.PIONMissionaryFund? total + Number(worker.supportStructure?.PIONMissionaryFund):total,
      0,
    );
    const prevPIONMissionaryFund=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevPIONMissionaryFund? total + Number(worker.supportStructure?.prevPIONMissionaryFund):total,
      0,
    );
    const MUTDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.MUTDeduction? total + Number(worker.supportStructure?.MUTDeduction):total,
      0,
    );
    const prevMUTDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevMUTDeduction? total + Number(worker.supportStructure?.prevMUTDeduction):total,
      0,
    );
    setTotal({
      basic: basic,
      prevBasic: prevBasic,
      HRA: HRA,
      prevHRA: prevHRA,
      spouseAllowance: spouseAllowance,
      prevSpouseAllowance: prevSpouseAllowance,
      positionalAllowance: positionalAllowance,
      prevPositionalAllowance: prevPositionalAllowance,
      specialAllowance: specialAllowance,
      prevSpecialAllowance: prevSpecialAllowance,
      impactDeduction: impactDeduction,
      prevImpactDeduction: prevImpactDeduction,
      telAllowance: telAllowance,
      prevTelAllowance: prevTelAllowance,
      PIONMissionaryFund: PIONMissionaryFund,
      prevPIONMissionaryFund: prevPIONMissionaryFund,
      MUTDeduction: MUTDeduction,
      prevMUTDeduction: prevMUTDeduction,
      total: (basic ?? 0) +
    (HRA ?? 0) +
    (spouseAllowance ?? 0) +
    (positionalAllowance ?? 0) +
    (specialAllowance ?? 0) +
    (PIONMissionaryFund ?? 0) +
    (telAllowance ?? 0),
      deduction: (impactDeduction ?? 0) +
    (MUTDeduction ?? 0),
      net: (basic ?? 0) +
    (HRA ?? 0) +
    (spouseAllowance ?? 0) +
    (positionalAllowance ?? 0) +
    (specialAllowance ?? 0) +
    (PIONMissionaryFund ?? 0) +
    (telAllowance ?? 0) -
    (
      (impactDeduction ?? 0) +
      (MUTDeduction ?? 0)
    ),
    });
  }, [workers]);

  useEffect(() => {
    WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE })
    .then((res) => {
      console.log(res);
      // setWorkers(res.data);
      // setAllWorkers(res.data);
      // console.log( 'basic',workers?.reduce(
      //   (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.basic? total + Number(worker.supportStructure?.basic):total,
      //   0,
      // ));
    })
      .catch((res) => {
        console.log(res);
      });
    if (user.user && user.user?.kind=='worker') {
      DivisionsServices.getDivisionById(user.user?.division as unknown as string)
        .then((res) => {
          setDivision(res.data);
          setDivisions([res.data]);
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
    setRequisition((requisition)=>({ ...requisition,
      purpose: 'Division',
    }));
  }, []);
  useEffect(() => {
    setPdfProps({ divisionId: division?._id??null, workerId: selectedWorker?._id??null });
  }, [division, selectedWorker]);

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      headerClassName: 'column-header',
      getActions: (params: GridRowParams) =>
        [
          <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/users/worker/${params.row._id}`} />,
          // <GridLinkAction key={2} label="Edit" icon={<EditIcon />} showInMenu to={`/workers/edit/${params.row._id}`} />,
          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    { field: 'childeCode', width: 100, headerClassName: 'column-header', renderHeader: () => <b>{'Childe Code'}</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'firstName',
      width: 120,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>First Name</b>,
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'lastName',
      width: 120,
      headerClassName: 'column-header',
      renderHeader: () => <b>Last Name</b>,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    { field: 'division', width: 130,
      headerClassName: 'column-header', align: 'center', headerAlign: 'center', renderHeader: () => <b>Division</b>, valueGetter: (params) => params.row.division?.details?.name },
    {
      field: 'sub_division',
      width: 150,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },
    {
      field: 'dateOfbirth',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'DOB'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },
    {
      field: 'age',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Age'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },
    {
      field: 'gender',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Gender'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },
    {
      field: 'CEA Amount',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'CEA Amount'}</b>,
      valueGetter: (params) => params.row.supportStructure?.supportEnabled?(params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0):0,
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
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },

  }));

  return (
    <CommonPageLayout title="Workers Support">
      <Card sx={{ width: '50%', borderRadius: 3, marginTop: 2 }}>
        <form onSubmit={(e)=>{
          e.preventDefault();
          if (fileObj) {
            setToggleRaiseFR(true);
            setRequisition((requisition)=>({
              ...requisition,
              purpose: selectedWorker?'Worker':'Division',
              purposeWorker: selectedWorker??undefined,
              division: division??undefined,
              mainCategory: 'Maintenance Of Priest & Preachers',
              particulars: [{
                _id: '',
                mainCategory: 'Maintenance Of Priest & Preachers',
                subCategory1: 'Support',
                subCategory2: 'Worker',
                subCategory3: 'Select',
                month: moment().format('MMMM'),
                narration: `Towards the support of (No: of workers) of ${division?.details.name} for the month of (mon, year)`,
                requestedAmount: total.net,
                unitPrice: total.net,
                quantity: supportEnabledWorkers?.length,
                attachment: fileObj? [fileObj]:[],
              }],
            }));
          } else {
            enqueueSnackbar({
              message: 'File Not Attached',
              variant: 'info',
            });
          }
        }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} >
                <Autocomplete
                // disabled={props.kind=='worker'}
                  options={divisions ?? []}
                  // value={(props.value.divisionHistory?.length>0)?props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division: null}
                  value={division}
                  getOptionLabel={(div) => div.details?.name}
                  onChange={(event, newVal) => {
                    if (newVal) {
                      setWorkers(()=>allWorkers?.filter((worker)=>worker.division?._id==newVal?._id)??[]);
                      setDivision(newVal);
                    } else {
                      setWorkers(allWorkers);
                      setDivision(null);
                    }
                    setSelectedWorker(null);
                  }
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Division" helperText={!divisions ? 'Loading divisions...' : 'Select a Division'} variant='standard'
                      required />
                  )}
                  disabled={Boolean(user.user && (user.user as User).kind == 'worker')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete<IWorker>
                  value={selectedWorker ?? null}
                  options={(workers ?? [])}
                  getOptionLabel={(workers) => `${workers?.basicDetails.firstName} ${workers.basicDetails.lastName}`}
                  onChange={(_e, newVal) => {
                    setSelectedWorker(newVal);
                    if (newVal) {
                      setWorkers((workers)=>workers?.filter((worker)=>worker._id==newVal?._id)??[]);
                      setDivision(()=>divisions?.find((div)=>div._id==newVal.division?._id)??null);
                    } else setWorkers(()=>(division?allWorkers?.filter((worker)=>worker.division?._id==division?._id):allWorkers)??[]);
                  }}
                  renderInput={(params) => <TextField {...params} label="Choose Worker" variant='standard' />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Total Amount"
                  value={total.total }
                  variant='standard'
                  fullWidth
                  disabled

                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Total Deduction"
                  value={total.deduction}
                  variant='standard'
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Net Amount"
                  value={total.net}
                  variant='standard'
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ float: 'left' }}>
                  {(selectedWorker || division) && (
                    <PDFDownloadLink
                      document={<PDFTemplate divisionId={pdfProps.divisionId} workerId={pdfProps.workerId} />}
                      fileName="WorkerSupport.pdf"
                      style={{ textDecoration: 'none', color: 'blue' }}
                    >
                      {({ blob, loading }) => (
                        <> <Button

                          endIcon={<AttachIcon />}
                          variant="contained"
                          color="info"
                          onClick={async () => {
                            if (blob) {
                              if (selectedWorker || division) {
                                const file=(blob instanceof Blob ? new File([blob], 'WorkerSupport.pdf', { type: 'application/pdf' }) : null);
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
                          {loading?'Loading...':'Attach File'}
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
                  &nbsp;
                  <PermissionChecks
                    permissions={['WRITE_FR']}
                    granted={
                      <Tooltip open={open&&!fileObj}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        title={'Please Attach the file'} >
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
                  <Typography sx={{ fontSize: '12px', color: '#8c8d8f' }} >(Before raising the FR, click on Attach File to export as a sheet and attach with the FR )</Typography>
                </div>
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
              <StyledDataGrid rows={workers ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                loading={workers === null}
                columnGroupingModel={columnGroupingModel}
                experimentalFeatures={{ columnGrouping: true }}
                slots={{
                  footer: CustomFooter,
                }}
                // getRowClassName={(params) =>
                //   params.row.supportStructure.supportEnabled ? 'yes' : 'no'
                // }
              /></Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={toggleRaiseFR} onClose={()=>setToggleRaiseFR(false)} >
        <DialogContent >
          <FRForm
            value={requisition}
            onChange={(newReq) => setRequisition(newReq)}
            action={'add'}
            onSubmit={addFR} // Pass the addFR function to the onSubmit prop
          />
        </DialogContent>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ChildeSupportPage;
