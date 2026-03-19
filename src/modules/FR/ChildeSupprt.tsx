/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Box, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip, Typography, styled } from '@mui/material';
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
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './components/PDFTemplate';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import ChildrenServices from '../Workers/extras/ChildrenServices';
import ChildePDFTemplate from './components/ChildePDFTemplate';
import { AnyARecord } from 'dns';
import { useNavigate } from 'react-router-dom';
import ChildeSupportSignSheet from './components/ChildeSupportSignSheet';
import IROReconciliationPdf from '../IRO/components/IROReconciliationPdf';

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
  const [coordinatorId, setCoordinator] = useState<any>(null);
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
    childSupport: true,
  });
  const supportEnabledChilds = childList?.filter((item) => item.supportEnabled === true);
  const supportEnabledChildsCount = childList?.filter((item) => item);

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [filterdId, setFilterdId] = useState<string[]>([]);
  console.log(selectedRowIds, 'selectedRowIds');
  const [modal, setModal] = useState<boolean>(false);
  const [subDivisions, setSubDivisions] = useState<SubDivision[] | null>(null);

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
  const [loadingDiv, setLoadingDiv] = useState<boolean | null>(false);
  // const supportEnabledWorkers = childList?.filter((item) => item.supportStructure?.supportEnabled === true);
  const [disableAttach, setDisableAttach] = useState(true);
  const [confirmAttach, setConfirmAttach] = useState(false);
  const [requisition2, setRequisition2] = useState<FR | null>(null);
  const [frAction, setFrAction] = useState<'add' | 'view' | null>(null);
  const [subDivision, setSubDivision] = useState<SubDivision | null>(null);
  console.log(requisition2?.FRno, 'requisition2');

  const addFR = async (requisition: CreatableFR) => {
    console.log('fn FUc');
    try {
      // const snackbarId =
      enqueueSnackbar({
        message: 'Creating FR Request',
        variant: 'info',
      });

      const res = await FRServices.createFRRequests(requisition);
      const res2 = (await FRServices.getById(res.data._id));
      setRequisition2(res2.data);
      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
      setConfirmAttach(true);
      setDisableAttach(true);
      setTimeout(() => {
        setDisableAttach(false);
      }, 2000); // 2 seconds
      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
      setToggleRaiseFR(false);
      setFrAction(null);
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
    <><div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', height: '4vh', paddingRight: '16px', backgroundColor: '#B4D4FF' }}>
      {/* {columns.map((column) => ( */}
      <div style={{ textAlign: 'center' }}>
        <b>Total: </b>
        <b>{total ?? null}
        </b>
      </div>
      {/* ))} */}
    </div><div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 5, width: '100%', height: '5vh', paddingRight: '16px', backgroundColor: '#B4D4FF' }}>
      {/* {columns.map((column) => ( */}
      <div style={{ textAlign: 'end' }}>
        <b>Total count: </b>
        <b>{supportEnabledChildsCount.length ?? null}
        </b>
      </div>
      {/* ))} */}
    </div></>
  );
  useEffect(() => {
    setTotal(0);
    const tot = 0;
    childList.map((i) => {
      const tot = childList.reduce((sum, i) => sum + (i.childSupport?.amount || 0), 0);
      setTotal(tot);
    });
  }, [childList]);
  console.log(total, 'tot');
  useEffect(() => {
    if (division) {
      DivisionsServices.getSubDivisionsByDivisionId(division?._id as string)
        // .then((res) => console.log(res.data, 'data'))
        .then((res) => setSubDivisions(res.data))
        .catch((error) =>
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          }),
        );
    } else {
      setSubDivisions([]);
    }
    // console.log(props.value.divisionHistory);
  }, [division]);
  useEffect(() => {
    ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE })
      .then((res) => {
        setChildList(res.data);
        setAllChilde(res.data);
        if (res.data) {
          // setLoading(true);
          setLoadingDiv(true);
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
  const attach = async (signBlob: Blob, supportBlob: Blob) => {
    console.log('attach');
    try {
      if (selectedWorker || division) {
        // File Blob creation
        const signFileBlob = signBlob instanceof Blob ? new File([signBlob], 'ChildrenSignatureSheet.pdf', { type: 'application/pdf' }) : null;
        const supportFileBlob = supportBlob instanceof Blob ? new File([supportBlob], 'ChildSupport.pdf', { type: 'application/pdf' }) : null;

        if (supportFileBlob && signFileBlob) {
          // File upload
          const supportFile = await FileUploaderServices.uploadFile(supportFileBlob, undefined, 'FR', supportFileBlob.name);
          const signFile = await FileUploaderServices.uploadFile(signFileBlob, undefined, 'FR', signFileBlob.name);

          if (requisition2 && signFile.success && supportFile.success) {
            // Update FR request
            await FRServices.updateFRRequests(requisition2._id, {
              ...requisition2,
              particulars: requisition2?.particulars ? requisition2.particulars.map((particular, index) => {
                return index === 0 ? { ...particular, attachment: [...particular.attachment, supportFile.data]} : particular;
              }) : [],
              signatureSheet: signFile.data._id,
            });
            const downloadFile = (url: any, filename: any) => {
              const a = document.createElement('a');
              a.href = url;
              a.download = filename;
              // a.target = '_blank'; // optional: helps with CORS/CDN behavior
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };

            // Add a small delay to avoid browser blocking multiple downloads
            const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

            // If you're downloading just one file:
            if (signFile.data.downloadURL) {
              // Add delay to ensure the browser doesn't block it
              delay(200).then(() => {
                downloadFile(signFile?.data?.downloadURL, signFileBlob.name);
              });
            }


            // Update local state and UI
            setRequisition2((await FRServices.getById(requisition2._id)).data);
            enqueueSnackbar({
              message: 'File Attached',
              variant: 'success',
            });
            enqueueSnackbar({
              message: 'FR updated',
              variant: 'success',
            });
            setConfirmAttach(false);
            setFrAction('view');
          }
        }
      }
    } catch (error) {
      // Handle error
      console.error('Error attaching files:', error);
      enqueueSnackbar({
        message: 'Error attaching files',
        variant: 'error',
      });
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };
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
        // navigate(`/users/worker/${res.data.childOf}/3`);
        window.open(`/users/worker/${res.data.childOf}/3`, '_blank', 'noopener,noreferrer');
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };
  const handleClickEdit = (rowId: any) => {
    ChildrenServices.getById(rowId.id)
      .then((res) => {
        // navigate(`/workers/edit/${res.data.childOf}/3`);
        window.open(`/workers/edit/${res.data.childOf}/3`, '_blank', 'noopener,noreferrer');
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
          <GridLinkAction key={2} label="Edit" icon={<PreviewIcon />} showInMenu onClick={() => handleClickEdit(params)}/>,

          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    {
      field: 'slNo',
      headerName: 'Sl No',
      width: 70,
      headerClassName: 'column-header',
      renderHeader: () => <b>{'Sl No'}</b>,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <div>{params.api.getAllRowIds().indexOf(params.id) + 1}</div>,
      align: 'center',
      headerAlign: 'center',
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
    {
      field: 'Sub-division', width: 130,
      headerClassName: 'column-header', align: 'center', headerAlign: 'center', renderHeader: () => <b>Sub Division</b>, valueGetter: (params) => params.row.childOf?.officialDetails?.divisionHistory[params.row?.childOf?.officialDetails?.divisionHistory?.length - 1]?.subDivision?.name,

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
      valueGetter: (params) => params.row.dateOfBirth?.format('DD/MM/YYYY'),
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
    {
      field: 'CEA Amount update date ',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated at'}</b>,
      valueGetter: (params) => params.row.prevCeaAmountDate?.format('DD/MM/YYYY') ?? '',
    },
    {
      field: 'Prev CEA Amount',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev CEA Amount'}</b>,
      valueGetter: (params) => params.row.prevCeaAmount != 0 ? params.row.prevCeaAmount : '',
    },

    {
      field: 'EnableStatus',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Support Status'}</b>,
      valueGetter: (params) => params.row.supportEnabled?'Yes' : 'No',
    },
    {
      field: 'disabledFrom',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Disabled from'}</b>,
      valueGetter: (params) => params.row.disabledFrom?.format('DD/MM/YYYY'),
    },
    {
      field: 'disable',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Disable to'}</b>,
      valueGetter: (params) => params.row.disabledTo?.format('DD/MM/YYYY'),
    },

    {
      field: 'reason',
      width: 180,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Reason'}</b>,
      valueGetter: (params) => params.row.reason,
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
  // const handleSelectionChange = (newSelection) => {
  //   setFilterdId((prevSelectedIds) => {
  //     const updatedSelection = new Set([...prevSelectedIds, ...newSelection]);
  //     return Array.from(updatedSelection); // Convert the set back to an array
  //   });

  //   console.log('Updated Selected IDs:', filterdId);
  // };

  // const handleAction = () => {
  //   const selectedRows = filterdId.length > 0 ?
  //     childList.filter((row) => filterdId.includes(row._id)) :
  //     childList; // If no rows are selected, use all rows

  //   // Perform your action with `selectedRows`
  //   console.log('Rows to process:', selectedRows);
  //   setChildList(selectedRows);
  // };
  const handleSelectionChange = (newSelection: any) => {
    setFilterdId(newSelection);
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
        quantity: supportEnabledChilds?.length,
        attachment: fileObj ? [fileObj] : [],
      }],
    }));
  };
  const handleAction = () => {
    const selectedRows = filterdId.length > 0 ?
      childList.filter((row) => filterdId.includes(row._id)) :
      childList; // If no rows are selected, use all rows

    // Perform your action with `selectedRows`
    console.log('Rows to process:', selectedRows);
    setChildList(selectedRows);
  };
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

  const getMonth = () => {
    const currentYear = moment().year(); // Ensure `year` is called as a method
    const particulars = requisition.particulars || [];

    const isUpcomingYear = particulars.some((part) => part.isUpcomingYear);
    const month = particulars[0]?.month ?? null;

    return `${month} ${particulars[0]?.year?? currentYear}`;
  };
  return (
    <CommonPageLayout title="Child Support">
      <Card
        sx={{
          width: {
            xs: '15%', // mobile
            sm: '20%', // tablet
            md: '40%', // desktop
          },
          borderRadius: 3,
          mt: 2,
        }}
      >
        {toggleRaiseFR &&(
          <FRForm
            value={requisition}
            onChange={(newReq) => setRequisition(newReq)}
            action={'add'}
            onSubmit={addFR}
            disable= {true}
            // Pass the addFR function to the onSubmit prop
          />
        )}
        {confirmAttach?(

          <Card >
            <CardContent>
              <Typography variant="h6">File Attachment</Typography>

              <Container>
  FR created. Do you want to add attachment&nbsp;

                {pdfProps && (
                  <BlobProvider
                    document={
                      <ChildePDFTemplate
                        month={getMonth() ?? null}
                        total={total}
                        frNo={requisition2?.FRno ?? ''}
                        divisionId={pdfProps.divisionId}
                        data={childList.filter((e) => e.supportEnabled === true)}
                      />
                    }
                  >
                    {({ loading, url }) =>
                      loading || disableAttach ? (
                        <span style={{ color: 'blue' }}>....</span>
                      ) : (
                        <a
                          href={url ?? ''}
                          download="ChildSupport.pdf"
                          style={{ color: 'blue' }}
                        >
            ChildSupport.pdf
                        </a>
                      )
                    }
                  </BlobProvider>
                )}

  &nbsp; and &nbsp;

                <BlobProvider
                  document={
                    <ChildeSupportSignSheet
                      frNo={requisition2?.FRno ?? ''}
                      month={getMonth()}
                      total={total}
                      data={childList.filter((e) => e.supportEnabled === true)}
                      subDiv={subDivision ?? null}
                    />
                  }
                >
                  {({ loading, url }) =>
                    loading || disableAttach ? (
                      <span style={{ color: 'blue' }}>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="ChildrenSignatureSheet.pdf"
                        style={{ color: 'blue' }}
                      >
          ChildrenSignatureSheet.pdf
                      </a>
                    )
                  }
                </BlobProvider>

  ?
              </Container>
            </CardContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setConfirmAttach(false);
                }}
                variant="text"
                disabled={modal}
              >
            No, Cancel
              </Button>
              <>
                {(selectedWorker || division) && pdfProps && (
                  <>
                    <BlobProvider
                      document={
                        <ChildeSupportSignSheet
                          month={getMonth() ?? null}
                          total={total}
                          frNo={requisition2?.FRno ?? ''}
                          data={childList.filter((e) => e.supportEnabled === true)}
                        />
                      }
                    >
                      {({ blob: signBlob, loading: loading1 }) => (
                        <BlobProvider
                          document={
                            <ChildePDFTemplate
                              frNo={requisition2?.FRno ?? ''}
                              month={getMonth() ?? null}
                              total={total}
                              divisionId={pdfProps.divisionId}
                              data={childList.filter((e) => e.supportEnabled === true)}
                            />
                          }
                        >
                          {({ blob: supportBlob, loading: loading2 }) => (
                            <>
                              {modal &&(

                                <Card>
                                  <CardContent>
                                    <Typography sx={{ color: 'red' }}>
                Did you download the signature sheet?
                                    </Typography>
                                    <DialogActions>
                                      <Button onClick={() => setModal(false)}>Close</Button>

                                      <Button
                                        endIcon={<AttachIcon />}
                                        variant="contained"
                                        color="info"
                                        onClick={async () => {
                                          if (signBlob && supportBlob) {
                                            setLoading(true);
                                            await attach(signBlob, supportBlob);
                                          }
                                        }}
                                        disabled={Boolean(loading1 || loading2 || loading)}
                                      >
                                        {loading ? (
                                          <Box sx={{ display: 'flex' }}>
                                            <CircularProgress size={20} />
                                          </Box>
                                        ) : (
                                          'Yes'
                                        )}
                                      </Button>
                                    </DialogActions>
                                  </CardContent>

                                </Card>
                              )}

                              <Button
                                onClick={() => {
                                  setModal(true);
                                  setRequisition2((prev: any) => ({
                                    ...prev,
                                    isSupport: true,
                                  }));
                                }}
                                disabled={loading1 || loading2 ||modal}
                              >
                                {loading1 || loading2 ? 'Loading...' : 'Yes, Attach'}
                              </Button>
                            </>
                          )}
                        </BlobProvider>
                      )}
                    </BlobProvider>

                  </>
                )}
              </>
            </DialogActions>
          </Card>
        ):(

          <form onSubmit={(e) => {
            e.preventDefault();
            const tot = childList
          .filter((child) => child.supportEnabled) // Filter only enabled children
          .reduce((sum, i) => sum + (i.childSupport?.amount || 0), 0);
            handleAction();
            // if (fileObj) {
            // setTimeout(() => {
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
                quantity: supportEnabledChilds?.length,
                attachment: fileObj ? [fileObj] : [],
              }],
            }));
            console.log(tot, '00');
          // }, 2000);
          // // } else {
          // //   enqueueSnackbar({
          // //     message: 'File Not Attached',
          // //     variant: 'info',
          // //   });
          // }
          }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2} >
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
                        setCoordinator(coordinator);
                        setChildList(() =>
                          allChild?.filter((child: any) => {
                            const lastDivisionHistory =
                            child.childOf?.officialDetails?.divisionHistory?.[
                              child.childOf?.officialDetails?.divisionHistory?.length - 1
                            ];

                            return (
                              child.division?._id === newVal?._id &&
                            !lastDivisionHistory?.subDivision?.name && // Exclude children with a sub-division
                            child.childOf?._id !== coordinator?._id &&
                            child.childSupport?.amount !== 0 &&
                            child.childOf?.supportDetails?.designation?.name !== 'Officiating Co-Ordinator'
                            );
                          }) ?? [],
                        );


                        setDivision(newVal);
                        setSubDivision(null);
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
                    disabled={loadingDiv != true}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Autocomplete
                    options={subDivisions ?? []}
                    value={subDivision ?? null}
                    getOptionLabel={(subDiv) => subDiv.name}
                    onChange={(event, newVal) => {
                      if (newVal) {
                        setChildList(() =>
                          allChild ?
                            allChild.filter((child: any) => {
                              const lastDivisionHistory =
                                child.childOf?.officialDetails?.divisionHistory?.[
                                  child.childOf?.officialDetails?.divisionHistory?.length - 1
                                ];

                              return (
                                lastDivisionHistory?.subDivision?._id?.toString() === newVal?._id?.toString() &&
                                child.childOf?._id !== coordinatorId?._id &&
                                child.childSupport?.amount !== 0 &&
                                child.childOf?.supportDetails?.designation?.name !== 'Officiating Co-Ordinator'
                              );
                            }) :
                            [], // Ensure setChildList always gets an array
                        );
                        setRequisition((requisition:any) => ({
                          ...requisition,
                          purpose: 'Subdivision' as FRPurpose,
                          purposeSubdivision: newVal,

                        }));
                      } else {
                        setChildList(allChild ?? []);
                        // setDivision(null);
                        setRequisition((requisition) => ({
                          ...requisition,
                          purpose: 'Division',
                          purposeSubdivision: undefined,
                          designationParticular: undefined,
                          purposeWorker: undefined,
                          purposeCoordinator: undefined,
                        }));
                      }
                      setSubDivision(newVal);
                    }}
                    renderInput={(params) => <TextField {...params}
                      label="Subdivision"
                      helperText={!subDivisions ? 'Loading sub-divisions...' : 'Select a sub-division'}
                      variant='standard' />}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
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
                <Grid item xs={12} md={2}>
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
                        document={<ChildePDFTemplate month={getMonth() ?? null} total={total} frNo={requisition2?.FRno?? ''} divisionId={pdfProps.divisionId} data={childList} />}
                        fileName="ChildeSupport.pdf"
                        style={{ textDecoration: 'none', color: 'blue' }}
                      >
                        {/* {({ blob, loading }) => (
                        <>
                          <Button

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
                          </Button>
                        </>
                      )} */}
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
                            onClick={handleAction}
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
                      {/* {(selectedWorker || division) && (
                      <PDFDownloadLink
                        document={<ChildeSupportSignSheet month={getMonth() ?? null} total={total} data={childList} />}
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
                    )} */}
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
        )}
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
              <div style={{ height: 400, width: '100%' }}>
                <StyledDataGrid
                  rows={childList ?? []}
                  columns={columns}
                  getRowId={(row) => row._id}
                  loading={childList === null}
                  columnGroupingModel={columnGroupingModel}
                  experimentalFeatures={{ columnGrouping: true }}
                  checkboxSelection
                  rowSelectionModel={filterdId} // Use the state variable here
                  onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)} // Update on selection change
                />
                {/* <Button variant='contained' onClick={handleAction}>Process Selected Rows</Button> */}
              </div>
            </Box>
            <CustomFooter />
          </Grid>
        </Grid>
      </Card>


    </CommonPageLayout>
  );
};

export default ChildeSupportPage;
