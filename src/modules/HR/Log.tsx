import {
  Preview as PreviewIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import GridLinkAction from '../../components/GridLinkAction';
import CommonPageLayout from '../../components/CommonPageLayout';
import UserServices from '../User/extras/UserServices';
import { Avatar, Grid, Card, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import moment from 'moment';

const Log = () => {
  const [users, setUsers] = useState<ILog[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  useEffect(() => {
    UserServices.getAllLog(dateRange)
      .then((log) => setUsers(log.data))
      .catch((err) => {
        console.log(err);
      });
  }, [dateRange]);
  console.log(users, 'dd');

  const columns: GridColDef<ILog>[] = [
    {
      field: 'actions',
      type: 'actions',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>{'Action'}</b>,
      width: 80,
      getActions: (params: GridRowParams) =>
        [
          <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/users/${params.row.user.kind}/${params.row.user._id}`} />,
          // hasPermissions(['MANAGE_WORKER']) && (
          //   <GridLinkAction
          //     key={2}
          //     label="Edit"
          //     icon={<EditIcon />}
          //     onClick={() => {
          //       window.open(`/${params.row.user.kind === 'worker' ? 'workers' : 'hr'}/edit/${params.row.user._id}`);
          //     }}
          //     showInMenu
          //     to={`/${params.row.user.kind === 'worker' ? 'workers' : 'hr'}/edit/${params.row.user._id}`} />
          // ),

        ],
    },
    {
      field: 'imageURL',
      headerName: '',
      headerClassName: 'super-app-theme--cell',
      width: 25,
      minWidth: 65,
      type: 'string',
      renderCell: (props) => {
        return <Avatar src={props?.row?.user?.imageURL&&props?.row?.user?.imageURL.replace('uc', 'thumbnail')} />;
      },
    },
    // { field: '_id', headerName: 'SI No', width: 70 },
    // {
    //   field: `${params.row.user.kind}Code`,
    //   headerName: `${params.row.user.kind == 'staff' ? 'Staff' : 'Worker'} Code`,
    //   width: 120,
    //   headerClassName: 'super-app-theme--cell',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{`${params.row.user.kind == 'staff' ? 'Staff' : 'Worker'} Code`}</b>,
    // },
    {
      field: 'firstName',
      align: 'center',
      headerClassName: 'super-app-theme--cell',

      headerAlign: 'center',
      width: 150,
      renderHeader: () => <b>{'First Name'}</b>,
      valueGetter: (params) => params?.row?.user?.basicDetails?.firstName,
    },
    {
      field: 'lastName',
      align: 'center',
      width: 150,
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderHeader: () => <b>{'Last Name'}</b>,
      valueGetter: (params) => params?.row?.user?.basicDetails?.lastName,
    },
    {
      field: 'division',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      width: 150,
      headerAlign: 'center',
      renderHeader: () => <b>{'Division'}</b>,
      valueGetter: (params) => params.row?.user?.division?.details?.name,
    },
    {
      field: 'sub_division',
      width: 150,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      // valueGetter: (params) => params.row.user?.officialDetails?.divisionHistory[params?.row?.user?.officialDetails?.divisionHistory?.length - 1]?.subDivision?.name,
      valueGetter: (params) => {
        const divisionHistory = params?.row?.user?.officialDetails?.divisionHistory;
        if (divisionHistory && divisionHistory.length > 0) {
          const lastDivision = divisionHistory[divisionHistory.length - 1];
          if (lastDivision && lastDivision.subDivision) {
            return lastDivision.subDivision.name;
          }
        }
        return '';
      },
    },
    //
    //   field: 'highestQualification',
    //   headerName: 'Highest Qualification',
    //   width: 160,
    //   valueGetter: (params) => params.row.user.basicDetails.highestQualification,
    // },
    // {
    //   field: 'motherTongue',
    //   headerName: 'Mother Tongue',
    //   width: 130,
    //   valueGetter: (params) => params.row.user.basicDetails.motherTongue,
    // },
    // {
    //   field: 'communicationLanguage',
    //   headerName: 'Communication Language',
    //   width: 185,
    //   valueGetter: (params) => params.row.user.basicDetails.communicationLanguage,
    // },
    // {
    //   field: 'languagesKnown',
    //   headerName: 'Languages Known',
    //   width: 140,
    //   valueGetter: (params) => params.row.user.basicDetails.knownLanguages?.join(', '),
    // },
    // {
    //   field: 'designation',
    //   width: 140,
    //   headerClassName: 'super-app-theme--cell',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => <b>{'Designation'}</b>,
    //   valueGetter: (params) => params.row.user.supportDetails?.designation?.name,
    // },
    {
      field: 'phone',
      width: 130,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Mobile Number'}</b>,
      valueGetter: (params) => params?.row?.user?.basicDetails?.phone,
    },
    // {
    //   field: 'alternativeMobileNumber',
    //   width: 220,
    //   align: 'center',
    //   renderHeader: () => (
    //     <b>
    //       {'Alternate Mobile Number'}
    //     </b>
    //   ),
    //   valueGetter: (params) => params.row.user.basicDetails.alternativePhone,
    // },
    {
      field: 'email',
      width: 180,
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <b>{'Email ID'}</b>,
      valueGetter: (params) => params?.row.user?.basicDetails?.email,
    },
    {
      field: 'loginAt',
      width: 180,
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <b>{'Login At'}</b>,
      valueGetter: (params) => params.row.createdAt?.format('hh:mm A DD/MM/YYYY'),
    },
    // {
    //   field: 'PANnumber',
    //   headerName: 'PAN Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.user.basicDetails.PANNo,
    // },
    // {
    //   field: 'aadhaarNumber',
    //   headerName: 'Aadhaar Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.user.basicDetails.aadhaar?.aadhaarNo,
    // },
    // {
    //   field: 'voterId',
    //   headerName: 'Voter Id',
    //   // width: 130,
    //   valueGetter: (params) => params.row.user.basicDetails.voterId?.voterIdNo,
    // },
    // {S
    //   field: 'licenseNumber',
    //   headerName: 'License Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.user.basicDetails.licenseNumber,
    // },
  ];
  return (
    <CommonPageLayout title="Login Logs" momentFilter={{
      dateRange: dateRange,
      onChange: (newDateRange) => {
        setDateRange(newDateRange);
        setUsers((user) => (user ? user.filter((u) => u.createdAt.isSameOrAfter(newDateRange.startDate) && u.createdAt.isSameOrBefore(newDateRange.endDate)) : []));
      },
      rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
      initialRange: 'months',
    }}>

      {/* </Grid> */}


      <Grid item xs={12} md={12}>
        <Card style={{ height: '60vh', width: '100%' }}>
          <Box
            sx={{
              'height': 300,
              'width': '100%',
              '& .super-app-theme--cell': {
                backgroundColor: '#f1f5fa',
                color: 'black',
                fontWeight: '600',
              },
              '& .super-app.negative': {
                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                color: '#1a3e72',
                fontWeight: '600',
              },
              '& .super-app.positive': {
                backgroundColor: '#d47483',
                color: '#1a3e72',
                fontWeight: '600',
              },
              '& .even': {
                backgroundColor: '#DEDAFF', // Change to red for even rows
              },
              '& .odd': {
                backgroundColor: '#fff', // Change to blue for odd rows
              },
            }}
          >

            <DataGrid rows={users ?? []} sx={{ height: '55vh', width: '100%' }} columns={columns} getRowId={(row) => row._id} loading={users === null} getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            } />
          </Box>

        </Card>
      </Grid>

    </CommonPageLayout>
  );
};

export default Log;
