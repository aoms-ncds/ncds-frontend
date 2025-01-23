/* eslint-disable max-len */

import { Grid, TextField, Button, Box, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { GridColDef, GridCellParams, DataGrid } from '@mui/x-data-grid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import { useState, SetStateAction, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import ESignatureService from '../Settings/extras/ESignatureService';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import { Preview as PreviewIcon, Print as PrintIcon, Download as DownloadIcon, Edit as EditIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import CommonPageLayout from '../../components/CommonPageLayout';
import FRReceiptTemplate from '../FR/components/FRReceiptTemplate';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import IROServices from './extras/IROServices';
import FRServices from '../FR/extras/FRServices';
import IROTemplate from './components/IROTemplate';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { useAuth } from '../../hooks/Authentication';

const ReopenedIRO = () => {
  const [closedFRs, setClosedFRs] = useState<IROrder[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [iroData, setIroData] = useState<IROrder | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [mngrName, setMngrName] = useState('');

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const user = useAuth();
  console.log(user, 'user21');

  const [printIroLoading, setPrintIroLoading] = useState(false);
  const [selectedSignature, setSignature] = useState<Esignature>({
    _id: '',
    officeManagerSignature: {
      filename: '',
      size: 0,
      type: 'application/vnd.ms-excel',
      storage: 'S3',
      fileId: '',
      downloadURL: null,
      private: false,
      status: 0,
      _id: '',
      base64: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
  });
  const [signaturePresident, setSignaturePresident] = useState<EsignaturePresident>({
    _id: '',
    presidentSignature: {
      filename: '',
      size: 0,
      type: 'application/vnd.ms-excel',
      storage: 'S3',
      fileId: '',
      downloadURL: null,
      private: false,
      status: 0,
      _id: '',
      base64: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
  });
  const [FrData, setFrData] = useState<FR | null>(null);
  const [conform, setConform] = useState<boolean>(false);
  const [conform1, setConform1] = useState<boolean>(false);
  useEffect(() => {
    ESignatureService.getESignature()
        .then((res) => {
          console.log({ res });
          setSignature(res.data as Esignature);
          setMngrName((res.data as { officeManagerName: string }).officeManagerName);
          setSignaturePresident(res.data as EsignaturePresident);
        })
        .catch((res) => {
          console.log(res);
        });
    console.log(selectedSignature);
  }, []);
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const filteredRows = (closedFRs ?? []).filter((row) => {
    if ((row.IROno && row.IROno?.toLowerCase().includes(searchText?.toLowerCase())) ||
    (row.IRODate && row.IRODate.format('DD/MM/YYYY').toLowerCase().includes(searchText?.toLowerCase()))||
    // (row.particulars[0]?.subCategory1 && row.particulars[0]?.subCategory1.toLowerCase().includes(searchText.toLowerCase())) ||
    //   (row.particulars[0]?.subCategory2 && row.particulars[0]?.subCategory2.toLowerCase().includes(searchText.toLowerCase())) ||
    //   (row.particulars[0]?.subCategory3 && row.particulars[0]?.subCategory3.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.division?.details.name && row.division?.details.name.toLowerCase().includes(searchText.toLowerCase()))
    ) {
      return true;
    }
    return Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase()));
  });
  if (searchText && filteredRows.length ===0) {
    enqueueSnackbar({
      message: ` ${searchText} not found`,
      variant: 'warning',
    });
  }
  const attach = async (blob: Blob) => {
    try {
      if (iroData) {
        // File Blob creation
        const fileBlob = blob instanceof Blob ? new File([blob], `${iroData?.IROno}_Receipt.pdf`, { type: 'application/pdf' }) : null;
        if ( fileBlob) {
          // File upload
          const file = await FileUploaderServices.uploadFile(fileBlob, undefined, 'FR', fileBlob.name);

          if (file.success) {
            // Update FR request
            const res= await IROServices.close(iroData._id, file.data._id);
            // const filterIRO = reconciliationIRO?.filter((reconciliationIROs) => {
            //   return reconciliationIROs._id !== res.data.iro._id;
            // });
            // setReconcilationIRO(filterIRO);
            // Update local state and UI
            setIroData(null);
            setConform1(false);
            enqueueSnackbar({
              message: 'File Attached',
              variant: 'success',
            });
            enqueueSnackbar({
              message: 'IRO updated',
              variant: 'success',
            });
            window.location.reload();
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

  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const columns:GridColDef<IROrder>[] = [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
      minWidth: 50,
      type: 'string',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[
            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: Link,
            //   to: '/view' + props.row._id,
            //   icon: PrintIcon,
            // },
            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: PDFDownloadLink,
            //   document: <FRReceiptTemplate president={selectedSignaturePresident} rowData={props.row as FR }/>,
            //   fileName: 'FRReceipt.pdf',
            //   icon: PrintIcon,
            // },
            {
              id: 'View',
              text: 'View Fr ',
              icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(params.row as any).FR}/view`,
              onClick: () => {
                window.open( `/fr/${(props.row as any).FR}/view`, '_blank');
              },

            },
            ...(hasPermissions(['ADMIN_ACCESS']) || hasPermissions(['OFFICE_MNGR_ACCESS']) || hasPermissions(['ACCOUNTS_MNGR_ACCESS'])||hasPermissions(['LOCAL_ACCOUNT_ACCESS'])||hasPermissions(['FCRA_ACCOUNTS_ACCESS'])?
              [

                {
                  id: 'edit',
                  text: 'Edit',
                  component: Link,
                  // to: `/iro/${params.row._id}/edit`,
                  onClick: () => {
                    window.open(`/iro/${props.row._id}/edit`, '_blank');
                  },
                  icon: EditIcon,
                },
              ]:[]),
            ...(!hasPermissions(['ADMIN_ACCESS']) || !hasPermissions(['OFFICE_MNGR_ACCESS']) || !hasPermissions(['ACCOUNTS_MNGR_ACCESS'])||!hasPermissions(['LOCAL_ACCOUNT_ACCESS'])||!hasPermissions(['FCRA_ACCOUNTS_ACCESS'])?
              [


                {
                  id: 'edit',
                  text: 'Edit for coordinator',
                  component: Link,
                  // to: `/iro/${params.row._id}/edit`,
                  onClick: () => {
                    window.open(`/iro/${props.row._id}/EditIROForRevert`, '_blank');
                  },
                  icon: EditIcon,
                },
              ]:[]),

            // {
            //   id: 'View',
            //   text: 'Close IRO ',
            //   component: Link,
            //   onClick: async () => {
            //     try {
            //       // Fetch the first API data

            //       // Update the state

            //       // Wait for the state update to complete
            //       await new Promise((resolve) => setTimeout(resolve, 0));

            //       // Perform the second API call using the updated requisition
            //       const res2 = await IROServices.close(props.row._id);
            //       console.log(res2);

            //       // Show success message
            //       // enqueueSnackbar({
            //       //   message: 'FR Reopened',
            //       //   variant: 'success',
            //       // });
            //       window.location.reload();
            //     } catch (error) {
            //       // Handle errors
            //       enqueueSnackbar({
            //         variant: 'error',
            //         // message: err.message,
            //       });
            //     }
            //   },
            //   icon: PreviewIcon,
            // },
            {
              id: 'Close IRO',
              text: 'Close IRO',
              icon: PreviewIcon,
              onClick: () => {
                setIroData(props.row);
                setConform1(true);
                if (props?.row.FR) {
                  FRServices.getById(props.row.FR).then((res) => {
                    setFrData(res.data);
                    console.log(res.data, 'fr');
                  });
                }
                setPrintIroLoading(true);
                setTimeout(() => {
                  setPrintIroLoading(false);
                  // window.location.reload();
                }, 2000);
              },
            },
          ]}
        />
      ),
    },
    { field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 100, align: 'center',
      headerAlign: 'center' },
    // { field: 'FRdate', align: 'center',
    //   headerAlign: 'center', renderHeader: () => (<b>FR Date</b>), width: 90, renderCell: (props) => (
    //     <p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    //   ) },
    {
      field: 'IRODate',
      headerName: 'IRODate',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      align: 'center', headerAlign: 'center',
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details.name,
      width: 150,
    },
    {
      field: 'subDivisionName',
      renderHeader: () => (<b>Sub Division Name</b>),
      align: 'center', headerAlign: 'center',
      // renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
      valueGetter: (params) => params.row.purposeSubdivision?.name,

      width: 170,
    },
    {
      field: 'mainCategory',
      renderHeader: () => (<b>Main Category</b>),
      width: 240,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 240,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {props.row.mainCategory}
        </p>
      ),
    },
    {
      field: 'subCategory',
      renderHeader: () => <b>Sub Category</b>,
      width: 240,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        const subCategory3 = params.row.particulars[0]?.subCategory3;
        const subCategory2 = params.row.particulars[0]?.subCategory2;
        const subCategory1 = params.row.particulars[0]?.subCategory1;
        if (subCategory3 && subCategory3 !== 'Select' && subCategory3 !== '') {
          return subCategory3;
        } else if (subCategory2 && subCategory2 !== 'Select' && subCategory2 !== '') {
          return subCategory2;
        } else {
          return subCategory1;
        }
      },
      renderCell: (params) => {
        return (
          <p
            style={{
              maxWidth: 240,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {params.value}
          </p>
        );
      },
    },
    {
      field: 'requestAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 140,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount || 0), // Ensure we handle potential undefined values
          0,
        );
        return particularAmount || 0; // Return 0 if the total is undefined
      },
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount || 0),
          0,
        );
        return <p>{particularAmount}</p>;
      },
    },
    { field: 'updatedAt', align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Last Updated</b>),
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    IROServices.getAll({ dateRange: dateRange, status: [FRLifeCycleStates.REOPENED]})
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [dateRange]);
  return (
    <CommonPageLayout title="Reopened IRO" momentFilter={{
      dateRange: dateRange,
      onChange: (newDateRange) => {
        setDateRange(newDateRange);
        setClosedFRs((fr) => (fr ? fr.filter((fr) => fr?.iroClosedOn?.isSameOrAfter(newDateRange.startDate) && fr.iroClosedOn?.isSameOrBefore(newDateRange.endDate)) : []));
      },
      rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
      initialRange: 'months',
    }}>
      <Card sx={{ maxWidth: '78vw', height: '85vh', alignItems: 'center' }} >
        <Grid container spacing={2} padding={2} >
          <Grid item xs={6}>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              placeholder='Enter FRno or FRDate or Division or SubCategory'
              onChange={handleSearchChange}
              fullWidth
              // style={{ width: '80%' }}
            />
            {/* </div> */}
          </Grid>
          {/* <Grid item xs={6} sx={{ px: 2 }}>
            <PermissionChecks
              permissions={['MANAGE_FR']}
              granted={(
                <Button
                  onClick={async () => {
                    const sheet =
                    closedFRs ?
                      closedFRs.map((fr:FR) => ([
                        fr.FRno,
                        fr.FRdate.format('DD/MM/YYYY'),
                        fr.division?.details.name,
                        fr.purposeSubdivision?.name,
                        fr.mainCategory,
                        fr.particulars?.reduce(
                          (total, particular) => total + Number(particular.requestedAmount),
                          0,
                        ),
                        fr.sanctionedAmount,
                        fr.sanctionedBank,
                        fr.sanctionedAsPer,
                        IROLifeCycleStates.getStatusNameByCodeTransaction(fr.status).replaceAll('_', ' '),
                      ])) :
                      [];
                    const headers=[
                      'IRO No',
                      'Date',
                      'Division',
                      'Sub Division',
                      'Main Category',
                      'Requested Amt',
                      'Sanctioned Amt',
                      'Sanctioned Bank',
                      'Sanctioned As per',
                      'Status',
                    ];
                    const worksheet = XLSX.utils.json_to_sheet(sheet);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                    XLSX.writeFile(workbook, 'Closed_FR_Report.xlsx', { compression: true });
                  }}
                  startIcon={<DownloadIcon />}
                  color="primary" sx={{ float: 'right', mt: 2, mr: 2 }}
                  variant="contained"
                >
                              Export
                </Button>
              )}/>
          </Grid> */}
          <Grid item xs={12} >
            <Box
              sx={{
                'height': 450,
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

              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={closedFRs === null} style={{ height: '70vh', width: '100%' }} getRowClassName={(params) => {
                if (params.row.specialsanction == 'Yes') {
                  return 'special-sanction'; // Class for rows with special sanction
                }
                return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
              }}
              />
            </Box>
          </Grid>
        </Grid>

      </Card>
      <Dialog open={Boolean(conform1)} onClose={() => setConform1(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Container>
            {`Are you sure you want to close this IRO No ${iroData?.IROno} from ${iroData?.division?.details.name} related to FR No ${FrData?.FRno?? ''} ?`}
            <br />
            {iroData && mngrName&&selectedSignature&&FrData&& (
              <PDFDownloadLink
                document={<IROTemplate rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident}/>}
                fileName={`${iroData?.IROno}_Receipt.pdf`} style={{ color: 'blue' }}>
                {({ loading }) => (loading || printIroLoading ? '....' : `${iroData?.IROno}_Receipt.pdf`)}
              </PDFDownloadLink>
            )}{' '}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConform1(false);
            }}
            variant="text"
          >
            Cancel
          </Button>
          <>
            {iroData && mngrName&&selectedSignature&&FrData&& (

              <>
                <PDFDownloadLink document={<IROTemplate
                  rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident}/>}
                fileName={`${iroData?.IROno}_Receipt.pdf`} style={{ color: 'blue' }}>
                  {({ blob, loading }) =>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={async () => {
                        if (blob) {
                          setLoading(true);
                          attach(blob);
                        }
                      }}
                      disabled={loading || printIroLoading}
                    >
                      {loading || printIroLoading ? 'Loading...' : 'Yes, Close'}
                    </Button> }
                </PDFDownloadLink>

              </>
            )}
          </>
        </DialogActions>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ReopenedIRO;
