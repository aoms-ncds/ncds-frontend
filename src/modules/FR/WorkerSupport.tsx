import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridColumnGroupingModel, GridRowParams } from '@mui/x-data-grid';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import GridLinkAction from '../../components/GridLinkAction';
import { Preview as PreviewIcon, Download as DownloadIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import WorkersServices from '../Workers/extras/WorkersServices';
import moment from 'moment';

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
  const [workers, setWorkers] = useState<IWorker[] | null>(null);

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
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '16px' }}>
      {columns.map((column) => (
        <div key={column.field} style={{ width: column.width, textAlign: 'center' }}>
          <b> { typeof total[column.field as keyof TotalSupportStructure] ==='number'?total[column.field as keyof TotalSupportStructure]:null}
          </b>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE })
      .then((res) => {
        console.log(res);
        setWorkers(res.data);
        console.log( 'basic', res.data.reduce(
          (total, worker) => worker.supportStructure?.basic? total + Number(worker.supportStructure?.basic):total,
          0,
        ));
        const basic= res.data.reduce(
          (total, worker) =>worker.supportStructure?.basic? total + Number(worker.supportStructure?.basic):total,
          0,
        );
        const prevBasic= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevBasic? total + Number(worker.supportStructure?.prevBasic):total,
          0,
        );
        const HRA= res.data.reduce(
          (total, worker) =>worker.supportStructure?.HRA? total + Number(worker.supportStructure?.HRA):total,
          0,
        );
        const prevHRA= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevHRA? total + Number(worker.supportStructure?.prevHRA):total,
          0,
        );
        const spouseAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.spouseAllowance? total + Number(worker.supportStructure?.spouseAllowance):total,
          0,
        );
        const prevSpouseAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevSpouseAllowance? total + Number(worker.supportStructure?.prevSpouseAllowance):total,
          0,
        );
        const positionalAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.positionalAllowance? total + Number(worker.supportStructure?.positionalAllowance):total,
          0,
        );
        const prevPositionalAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevPositionalAllowance? total + Number(worker.supportStructure?.prevPositionalAllowance):total,
          0,
        );
        const specialAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.specialAllowance? total + Number(worker.supportStructure?.specialAllowance):total,
          0,
        );
        const prevSpecialAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevSpecialAllowance? total + Number(worker.supportStructure?.prevSpecialAllowance):total,
          0,
        );
        const impactDeduction= res.data.reduce(
          (total, worker) =>worker.supportStructure?.impactDeduction? total + Number(worker.supportStructure?.impactDeduction):total,
          0,
        );
        const prevImpactDeduction= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevImpactDeduction? total + Number(worker.supportStructure?.prevImpactDeduction):total,
          0,
        );
        const telAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.telAllowance? total + Number(worker.supportStructure?.telAllowance):total,
          0,
        );
        const prevTelAllowance= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevTelAllowance? total + Number(worker.supportStructure?.prevTelAllowance):total,
          0,
        );
        const PIONMissionaryFund= res.data.reduce(
          (total, worker) =>worker.supportStructure?.PIONMissionaryFund? total + Number(worker.supportStructure?.PIONMissionaryFund):total,
          0,
        );
        const prevPIONMissionaryFund= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevPIONMissionaryFund? total + Number(worker.supportStructure?.prevPIONMissionaryFund):total,
          0,
        );
        const MUTDeduction= res.data.reduce(
          (total, worker) =>worker.supportStructure?.MUTDeduction? total + Number(worker.supportStructure?.MUTDeduction):total,
          0,
        );
        const prevMUTDeduction= res.data.reduce(
          (total, worker) =>worker.supportStructure?.prevMUTDeduction? total + Number(worker.supportStructure?.prevMUTDeduction):total,
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
          (telAllowance ?? 0),
          deduction: (impactDeduction ?? 0) +
          (PIONMissionaryFund ?? 0) +
          (MUTDeduction ?? 0),
          net: (basic ?? 0) +
          (HRA ?? 0) +
          (spouseAllowance ?? 0) +
          (positionalAllowance ?? 0) +
          (specialAllowance ?? 0) +
          (telAllowance ?? 0) -
          (
            (impactDeduction ?? 0) +
            (PIONMissionaryFund ?? 0) +
            (MUTDeduction ?? 0)
          ),
        });
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const columns: GridColDef<IWorker>[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params: GridRowParams) =>
        [
          <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/users/worker/${params.row._id}`} />,
          // <GridLinkAction key={2} label="Edit" icon={<EditIcon />} showInMenu to={`/workers/edit/${params.row._id}`} />,
          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    { field: 'workerCode', width: 100, renderHeader: () => <b>{'Worker Code'}</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'firstName',
      width: 100,
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
      renderHeader: () => <b>Last Name</b>,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    { field: 'division', width: 100, align: 'center', headerAlign: 'center', renderHeader: () => <b>Division</b>, valueGetter: (params) => params.row.division?.details.name },
    {
      field: 'sub_division',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },
    {
      field: 'prevBasic',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevBasic,
    },
    {
      field: 'last_updated_basic',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.basicLastUpdatedAt?moment( params.row.supportStructure?.basicLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'basic',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.basic,
    },


    {
      field: 'prevHRA',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevHRA,
    },
    {
      field: 'last_updated_HRA',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.HRALastUpdatedAt?moment( params.row.supportStructure?.HRALastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'HRA',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.HRA,
    },

    {
      field: 'prevSpouseAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevSpouseAllowance,
    },
    {
      field: 'last_updated_spouseAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.spouseAllowanceLastUpdatedAt?moment( params.row.supportStructure?.spouseAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'spouseAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.spouseAllowance,
    },

    {
      field: 'prevPositionalAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevPositionalAllowance,
    },
    {
      field: 'last_updated_positionalAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.positionalAllowanceLastUpdatedAt?moment( params.row.supportStructure?.positionalAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'positionalAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,

      valueGetter: (params) => params.row.supportStructure?.positionalAllowance,
    },

    {
      field: 'prevSpecialAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,

      valueGetter: (params) => params.row.supportStructure?.prevSpecialAllowance,
    },
    {
      field: 'last_updated_specialAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.specialAllowanceLastUpdatedAt?moment( params.row.supportStructure?.specialAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'specialAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,

      valueGetter: (params) => params.row.supportStructure?.specialAllowance,
    },

    {
      field: 'prevImpactDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevImpactDeduction,
    },
    {
      field: 'last_updated_impactDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.impactDeductionLastUpdatedAt?moment( params.row.supportStructure?.impactDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'impactDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.impactDeduction,
    },

    {
      field: 'prevTelAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevTelAllowance,
    },
    {
      field: 'last_updated_telAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.telAllowanceLastUpdatedAt?moment( params.row.supportStructure?.telAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'telAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.telAllowance,
    },

    {
      field: 'prevPIONMissionaryFund',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevPIONMissionaryFund,
    },
    {
      field: 'last_updated_PIONMissionaryFund',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.PIONMissionaryFundLastUpdatedAt?moment( params.row.supportStructure?.PIONMissionaryFundLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'PIONMissionaryFund',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.PIONMissionaryFund,
    },

    {
      field: 'prevMUTDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevMUTDeduction,
    },
    {
      field: 'last_updated_MUTDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.MUTDeductionLastUpdatedAt?moment( params.row.supportStructure?.MUTDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'MUTDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.MUTDeduction,
    },
    {
      field: 'total',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Amount'}</b>,
      valueGetter: (params) => (params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0),
    },
    {
      field: 'deduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Deduction'}</b>,
      valueGetter: (params) => (params.row.supportStructure?.impactDeduction ?? 0) +
      (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
      (params.row.supportStructure?.MUTDeduction ?? 0),
    },
    {
      field: 'net',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Net'}</b>,
      valueGetter: (params) => (params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0) -
      (
        (params.row.supportStructure?.impactDeduction ?? 0) +
        (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
        (params.row.supportStructure?.MUTDeduction ?? 0)
      ),
    },

  ];
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'details',
      description: '',
      renderHeaderGroup: () => <b>{'Worker Details'}</b>,
      children: [{ field: 'workerCode' },
        { field: 'firstName' }, { field: 'lastName' }, { field: 'division' }, { field: 'sub_division' }],
    },
    {
      groupId: 'Basic',
      description: '',
      renderHeaderGroup: () => <b>{'Basic'}</b>,
      children: [{ field: 'prevBasic' }, { field: 'basic' }, { field: 'last_updated_basic' }],
    },
    {
      groupId: 'HRA',
      description: '',
      renderHeaderGroup: () => <b>{'HRA'}</b>,
      children: [{ field: 'prevHRA' }, { field: 'HRA' }, { field: 'last_updated_HRA' }],
    },
    {
      groupId: 'spouseAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Spouse Allowance'}</b>,
      children: [{ field: 'prevSpouseAllowance' }, { field: 'spouseAllowance' }, { field: 'last_updated_spouseAllowance' }],
    },
    {
      groupId: 'positionalAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Positional Allowance'}</b>,
      children: [{ field: 'prevPositionalAllowance' }, { field: 'positionalAllowance' }, { field: 'last_updated_positionalAllowance' }],
    },
    {
      groupId: 'specialAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Special Allowance'}</b>,
      children: [{ field: 'prevSpecialAllowance' }, { field: 'specialAllowance' }, { field: 'last_updated_specialAllowance' }],
    },
    {
      groupId: 'impactDeduction',
      description: '',
      renderHeaderGroup: () => <b>{'Impact Deduction'}</b>,
      children: [{ field: 'prevImpactDeduction' }, { field: 'impactDeduction' }, { field: 'last_updated_impactDeduction' }],
    },
    {
      groupId: 'telAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Tel Allowance'}</b>,
      children: [{ field: 'prevTelAllowance' }, { field: 'telAllowance' }, { field: 'last_updated_telAllowance' }],
    },
    {
      groupId: 'PNRMAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'PNRM Allowance'}</b>,
      children: [{ field: 'prevPIONMissionaryFund' }, { field: 'PIONMissionaryFund' }, { field: 'last_updated_PIONMissionaryFund' }],
    },
    {
      groupId: 'MUTDeduction',
      description: '',
      renderHeaderGroup: () => <b>{'WS Deduction'}</b>,
      children: [{ field: 'prevMUTDeduction' }, { field: 'MUTDeduction' }, { field: 'last_updated_MUTDeduction' }],
    },
    {
      groupId: 'Total',
      description: '',
      renderHeaderGroup: () => <b>{'Total'}</b>,
      children: [{ field: 'total' }, { field: 'deduction' }, { field: 'net' }],
    },

  ];
  return (
    <CommonPageLayout title="New Workers for Approval">
      <Card>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <Button
              onClick={async () => {
                const sheet = workers ?
                  workers.map((user: IWorker) => [
                    user.workerCode,
                    user.basicDetails.firstName,
                    user.basicDetails.lastName,
                    user.division?.details.name,
                    user.officialDetails.divisionHistory[user.officialDetails.divisionHistory.length - 1].subDivision,
                    user.basicDetails.phone,
                    user.basicDetails.email,
                    user.basicDetails.alternativePhone,
                    user.basicDetails.dateOfBirth,
                    user.basicDetails.field,
                    user.basicDetails.martialStatus,
                    user.basicDetails.knownLanguages?.map((lang) => lang.name)?.join(', '),
                    user.basicDetails.highestQualification,
                    user.status && UserLifeCycleStates.getStatusNameByCode(user.status as number),
                    user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                    user.officialDetails.status == 'Left' && user.officialDetails.dateOfLeaving ?
                      user.officialDetails.dateOfLeaving?.from(user.officialDetails.dateOfJoining, true) :
                      user.officialDetails.dateOfJoining?.fromNow(true),
                    user.spouse?.spouseCode,
                    user.spouse && user.spouse?.firstName + ' ' + user.spouse?.lastName,
                    (user.supportStructure?.basic ?? 0) +
                        (user.supportStructure?.HRA ?? 0) +
                        (user.supportStructure?.spouseAllowance ?? 0) +
                        (user.supportStructure?.positionalAllowance ?? 0) +
                        (user.supportStructure?.specialAllowance ?? 0) +
                        (user.supportStructure?.telAllowance ?? 0),
                    user.insurance?.impactNo,
                  ]) :
                  [];
                const headers = [
                  'Workers Code',
                  'First Name',
                  'Last Name',
                  'Division',
                  'Sub Division',
                  'Mobile No',
                  'Email ID',
                  'Alt Phone',
                  'DOB',
                  'Field',
                  'Marital Status',
                  'Known Languages',
                  'Highest Qualifications',
                  'Status',
                  'Date of Joining',
                  'No of year in Org',
                  'Spouse Code',
                  'Spouse Name',
                  'Net Support',
                  'Insurance No',
                ];
                const worksheet = XLSX.utils.json_to_sheet(sheet);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                XLSX.writeFile(workbook, 'Approve_Worker_Report.xlsx', { compression: true });
              }}
              startIcon={<DownloadIcon />}
              color="primary"
              sx={{ float: 'right', mt: 2, mr: 2 }}
              variant="contained"
            >
              Export
            </Button>
          </Grid> */}
          <Grid item xs={12}>
            <DataGrid rows={workers ?? []}
              columns={columns}
              getRowId={(row) => row._id}
              loading={workers === null}
              columnGroupingModel={columnGroupingModel}
              experimentalFeatures={{ columnGrouping: true }}
              slots={{
                footer: CustomFooter,
              }}
              slotProps={{
                // footer: { 'fff' },
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </CommonPageLayout>
  );
};

export default WorkerSupportPage;
