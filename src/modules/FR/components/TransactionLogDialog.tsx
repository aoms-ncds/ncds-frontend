import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FRServices from '../extras/FRServices';
import Typography from '@mui/material/Typography';
import moment from 'moment';


const TransactionLogDialog = (props:{open:boolean;onClose:()=>void;TRId:string}) => {
  const [logs, setLogs] = useState<ITransactionLog[]>([]);
  useEffect(() => {
    const getLog=async ()=>{
      setLogs(((await FRServices.getLogById(props.TRId)).data));
    };
    if (props.TRId) {
      getLog();
    }
  }, [props.TRId]);

  return (
    <Dialog open={props.open} onClose={()=>props.onClose()} maxWidth='xl' >
      <DialogTitle >
        Log
      </DialogTitle>
      <DialogContent>
        <ul>
          {logs.map((log, index)=>(
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <li key={index}>
              <Typography variant="body1" color="initial" >
                {`${log.TRNo} ${log.action} by 
                ${log?.doneBy?.basicDetails?.firstName} ${log?.doneBy?.basicDetails?.middleName?log?.doneBy?.basicDetails?.middleName+' ':''}${log?.doneBy?.basicDetails?.lastName}
                 on ${moment(log.createdAt).format('DD/MM/YYYY hh:mm:ss a')}` }
              </Typography>
            </li>
          ))}
        </ul>
        {(logs.length===0)&&<Typography variant="h5" color="initial">No Log Found</Typography>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={()=>props.onClose()}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionLogDialog;
