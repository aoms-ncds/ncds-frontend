import { Card, Typography, Avatar, IconButton, Button, CardContent, Grid, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { useEffect, useState } from 'react';
import moment from 'moment';
import TransactionLogServices from './extras/TransactionLogServices';
import * as XLSX from 'xlsx';
import {
  Delete,
  Download as DownloadIcon,
} from '@mui/icons-material';
const TransactionLog = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('D'),
    endDate: moment().endOf('D'),
    rangeType: 'days',
  });
  const [logs, setLogs] = useState<ITransactionLog[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    const getLog = async () => {
      setLogs((await TransactionLogServices.getAll(dateRange)).data);
    };
    getLog();
  }, [dateRange]);
  return (
    <CommonPageLayout title="FR/IRO Log"
      momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
        },
        rangeTypes: ['days', 'weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'days',
      }}>

      <Card>
        <CardContent>
          <Button
            onClick={async () => {
              setConfirmDelete(true);
            }}
            startIcon={<Delete />}
            color="error" sx={{ float: 'right', ml: .5 }}
            variant="contained"
          >Delete</Button>
          <Button
            onClick={async () => {
              const sheet =
                logs ?
                  logs.map((log) => ([
                    log.TRNo,
                    log.action,
                    log.doneBy && (log.doneBy?.basicDetails.firstName + ' ' + (log.doneBy?.basicDetails.middleName ?
                      (log.doneBy?.basicDetails.middleName + ' ') : '') +
                      log.doneBy?.basicDetails.lastName),
                    moment(log.createdAt).format('DD/MM/YYYY hh:mm:ss a')])) :
                  [];
              const headers = [
                'FR/IRO No',
                'Action',
                'Done By',
                'Done On',
              ];
              const worksheet = XLSX.utils.json_to_sheet(sheet);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
              XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
              XLSX.writeFile(workbook, `LogReport_${dateRange.startDate.format('DD/MM/YYYY')}_${dateRange.endDate.format('DD/MM/YYYY')}.xlsx`, { compression: true });
            }}
            startIcon={<DownloadIcon />}
            color="primary" sx={{ float: 'right' }}
            variant="contained"
          >Export</Button>

          <Typography variant="h6" color="initial">
            FR/IRO Log
          </Typography>
          <ul>
            {logs.map((log, index) => (
              // eslint-disable-next-line react/jsx-no-comment-textnodes
              <li key={index}>
                <Typography variant="body1" color="initial" >
                  {`${log.TRNo} ${log.action} by 
                ${log.doneBy.basicDetails.firstName} ${log.doneBy.basicDetails.middleName ? log.doneBy.basicDetails.middleName + ' ' : ''}${log.doneBy.basicDetails.lastName}
                 on ${moment(log.createdAt).format('DD/MM/YYYY hh:mm:ss a')}`}
                </Typography>
              </li>
            ))}
          </ul>
          {(logs.length === 0) && <Typography variant="h5" color="initial" align='center'>No Log Found</Typography>}
          <br />
        </CardContent>
      </Card>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>{`Do you want to delete log from ${dateRange.startDate.format('DD/MM/YYYY')} to ${dateRange.endDate.format('DD/MM/YYYY')}?`}</Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDelete(false);
          }} variant="text">
            No, Cancel
          </Button>
          <Button onClick={async () => {
            const res = await TransactionLogServices.deleteLog(dateRange);
            res.success && setLogs([]);
            setConfirmDelete(false);
          }} variant="contained" color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

    </CommonPageLayout>
  );
};

export default TransactionLog;
