import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, styled } from '@mui/material';
import { DataGrid, GridColDef, GridColumnGroupingModel, GridRowParams } from '@mui/x-data-grid';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import GridLinkAction from '../../components/GridLinkAction';
import { Preview as PreviewIcon, AttachFile as AttachIcon } from '@mui/icons-material';
import WorkersServices from '../Workers/extras/WorkersServices';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import FRForm from './components/FRForm';
import FRServices from './extras/FRServices';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './components/PDFTemplate';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { purposes } from './extras/FRConfig';
import DesignationParticularService from '../Settings/extras/DesignationParticularService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Authentication';

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
const WorkerSupportPage = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  // const [allWorkers, setAllWorkers] = useState<IWorker[] | null>(null);
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
  const [subDivisions, setSubDivisions] = useState<SubDivision[] | null>(null);
  const [subDivision, setSubDivision] = useState<SubDivision| null>(null);
  const [purpose, setPurpose] = useState<FRPurpose|null>(null);

  const [frAction, setFrAction] = useState<'add'|'view'|null>(null);
  const [requisition, setRequisition] = useState<CreatableFR>({
    FRdate: moment(),
    kind: 'FRs',
    particulars: [],
    sanctionedAsPer: '',
    workerSupport: true,
  });
  const [requisition2, setRequisition2] = useState<FR|null>(null);
  const supportEnabledWorkers = workers?.filter((item) => item.supportStructure?.supportEnabled === true);

  const [designationParticulars, setDesignationParticulars] = useState<IDesignationParticular[]>([]);
  const [designationParticular, setDesignationParticular] = useState<IDesignationParticular|null>(null);

  const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  const [confirmAttach, setConfirmAttach] = useState(false);
  const user = useAuth();

  const [pdfProps, setPdfProps] =
  useState<{purpose:FRPurpose|null;
    divisionId:string|null;
    workerId:string|null;
    designationParticularID:string|null;
    subDivisionId:string|null;
    FrNo:string|null;
    FrMonth:string|null;}|null>(null);
  const [fileObj, setFileObj] = useState<FileObject|null>(null);

  const addFR = async (requisition: CreatableFR) => {
    try {
      // const snackbarId =
      enqueueSnackbar({
        message: 'Creating FR Request',
        variant: 'info',
      });

      const res = await FRServices.createFRRequests(requisition);
      const res2=(await FRServices.getById(res.data._id));
      setRequisition2(res2.data);
      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
      setConfirmAttach(true);
      setPdfProps(({ purpose: purpose??'Division',
        divisionId: division?._id??null,
        workerId: purpose=='Coordinator'&&res.data.purposeCoordinator ?res.data.purposeCoordinator?._id:
          requisition.purpose=='Worker'&&selectedWorker?._id?selectedWorker?._id:null,
        subDivisionId: subDivision?._id??null,
        designationParticularID: designationParticular?._id??null,
        FrNo: res2.data.FRno,
        FrMonth: res2.data.particulars[0]?.month??'' }));
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

  const attach=async (blob:Blob)=>{
    if (selectedWorker || division) {
      const file=(blob instanceof Blob ? new File([blob], 'WorkerSupport.pdf', { type: 'application/pdf' }) : null);
      file && await FileUploaderServices.uploadFile(file, undefined, 'FR', file.name).then(async (res) => {
        if (requisition2) {
          ( await FRServices.updateFRRequests(requisition2._id, {
            ...requisition2,
            particulars: requisition2?.particulars ? requisition2.particulars.map((particular, index) => {
              return index === 0 ? { ...particular, attachment: [...particular.attachment, res.data]} : particular;
            }) : [],
          }));
          setRequisition2((await FRServices.getById(requisition2._id)).data);
          setFileObj(res.data);
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
      });
    }
  };

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
    if (!confirmAttach) {
      if (purpose=='Coordinator'&&division?.details.coordinator?.name) {
        const workerID=division?.details.coordinator?.name?._id;
        WorkersServices.getById(workerID as string).then((res)=>res?.data && setWorkers([res?.data]));
      } else if (purpose=='Subdivision'&&division&&requisition.purposeSubdivision) {
        WorkersServices.getWorkersBySubDivision( { division: division._id, subDiv: requisition.purposeSubdivision._id as string, designationParticular: requisition.designationParticular??null })
    .then((res) => {
      console.log(res);
      setWorkers(res.data);
    })
      .catch((res) => {
        console.log(res);
      });
      } else if (purpose=='Worker'&&division) {
        if (selectedWorker) {
          setWorkers([selectedWorker]);
        } else {
          WorkersServices.getAll({
            status: UserLifeCycleStates.ACTIVE,
            division: division?._id,
            withoutCoordinator: true })
        .then((res) => {
          console.log(res);
          setWorkers(res.data);
        })
       .catch((res) => {
         console.log(res);
       });
        }
      } else if (purpose=='Division'&&division) {
        if (requisition.designationParticular) {
          console.log('');
          WorkersServices.getWorkersByDesignation({
            division: division._id,
            designationParticular: requisition.designationParticular })
          .then((res) => {
            console.log(res);
            setWorkers(res.data);
          })
         .catch((res) => {
           console.log(res);
         });
        } else {
          WorkersServices.getAll({
            status: UserLifeCycleStates.ACTIVE,
            division: division?._id,
            withoutCoordinator: true })
          .then((res) => {
            console.log(res);
            setWorkers(res.data);
          })
         .catch((res) => {
           console.log(res);
         });
        }
      } else {
        setWorkers([]);
      }
    }
    // console.log(division, selectedWorker, subDivision, designationParticular);
  }, [purpose, division, selectedWorker, subDivision, designationParticular]);


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
    DesignationParticularService.getAll()
    .then((res) => {
      setDesignationParticulars(res.data);
    })
    .catch((error) =>
      enqueueSnackbar({
        variant: 'error',
        message: error.message,
      }),
    );
    FRServices.getMainCategory()
    .then((res) => {
      setMainCategories(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    // if (user.user && (user.user as User).kind == 'worker'&&(user.user as User).division) {
      if(Boolean(user.user && (user.user as User).kind == 'worker')){
        DivisionsServices.getDivisionById((user.user as User).division as unknown as string).then((res)=>{
          setDivision(res.data ?? null);
          setDivisions(res.data ? [res.data] : null);
        })
          
      }else{
        DivisionsServices.getDivisions().then((res)=>{
          // setDivision(res.data ?? null);
          setDivisions(res.data);
          // WorkersServices.getAll({
          //   status: UserLifeCycleStates.ACTIVE,
          //   division: res.data._id,
          //   withoutCoordinator: true })
          // .then((res) => {
          //   console.log(res);
          //   setWorkers(res.data);
          // })
          //  .catch((res) => {
           
          //    console.log(res);
          //  });'
          
          DivisionsServices.getSubDivisionsByDivisionId(division?._id??'' )
           .then((res2) => setSubDivisions(res2.data))
           // .then((res) => console.log(res.data, 'sec'))
           .catch((error) =>
             enqueueSnackbar({
               variant: 'error',
               message: error.message,
             }),
           );
        })
          .catch((error) =>
            enqueueSnackbar({
              variant: 'error',
              message: error.message,
            }),
    
          );
      }
    // } else {
      // DivisionsServices.getDivisions()
      // .then((res) =>
      //   setDivisions(res.data))
      // .catch((error) =>
      //   enqueueSnackbar({
      //     variant: 'error',
      //     message: error.message,
      //   }),
      // );
    // }
  }, []);

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
    { field: 'workerCode', width: 100, headerClassName: 'column-header', renderHeader: () => <b>{'Worker Code'}</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'firstName',
      width: 100,
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
      width: 100,
      headerClassName: 'column-header',
      renderHeader: () => <b>Last Name</b>,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    { field: 'division', width: 100,
      headerClassName: 'column-header', align: 'center', headerAlign: 'center', renderHeader: () => <b>Division</b>, valueGetter: (params) => params.row.division?.details?.name },
    {
      field: 'sub_division',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },
    {
      field: 'designation',
      width: 140,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Designation'}</b>,
      valueGetter: (params) => params.row.supportDetails?.designation?.name,
    },
    {
      field: 'prevBasic',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevBasic,
    },
    {
      field: 'last_updated_basic',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.basicLastUpdatedAt?moment( params.row.supportStructure?.basicLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'basic',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'row-current',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.basic,
    },


    {
      field: 'prevHRA',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevHRA,
    },
    {
      field: 'last_updated_HRA',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.HRALastUpdatedAt?moment( params.row.supportStructure?.HRALastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'HRA',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'row-current',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.HRA,
    },

    {
      field: 'prevSpouseAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevSpouseAllowance,
    },
    {
      field: 'last_updated_spouseAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.spouseAllowanceLastUpdatedAt?moment( params.row.supportStructure?.spouseAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'spouseAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.spouseAllowance,
    },

    {
      field: 'prevPositionalAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevPositionalAllowance,
    },
    {
      field: 'last_updated_positionalAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.positionalAllowanceLastUpdatedAt?moment( params.row.supportStructure?.positionalAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'positionalAllowance',
      width: 100,
      headerClassName: 'column-header',
      cellClassName: 'row-current',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,

      valueGetter: (params) => params.row.supportStructure?.positionalAllowance,
    },

    {
      field: 'prevSpecialAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevSpecialAllowance,
    },
    {
      field: 'last_updated_specialAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.specialAllowanceLastUpdatedAt?moment( params.row.supportStructure?.specialAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'specialAllowance',
      width: 100,
      headerClassName: 'column-header',
      cellClassName: 'row-current',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,

      valueGetter: (params) => params.row.supportStructure?.specialAllowance,
    },

    {
      field: 'prevImpactDeduction',
      width: 100,
      headerClassName: 'column-header',

      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevImpactDeduction,
    },
    {
      field: 'last_updated_impactDeduction',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.impactDeductionLastUpdatedAt?moment( params.row.supportStructure?.impactDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'impactDeduction',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'row-current',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.impactDeduction,
    },

    {
      field: 'prevTelAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevTelAllowance,
    },
    {
      field: 'last_updated_telAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.telAllowanceLastUpdatedAt?moment( params.row.supportStructure?.telAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'telAllowance',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'row-current',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.telAllowance,
    },

    {
      field: 'prevPIONMissionaryFund',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevPIONMissionaryFund,
    },
    {
      field: 'last_updated_PIONMissionaryFund',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.PIONMissionaryFundLastUpdatedAt?moment( params.row.supportStructure?.PIONMissionaryFundLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'PIONMissionaryFund',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'row-current',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.PIONMissionaryFund,
    },

    {
      field: 'prevMUTDeduction',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevMUTDeduction,
    },
    {
      field: 'last_updated_MUTDeduction',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.MUTDeductionLastUpdatedAt?moment( params.row.supportStructure?.MUTDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'MUTDeduction',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'row-current',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.MUTDeduction,
    },
    {
      field: 'total',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Amount'}</b>,
      valueGetter: (params) => params.row.supportStructure?.supportEnabled?(params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0):0,
    },
    {
      field: 'deduction',
      width: 100,
      headerClassName: 'column-header',
      cellClassName: 'row-current',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Deduction'}</b>,
      valueGetter: (params) => params.row.supportStructure?.supportEnabled?(params.row.supportStructure?.impactDeduction ?? 0) +
      // (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
      (params.row.supportStructure?.MUTDeduction ?? 0):0,
    },
    {
      field: 'net',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      cellClassName: 'row-current',
      headerAlign: 'center',
      renderHeader: () => <b>{'Net'}</b>,
      valueGetter: (params) => params.row.supportStructure?.supportEnabled?(params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0) -
      (
        (params.row.supportStructure?.impactDeduction ?? 0) +
        (params.row.supportStructure?.MUTDeduction ?? 0)
      ):0,
    },
    {
      field: 'supportEnabled',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Status'}</b>,
      valueGetter: (params) => params.row.supportStructure?.supportEnabled?'Yes':'No',
    }, {
      field: 'disabledFrom',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'From'}</b>,
      valueGetter: (params) => params.row.supportStructure?.disabledFrom? params.row.supportStructure?.disabledFrom?.format('DD/MM/YYYY'):'-',
    }, {
      field: 'disabledTo',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'To'}</b>,
      valueGetter: (params) => params.row.supportStructure?.disabledTo?params.row.supportStructure?.disabledTo?.format('DD/MM/YYYY'):'-',
    },
    {
      field: 'reason',
      width: 100,
      headerClassName: 'column-header',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Reason'}</b>,
      valueGetter: (params) => params.row.supportStructure?.reason ?? '',
    },

  ];
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: '.',
      description: '',
      headerClassName: 'column-grp',
      children: [{ field: 'actions' }],
    },
    {
      groupId: 'details',
      description: '',
      renderHeaderGroup: () => <b>{'Worker Details'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'workerCode' },
        { field: 'firstName' }, { field: 'lastName' }, { field: 'division' }, { field: 'sub_division' }, { field: 'designation' }],
    },
    {
      groupId: 'Basic',
      description: '',
      renderHeaderGroup: () => <b>{'Basic'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevBasic' }, { field: 'basic' }, { field: 'last_updated_basic' }],
    },
    {
      groupId: 'HRA',
      description: '',
      renderHeaderGroup: () => <b>{'HRA'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevHRA' }, { field: 'HRA' }, { field: 'last_updated_HRA' }],
    },
    {
      groupId: 'spouseAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Spouse Allowance'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevSpouseAllowance' }, { field: 'spouseAllowance' }, { field: 'last_updated_spouseAllowance' }],
    },
    {
      groupId: 'positionalAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Positional Allowance'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevPositionalAllowance' }, { field: 'positionalAllowance' }, { field: 'last_updated_positionalAllowance' }],
    },
    {
      groupId: 'specialAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Special Allowance'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevSpecialAllowance' }, { field: 'specialAllowance' }, { field: 'last_updated_specialAllowance' }],
    },
    {
      groupId: 'impactDeduction',
      description: '',
      renderHeaderGroup: () => <b>{'Impact Deduction'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevImpactDeduction' }, { field: 'impactDeduction' }, { field: 'last_updated_impactDeduction' }],
    },
    {
      groupId: 'telAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Tel Allowance'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevTelAllowance' }, { field: 'telAllowance' }, { field: 'last_updated_telAllowance' }],
    },
    {
      groupId: 'PNRMAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'PNRM Allowance'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevPIONMissionaryFund' }, { field: 'PIONMissionaryFund' }, { field: 'last_updated_PIONMissionaryFund' }],
    },
    {
      groupId: 'MUTDeduction',
      description: '',
      renderHeaderGroup: () => <b>{'WS Deduction'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'prevMUTDeduction' }, { field: 'MUTDeduction' }, { field: 'last_updated_MUTDeduction' }],
    },
    {
      groupId: 'Total',
      description: '',
      renderHeaderGroup: () => <b>{'Total'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'total' }, { field: 'deduction' }, { field: 'net' }],
    },
    {
      groupId: 'Support Status',
      description: '',
      renderHeaderGroup: () => <b>{'Support Status'}</b>,
      headerClassName: 'column-grp',
      children: [{ field: 'supportEnabled' }, { field: 'disabledFrom' }, { field: 'disabledTo' }, { field: 'reason' }],
    },

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
      <Card sx={{ width: '40%', borderRadius: 3, marginTop: 2 }}>
        <form onSubmit={(e)=>{
          e.preventDefault();
          setFrAction('add');
          setRequisition((requisition)=>({
            ...requisition,
            purposeWorker: requisition.purpose=='Worker'&&selectedWorker?selectedWorker:undefined,
            division: division??undefined,
            mainCategory: requisition?.particulars?requisition?.particulars[0]?.mainCategory:'Maintenance Of Priest & Preachers',
            particulars: requisition?.particulars&&requisition?.particulars?.length>0?[{
              _id: '',
              mainCategory: requisition?.particulars[0]?.mainCategory,
              subCategory1: requisition?.particulars[0]?.subCategory1,
              subCategory2: requisition?.particulars[0]?.subCategory2,
              subCategory3: requisition?.particulars[0]?.subCategory3,
              month: moment().format('MMMM'),
              narration: requisition?.particulars[0]?.narration,
              requestedAmount: total.net,
              unitPrice: total.net,
              quantity: supportEnabledWorkers?.length,
              attachment: fileObj? [fileObj]:[],
            }]:[],
          }));
        }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      value={purpose ?? null}
                      options={purposes.filter((pur)=>pur!='Others') ?? []}
                      getOptionLabel={(requisition) => requisition ?? ''}
                      onChange={(_e, selectedPurpose) => {
                        if (selectedPurpose) {
                          setRequisition((requisition)=>({
                            ...requisition,
                            purpose: selectedPurpose as FRPurpose,
                          }));
                        } else {
                          setRequisition((requisition)=>({
                            ...requisition,
                            purpose: undefined,
                            purposeSubdivision: undefined,
                          }));
                        }
                        setPurpose(selectedPurpose);
                        // setDivision(null);
                        setDesignationParticular(null);
                      }}
                      renderInput={(params) => <TextField {...params} label="Requisition For" required variant='standard'/>}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} >
                    <Autocomplete
                      // disabled={props.kind=='worker'}
                      options={divisions ?? []}
                      // value={(props.value.divisionHistory?.length>0)?props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division: null}
                      value={division}
                      getOptionLabel={(div) => div.details?.name}
                      onChange={(event, newVal) => {
                        if (newVal) {
                          const coordinator=newVal.details.coordinator?.name;
                          if (requisition.purpose==='Coordinator'&&coordinator) {
                            setRequisition((requisition)=>({
                              ...requisition,
                              division: newVal,
                              purposeCoordinator: workers?workers[0]:undefined,
                              purposeSubdivision: undefined,
                            }));
                          } else {
                            setRequisition((requisition)=>({
                              ...requisition,
                              division: newVal,
                              purposeSubdivision: undefined,
                            }));
                          }
                          setDivision(newVal);
                        } else {
                          setRequisition((requisition)=>({
                            ...requisition,
                            division: undefined,
                            purposeSubdivision: undefined,
                          }));
                          setDivision(null);
                        }
                        setSelectedWorker(null);
                        setDesignationParticular(null);
                      }
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Division" helperText={!divisions ? 'Loading divisions...' : 'Select a Division'} variant='standard'
                          required />
                      )}
                      disabled={Boolean(user.user && (user.user as User).kind == 'worker')}

                    />
                  </Grid>
                  {requisition.purpose==='Subdivision'&&
                               <Grid item xs={12} md={4}>
                                 <Autocomplete
                                   options={subDivisions ?? []}
                                   value={subDivision ?? null}
                                   getOptionLabel={(subDiv) => subDiv.name}
                                   onChange={(event, newVal) =>{
                                     if (newVal) {
                                       setRequisition((requisition)=>({
                                         ...requisition,
                                         purposeSubdivision: newVal,
                                       }));
                                     } else {
                                       setRequisition((requisition)=>({
                                         ...requisition,
                                         purposeSubdivision: undefined,
                                       }
                                       ));
                                     }
                                     setSubDivision(newVal);
                                   }}
                                   renderInput={(params) => <TextField {...params}
                                     label="Subdivision"
                                     helperText={!subDivisions ? 'Loading sub-divisions...' : 'Select a sub-division'}
                                     variant='standard' />}
                                 />
                               </Grid>
                  }
                  {requisition.purpose==='Worker'&&
              <Grid item xs={12} md={4}>
                <Autocomplete<IWorker>
                  value={selectedWorker ?? null}
                  options={(workers ?? [])}
                  getOptionLabel={(workers) => `${workers?.basicDetails.firstName} ${workers.basicDetails.lastName}`}
                  onChange={(_e, newVal) => {
                    setSelectedWorker(newVal);
                    if (newVal) {
                      setWorkers([newVal]);
                      setRequisition((requisition)=>({
                        ...requisition,
                        purposeWorker: newVal,
                      }));
                    } else {
                      setRequisition((requisition)=>({
                        ...requisition,
                        purposeWorker: undefined,
                      }));
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Choose Worker" required={requisition.purpose==='Worker'} variant='standard' />}
                  fullWidth
                />
              </Grid> }
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      value={designationParticular ?? null}
                      options={designationParticulars ?? []}
                      getOptionLabel={(des) => des.title ?? ''}
                      onChange={(_e, selectedDesignationParticular) => {
                        setDesignationParticular(selectedDesignationParticular);
                        if (selectedDesignationParticular&&division) {
                          setRequisition((requisition)=>({
                            ...requisition,
                            designationParticular: selectedDesignationParticular._id,
                            particulars: [{
                              _id: '',

                              mainCategory: mainCategories?.find((mainCat)=>mainCat._id==selectedDesignationParticular.mainCategory)?.name??'',

                              subCategory1: mainCategories?.find((mainCat)=>mainCat._id==selectedDesignationParticular.mainCategory)?.subcategory1
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory1)?.name??'',

                              subCategory2: mainCategories?.find((mainCat)=>mainCat._id==selectedDesignationParticular.mainCategory)?.subcategory1
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory1)?.subcategory2
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory2)?.name??'',

                              subCategory3: mainCategories?.find((mainCat)=>mainCat._id==selectedDesignationParticular.mainCategory)?.subcategory1
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory1)?.subcategory2
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory2)?.subcategory3
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory3)?.name??'',

                              narration: mainCategories?.find((mainCat)=>mainCat._id==selectedDesignationParticular.mainCategory)?.subcategory1
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory1)?.subcategory2
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory2)?.subcategory3
                                .find((subCat)=>subCat._id==selectedDesignationParticular.subCategory3)?.narration??'',

                              month: moment().format('MMMM'),
                              requestedAmount: total.net,
                              unitPrice: total.net,
                              quantity: supportEnabledWorkers?.length,
                              attachment: [],
                            }],
                          }));
                        } else {
                          setRequisition((requisition)=>({
                            ...requisition,
                            designationParticular: undefined,
                          }));
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Designation Particulars" variant='standard'/>}
                      fullWidth
                    />
                  </Grid>
                </Grid>
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

                      <Button
                        variant="contained"
                        color="info"
                        type='submit'
                      >
                        Raise FR
                      </Button>

                    }

                  />
                  {/* <br /> */}
                  {/* <Typography sx={{ fontSize: '12px', color: '#8c8d8f' }} >(Before raising the FR, click on Attach File to export as a sheet and attach with the FR )</Typography> */}
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
      <Dialog open={Boolean(frAction)} onClose={()=>setFrAction(null)} >
        <DialogContent >
          <FRForm
            value={frAction=='view'?requisition2 as CreatableFR:requisition}
            onChange={(newReq) => setRequisition(newReq)}
            action={frAction??'view'}
            onSubmit={addFR} // Pass the addFR function to the onSubmit prop
          />
        </DialogContent>
        { frAction=='view'&&
          <DialogActions>
            <Button
              variant="contained"
              color="info"
              type="submit"
              onClick={() => navigate(-1)}
            // disabled={particulars.length==0}
            >
                        Ok
            </Button>
          </DialogActions>
        }
      </Dialog>
      <Dialog open={confirmAttach} onClose={()=>setConfirmAttach(false)} maxWidth="xs" fullWidth>
        <DialogTitle> Add attachment?</DialogTitle>
        <DialogContent>
          <Container>FR created. Do you want to add attachment &nbsp;
            {pdfProps&&
            <PDFDownloadLink
              document={<PDFTemplate
                divisionId={pdfProps?.divisionId}
                workerId={pdfProps?.workerId}
                purpose={pdfProps?.purpose}
                designationParticularID={pdfProps?.designationParticularID}
                subDivisionId={pdfProps?.subDivisionId}
                FrNo={pdfProps?.FrNo}
                FrMonth={pdfProps?.FrMonth}/>}
              fileName="WorkerSupport.pdf"
              style={{ color: 'blue' }}
            >
              {({ loading }) => loading?'....':'WorkerSupport.pdf'}

            </PDFDownloadLink>} ?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmAttach(false);
            }}
            variant="text"
          >
            No, Cancel
          </Button>
          {(selectedWorker || division)&&pdfProps && (
            <PDFDownloadLink
              document={<PDFTemplate
                divisionId={pdfProps?.divisionId}
                workerId={pdfProps?.workerId}
                purpose={pdfProps?.purpose}
                designationParticularID={pdfProps?.designationParticularID}
                subDivisionId={pdfProps?.subDivisionId}
                FrNo={pdfProps?.FrNo}
                FrMonth={pdfProps?.FrMonth}/>}
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
                      attach(blob);
                    }
                  }}
                  disabled={loading} >
                  {loading?'Loading...':'Yes, Attach'}
                </Button>
                </>
              )}
            </PDFDownloadLink>
          )}
        </DialogActions>
      </Dialog>
    </CommonPageLayout>
  );
};

export default WorkerSupportPage;
